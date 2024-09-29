"use client";

import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/useExitModal";
import { InfinityIcon, X } from "lucide-react";
import Image from 'next/image'

interface Props{
    hearts: number;
    percentage: number;
    hasActiveSubscription: boolean;
}

export default function Header({hearts, percentage, hasActiveSubscription}: Props){
    const {open} = useExitModal();
    console.log('hearts '+ hearts)

    return <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between  max-w-p[1140px] mx-auto w-full">
        <X onClick={open} className='text-slate-500 hover:opacity-75 transition cursor-pointer'/>
        <Progress value={percentage }/>
        <div className="text-rose-500 flex items-center font-bold">
            <Image src="/assets/heart.svg" alt='Heart' height={28} width={28} className="mr-2"/>
            {hasActiveSubscription? <InfinityIcon className="size-6 stroke-[3]"/>: hearts}
        </div>
    </header>
}