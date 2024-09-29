import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Quiz from "../quiz";

interface Props {
    params: {id?: number[]}
}

export default async function lesson({params}: Props){
    const {getToken} = await auth()

    const lessonId = params.id ? params.id[0] : '';    
    const responesLesson = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lesson/${lessonId}`, {headers: { Authorization: `Bearer ${await getToken()}`}})
    const LessonJson = await responesLesson.json();
    const lesson = LessonJson.result  
    if(!lesson){
        redirect('/learn')
    }

    const responseUserProgress  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userProgress`, {headers: { Authorization: `Bearer ${await getToken()}` }})
    const userProgressJson = await responseUserProgress.json();
    const userProgress = userProgressJson.result  
    if(!userProgress){
        redirect('/learn')
    }

    const responseUserSubscription = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userSubscription`, {headers: { Authorization: `Bearer ${await getToken()}`}})
    const userSubscriptionJson = await responseUserSubscription.json()
    const userSubscriptionData = userSubscriptionJson.result
    const isPro = !!userSubscriptionData?.isActive;
    
    const initialPercentage = lesson.normalizedChallenges.filter((challenge: any)=> challenge.completed).length / lesson.normalizedChallenges.length * 100;

    return <Quiz
        initialLessonId={lesson.lesson.id}
        initialLessonChallenges={lesson.normalizedChallenges}
        initialHearts={userProgress.hearts}
        initialPercentage={initialPercentage}
        userSubscription={userSubscriptionData}
    />
}