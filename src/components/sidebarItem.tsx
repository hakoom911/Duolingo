"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

interface Props{
    label: string;
    iconSrc: string;
    href: string;
}

export default function SidebarItem({label, iconSrc, href: herf}: Props){
    const pathname = usePathname()
    const active = pathname === herf;
    return <Button variant={active? "sidebarOutline": "sidebar"} className="justify-start h-[52px]" asChild>
        <Link href={herf}>
            <Image src={iconSrc} alt={label} className="mr-5" height={32} width={32}/>
            {label}
        </Link>
    </Button>
}