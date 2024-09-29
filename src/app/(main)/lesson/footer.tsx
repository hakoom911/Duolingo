'use client';

import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";
import {cn} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import Link from "next/link";

interface  Props {
    lessonId?: number;
    disabled?: boolean;
    status: "correct" | "wrong" | "none" | 'completed';
    onCheck: ()=>void;
}

export default function Footer({status, lessonId, disabled, onCheck}: Props){
    useKey('Enter', onCheck, {}, [onCheck])
    const isMobile = useMedia('(max-width:1024px)')
    
    return <footer className={cn("lg:-h-[140px] h-[100px] border-t-2",
     status === "correct" && "border-transparent bg-green-100",
     status === "wrong" && "border-transparent bg-rose-100",
    )}>
        <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
            {status === 'correct' && <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
                <CheckCircle  className="size-6 lg:size-10 mr-4"/>
                Nicely done!
                </div>}
            {status === 'wrong' && <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
                <XCircle  className="size-6 lg:size-10 mr-4"/>
                Try Again!
                </div>}
            {status === 'completed' && <Link href={`/lesson/${lessonId}`}>
                <Button size={isMobile? 'sm' : "lg"} onClick={()=>{window.location.href = `/lesson/${lessonId}`}}>
                    Practice again
                </Button>
            </Link>}
            <Button disabled={disabled} className="ml-auto" variant={status === 'wrong' ? 'danger' : 'secondary'} onClick={onCheck} size={isMobile ? 'sm' :"lg"}>
                    {status === 'none' && "Check"}
                    {status === 'correct' && "Next"}
                    {status === 'wrong' && "Retry"}
                    {status === 'completed' && "Continue"}
            </Button>
        </div>
    </footer>
}