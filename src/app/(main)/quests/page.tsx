import FeedWrapper from "@/components/feedWrapper";
import Promo from "@/components/promo";
import StickyWrapper from "@/components/stickyWrapper";
import { Progress } from "@/components/ui/progress";
import UserProgress from "@/components/userProgress";
import { quests } from "@/constants";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Quests(){
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
        </StickyWrapper>
        <FeedWrapper>
            <div className="w-full flex flex-col items-center">
                <Image src={'/assets/quests.svg'}  alt="Quests" width={90} height={90}/>
            </div>
            <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                Quests
            </h1>
            <p className="text-muted-foreground text-center text-lg mb-6">
                Complete quests by earning points
            </p>
            <ul className="w-full">
                {quests.map((quest)=>{
                    const progress = (userProgress.points / quest.value) * 100

                    return <div key={quest.title} className="flex items-center w-full p-4 gap-x-4 border-t-2">
                        <Image src={'/assets/points.svg'} alt={'Points'} width={60} height={60} />
                        <div className="flex flex-col gap-y-2 w-full">
                            <p className="text-neutral-700 text-xl font-bold">{quest.title}</p>
                            <Progress className={'h-3'} value={progress} />
                        </div>
                    </div>
                })}
            </ul>
        </FeedWrapper>
    </div>
}