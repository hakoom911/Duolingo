interface Props{
    children: any;
}

export default function LessonLayout({children}: Props){
    return <div className="flex flex-col h-full">
        <div className="flex flex-col size-full">{children}</div>
    </div>
}