import FeedWrapper from "@/components/feedWrapper";
import StickyWrapper from "@/components/stickyWrapper";
import UserProgress from "@/components/userProgress";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import Items from "./items";
import Promo from "@/components/promo";
import Quests from "@/components/quests";

export default async function Shop(){
    const {getToken} = await auth()
    const responseUserProgress = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userProgress`, {headers: { Authorization: `Bearer ${await getToken()}`}})
    const json = await responseUserProgress.json()
    const userProgress = json.result
    if(!userProgress || !userProgress.activeCourseId){
        redirect('/courses')
    }

    const responseUserSubscription = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userSubscription`, {headers: { Authorization: `Bearer ${await getToken()}`}})
    const userSubscriptionJson = await responseUserSubscription.json()
    const userSubscriptionData = userSubscriptionJson.result
    const isPro = !!userSubscriptionData?.isActive;    



    return <div className="flex flex-row-reverse gaq-[48px] px-6">
        <StickyWrapper>
            <UserProgress activeCourse={userProgress.activeCourse}  hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={isPro} />
            {!isPro && <Promo/>}
            <Quests points={userProgress.points}/>
        </StickyWrapper>
        <FeedWrapper>
            <div className="w-full flex flex-col items-center">
                <Image src={'/assets/shop.svg'}  alt="shop" width={90} height={90}/>
            </div>
            <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                Shop
            </h1>
            <p className="text-muted-foreground text-center text-lg mb-6">
                Spend your points on cool stuff
            </p>
            <Items hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={isPro}/>
        </FeedWrapper>
    </div>
}