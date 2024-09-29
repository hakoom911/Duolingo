import Footer from "./footer";
import Header from "./header";

interface Props{
    children: any;
}

export default function MarketingLayout({children}: Props){
    return <div className="min-h-screen flex flex-col">
        <Header>Header</Header>
        <main className="flex-1 flex flex-col items-center justify-center">
            {children}
        </main>
        <Footer>
            footer
        </Footer>
    </div>
}