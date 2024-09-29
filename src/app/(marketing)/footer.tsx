import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props{
    children: any;
}

export default function Footer({children}: Props){
    return <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
        <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
            <Button size={'lg'} variant={"ghost"} className="w-full">
                <Image src="/assets/hr.svg" alt="Contain" width={40} height={32} className="mr-4 rounded-md"/>
                Croatian
            </Button>
            <Button size={'lg'} variant={"ghost"} className="w-full">
                <Image src="/assets/es.svg" alt="Spanish" width={40} height={32} className="mr-4 rounded-md"/>
                Spanish
            </Button>
            <Button size={'lg'} variant={"ghost"} className="w-full">
                <Image src="/assets/fr.svg" alt="French" width={40} height={32} className="mr-4 rounded-md"/>
                French
            </Button>
            <Button size={'lg'} variant={"ghost"} className="w-full">
                <Image src="/assets/it.svg" alt="Italian" width={40} height={32} className="mr-4 rounded-md"/>
                Italian
            </Button>
            <Button size={'lg'} variant={"ghost"} className="w-full">
                <Image src="/assets/jp.svg" alt="Japanese" width={40} height={32} className="mr-4 rounded-md"/>
                Japanese
            </Button>
        </div>
    </footer>
}