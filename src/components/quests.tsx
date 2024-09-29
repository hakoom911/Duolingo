import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { quests } from "@/constants";
import { Progress } from "./ui/progress";

interface Props{
    points: number;
}

export default function Quests({points}: Props){
    return <div className="border-2 rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between w-full space-y-2">
            <h3 className="font-bold text-lg">Quests</h3>
            <Link href={'/quests'}>
                <Button variant={'primaryOutline'} size={'sm'}>
                    View All
                </Button>
            </Link>
        </div>
        <ul className="w-full space-y-4">
        {quests.map((quest)=>{
                    const progress = (points / quest.value) * 100
                    return <div key={quest.title} className="flex items-center w-full pb-4 gap-x-3">
                        <Image src={'/assets/points.svg'} alt={'Points'} width={40} height={40} />
                        <div className="flex flex-col gap-y-2 w-full">
                            <p className="text-neutral-700 text-sm font-bold">{quest.title}</p>
                            <Progress className={'h-2'} value={progress} />
                        </div>
                    </div>
                })}
        </ul>
    </div>
}