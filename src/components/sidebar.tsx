import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./sidebarItem";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

interface Props{
    className?: string;
}

export default function Sidebar({className}: Props){
    return <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)}>
        <Link href={'/learn'} about="go learning">
            <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                <Image src={'/assets/mascot.svg'} alt="Mascot" width={40} height={40}/>
                <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">Lingo</h1>
            </div>
        </Link>
        <div className="flex flex-col gap-y-2 flex-1">
            <SidebarItem href="/learn" iconSrc="/assets/learn.svg" label="learn"/>
            <SidebarItem href="/leaderboard" iconSrc="/assets/leaderboard.svg" label="leaderboard"/>
            <SidebarItem href="/quests" iconSrc="/assets/quests.svg" label="quests"/>
            <SidebarItem href="/shop" iconSrc="/assets/shop.svg" label="shop"/>
        </div>
        <div className="p-4">
                <ClerkLoading>
                    <Loader className="size-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/"  />
                </ClerkLoaded>
        </div>
    </div>
}