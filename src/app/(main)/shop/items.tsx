"use client";

import { createStripeUrl, refillHearts } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props{
    hearts: number;
    points: number;
    hasActiveSubscription?: boolean;
}

export default function Items({hearts, points, hasActiveSubscription}: Props){[]
    const [pending, startTransition] = useTransition();
    const onRefillHearts=()=>{
        if(pending || hearts === 5 || points < POINTS_TO_REFILL){
            return;
        }

        startTransition(()=>{
            refillHearts().catch((reason)=> toast.error("Something went wrong "))
        })
    }

    function onUpgrade(){
        startTransition(()=>{
            createStripeUrl().then((response)=>{
                if(response.data){
                    window.location.href = response.data
                }
            }).catch(()=>toast.error('Something went wrong'))
        })
    }

    return <ul className="w-full">
        <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
            <Image src={'/assets/heart.svg'} alt="Heart" width={60} height={60} />
            <div className="flex-1">
                <p className="text-neutral-700 text-base lg:text-xl font-bold">Refill hearts</p>
            </div>
            <Button onClick={onRefillHearts} disabled={hearts === 5 || points < POINTS_TO_REFILL || pending}>
                {hearts === 5 ? "full" : 
                <div className="flex items-center">
                    <Image src={'/assets/points.svg'} alt="Points" height={20} width={20} />
                    <p>{POINTS_TO_REFILL}</p>
                </div>}
            </Button>
        </div>
        <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
            <Image src={'/assets/unlimited.svg'}  alt="unlimited" width={60} height={60} />
            <div className="flex-1">
                <p className="text-neutral-700 text-base lg:text-xl font-bold">Unlimited hearts</p>
            </div>
            <Button onClick={onUpgrade} disabled={pending}>
                {hasActiveSubscription? "settings": "upgrade"}
            </Button>
        </div>
    </ul>
}