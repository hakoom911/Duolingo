import MobileHeader from "@/components/mobileHeader";
import Sidebar from "@/components/sidebar";

interface Props {
    children: any;
}

export default function MainLayout({children}: Props){
    return <>
        <MobileHeader/>
        <Sidebar className="hidden lg:flex"/>
        <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
            <div className="max-w-[1056px] mx-auto pt-6 h-full">
                {children}
            </div>
        </main>
    </>
}