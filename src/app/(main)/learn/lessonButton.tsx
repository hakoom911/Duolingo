"use client";

import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props{
    id: number;
    index: number;
    totalCount: number;
    locked?: boolean;
    current?: boolean;
    percentage: number;
}

export default function LessonButton({id, index, totalCount, locked, current, percentage}: Props){
    const cycleLength = 8;
    const cycleIndex = index % cycleLength
    let indentationLevel;

    if(cycleIndex <= 2){
        indentationLevel = cycleIndex;
    }
    else if(cycleIndex <= 4){
        indentationLevel = 4 - cycleIndex
    }
    else if(cycleIndex <= 6){
        indentationLevel = 6 - cycleIndex;
    }
    else{
        indentationLevel = cycleIndex - 8
    }

    const rightPosition = indentationLevel * 40
    const isFirst = index === 0;
    const isLast = index === totalCount
    const isCompleted = !current && !locked
    // console.log(`current: ${current}, locked: ${locked}`)
    const Icon = isCompleted? Check : isLast? Crown : Star;
    const href = isCompleted? `/lesson/${id}` : '/lesson'
    return <Link href={href} aria-disabled={locked} style={{pointerEvents: locked? 'none': 'auto'}}>
        
        <div className="relative" style={{right: `${rightPosition}px`, marginTop: `${(isFirst && !isCompleted? '60' : '24')}px`}} >
            {current
            ? <div className="H-[102px] w-[102px] relative">
                <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
                    Start
                    <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform translate-x-1/2"></div>
                </div>
                <CircularProgressbarWithChildren 
                    value={Number.isNaN(percentage) ? 0 : percentage}
                    styles={{
                        path:{
                            stroke: "#4ade80"
                        },
                        trail:{
                            stroke: "#e5e7eb"
                        }
                    }}>
                        <Button 
                        size={'rounded'}
                        className="size-[70px] border-b-8"
                        variant={locked? 'locked': "secondary"}>
                            <Icon className={cn('size-10', locked? 'fill-neutral-400 text-neutral-400 stroke-neutral-400': 'fill-primary-foreground text-primary-foreground', isCompleted && 'fill-none stroke-[4]')}/>
                        </Button>
                    </CircularProgressbarWithChildren>
            </div> 
            : <Button 
                size={'rounded'}
                className="size-[70px] border-b-8"
                variant={locked? 'locked': "secondary"}>
                    <Icon className={cn('size-10', locked? 'fill-neutral-400 text-neutral-400 stroke-neutral-400': 'fill-primary-foreground text-primary-foreground', isCompleted && 'fill-none stroke-[4]')}/>
                </Button>
            }
        </div>
    </Link>
}