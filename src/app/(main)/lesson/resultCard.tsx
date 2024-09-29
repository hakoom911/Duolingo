import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props{
    variant : 'points' | 'hearts';
    value: any;
}

export default function ResultCard({variant, value}: Props){
    const imageSrc = variant === 'hearts' ? '/assets/heart.svg': '/assets/points.svg'
    return <div className={cn('rounded-2xl border-2 w-full', 
    variant === 'points' && 'bg-orange-400 border-orange-400',
    variant === 'hearts' && 'bg-rose-400 border-rose-400')}>
        <div className={cn("p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs", 
            variant === 'points' && 'bg-orange-500',
            variant === 'hearts' && 'bg-rose-500'
        )}>{variant === 'hearts' ? "Hearts Left" : "Total XP"}</div>

        <div className={cn("rounded-2xl bg-white flex items-center justify-center p-6 font-bold text-lg", 
            variant === 'points' && 'text-orange-500',
            variant === 'hearts' && 'text-rose-500'
        )}>
            <Image src={imageSrc} alt="Icon" height={30} width={30} className="mr-1.5" />
            {value}
        </div>


    </div>
}