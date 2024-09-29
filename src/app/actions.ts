'use server'

import db from "@/db/drizzle"
import { challengeProgress, challenges, userProgress, userSubscription } from "@/db/schema"
import { absoluteUrl } from "@/lib/utils"
import { auth, currentUser } from "@clerk/nextjs/server"
import { error } from "console"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { DAY_IN_MS } from "@/constants"
import response from "./api/response"
import { stripe } from "@/stripe"
import { POINTS_TO_REFILL } from "@/constants"

const returnUrl = absoluteUrl('/shop')

export async function upsertUserProgess(courseId: number) {
    const {userId, getToken} = await auth()
    const user = await currentUser()

    if(!userId || !user){
        throw new Error("Unauthenticated")
    }

    const responseCourse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}`, {headers: { Authorization: `Bearer ${await getToken()}` }});
    const courses = await responseCourse.json()

    // throw new Error("something")
    if(!courses){
        throw new Error('Courses not found')
    }

    if(!courses.units.length || !courses.units[0].lessons.length){
        throw new Error('the course is empty')
    }

    const responseUserProgress = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userProgress`, {headers: { Authorization: `Bearer ${await getToken()}`}})
    const userProgressJson = await responseUserProgress.json();
    if(userProgressJson && userProgressJson.activeCourseId){
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || 'User',
            userImageSrc: user.imageUrl || '/assets/mascot.svg'
        })
    }
    else{
        console.log("add new")
        await db.insert(userProgress).values({
            userId: userId,
            activeCourseId: courseId,
            userName: user.firstName || 'User',
            userImageSrc: user.imageUrl || '/assets/mascot.svg'
        })
    }

    revalidatePath('/learn')
    revalidatePath('/courses')
    revalidatePath('/api/userProgress')
    redirect('/learn')

}

export async function upsertChallengeProgress(challengeId: number){
    const {userId, getToken} = await auth();
    if(!userId){
        throw new Error("Unauthorized")
    }
    
    const currentUserProgress = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    });

    const responseUserSubscription = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userSubscription`, {headers: { Authorization: `Bearer ${await getToken()}`}})
    const userSubscriptionJson = await responseUserSubscription.json()
    const userSubscriptionData = userSubscriptionJson.result
    const isPro = !!userSubscriptionData?.isActive;

    if(!currentUserProgress){
        throw new Error("user progress is not found")
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    })

    if(!challenge){
        throw new Error("Challenge is not found")
    }

    const lessonId = challenge.lessonId
    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId),
        )
    })

    const isPractice = !! existingChallengeProgress;
    
    if(currentUserProgress.hearts === 0 && isPractice && !userSubscriptionData?.isActive){
        return {error: "hearts"}
    }

    if(isPractice){
        await db.update(challengeProgress).set({completed: true}).where(eq(challengeProgress.id, existingChallengeProgress.id))
        await db.update(userProgress).set({
            hearts: Math.min(currentUserProgress.hearts + 1, 5),
            points: currentUserProgress.points + 10,
        }).where(eq(userProgress.userId, userId))

        revalidatePath('/lesson')
        revalidatePath(`/lesson/${lessonId}`)
        revalidatePath('/learn')
        revalidatePath('/quests')
        revalidatePath('/leaderboard')
        return;
    }

    await db.insert(challengeProgress).values({
        challengeId,
        userId,
        completed: true, 
    })

    await db.update(userProgress).set({
        points: currentUserProgress.points + 10,
    }).where(eq(userProgress.userId, userId))

    revalidatePath('/lesson')
    revalidatePath(`/lesson/${lessonId}`)
    revalidatePath('/learn')
    revalidatePath('/quests')
    revalidatePath('/leaderboard')

}

export async function reduceHearts(challengeId: number){
    const {userId, getToken} = await auth();
    if(!userId){
        throw new Error("Unauthorized")
    }

    const responseUserSubscription = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userSubscription`, {headers: { Authorization: `Bearer ${await getToken()}`}})
    const userSubscriptionJson = await responseUserSubscription.json()
    const userSubscriptionData = userSubscriptionJson.result
    const isPro = !!userSubscriptionData?.isActive;

    const currentUserProgress = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    });

    if(!currentUserProgress){
        throw new Error("user progress is not found")
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    })

    if(!challenge){
        throw new Error("Challenge is not found")
    }

    const lessonId = challenge.lessonId
    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId),
        )
    })

    if(userSubscriptionData?.isActive){
        return {error : 'subscription'} 
    }

    const isPractice = !! existingChallengeProgress;
    if(isPractice){
        return {error: "practice"}
    }

    if(currentUserProgress.hearts === 0){
        return {error: "hearts"}
    }

    if(!currentUserProgress){
        throw new Error("User progress is not found ")
    }

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts -1, 0)
    }).where(eq(userProgress.userId, userId))

    revalidatePath('/lesson')
    revalidatePath(`/lesson/${lessonId}`)
    revalidatePath('/learn')
    revalidatePath('/quests')
    revalidatePath('/leaderboard')

}

export async function refillHearts(){
    const {userId} = await auth();
    if(!userId){
        throw new Error("Unauthorized")
    }

    const currentUserProgress = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    });

    if(!currentUserProgress){
        throw new Error("user progress is not found")
    }

    if(currentUserProgress.hearts === 5){
        throw new Error("Hearts are already full")
    }

    if(currentUserProgress.points < POINTS_TO_REFILL){
        throw new Error("Not enough points")
    }

    await db.update(userProgress).set({
        hearts: 5,
        points: currentUserProgress.points - POINTS_TO_REFILL
    }).where(eq(userProgress.userId, currentUserProgress.userId))

    revalidatePath('/shop')
    revalidatePath('/learn')
    revalidatePath('/quests')
    revalidatePath('/leaderboard')
}

export async function createStripeUrl(){
    const {userId} = await auth();
    const user = await currentUser();

    if(!userId || !user){
        throw new Error('Unauthorized')
    }

    const data = await db.query.userSubscription.findFirst({
        where: eq(userSubscription.userId, userId)
    })

    const isActive = data && data.stripePriceId && data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()
    const currentUserSubscription = {...data, isActive};

    if(currentUserSubscription && currentUserSubscription.stripeCustomerId){
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: `${userSubscription.stripeCustomerId}`,
            return_url: returnUrl
        })

        return {data: stripeSession.url}
    }

    const stripeSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ['card'],
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [{
            quantity: 1,
            price_data: {
                currency: 'USD',
                product_data:{
                    name: 'Lingo Pro',
                    description: "Unlimited hearts"
                },
                unit_amount: 2000,
                recurring:{
                    interval: 'month'
                }
            }
        }],
        metadata: {
            userId,
        },
        success_url: returnUrl,
        cancel_url: returnUrl
    })

    return {data: stripeSession.url}
} 