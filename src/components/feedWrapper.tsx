interface Props{
    children: any;
}

export default function FeedWrapper({children}: Props){
    return <div className="flex-1 relative top-0 pb-10">{children}</div>
}