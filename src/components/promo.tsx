import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Promo(){
    return <div className="border-2 rounded-xl p-4 space-y-4">
        <div className="space-y-2">
            <div className="flex items-center gap-x-2">
                <Image src={'/assets/unlimited.svg'} alt="Pro" width={26} height={26} />
                <h3 className="font-bold text-lg">Upgrade to Pro</h3>
            </div>
            <p className="text-muted-foreground">Get unlimited hearts and more!</p>
        </div>
            <Button variant={'super'} className="w-full" size={'lg'} asChild>
                <Link href={'/shop'}>
                    Upgrade today
                </Link>
            </Button>
    </div>
}