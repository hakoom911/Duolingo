import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

interface ActiveCourse{
    title: string;
    imageSrc: string;
}

interface Props {
    activeCourse: typeof courses.$inferSelect;
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
}

export default function UserProgress({activeCourse, hearts, points, hasActiveSubscription}: Props){
    return <div className="flex items-center justify-between gap-x-2 w-full">
        <Link href='/courses'>
            <Button variant={'ghost'}>
                <Image className="rouneded-md border"
                width={32}
                height={32}
                src={activeCourse.imageSrc} 
                alt={activeCourse.title} />
            </Button>
        </Link>
        <Link href='/shop' about="shopping">
            <Button className="text-orange-500" variant={'ghost'}>
                <Image src={'/assets/points.svg'} alt="points" height={28} width={28}
                    className="mr-2"
                />
                {points}
            </Button>
        </Link>
        <Link href='/shop' about="shopping">
            <Button className="text-rose-500" variant={'ghost'}>
                <Image src={'/assets/heart.svg'} alt="hearts" height={22} width={22}
                    className="mr-2"
                />
                {hasActiveSubscription ? <InfinityIcon className="h-4 w-4 stroke-[3]"/> : hearts}
            </Button>
        </Link>
    </div>
}