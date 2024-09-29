import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Card from "./card";

interface Props{
    options: any[];
    status: "correct" | "wrong" | "none";
    onSelect: (id: number)=>void;
    disabled: boolean;
    type: typeof challenges.$inferSelect['type'];
    selectedOption?: any  
}

export default function Challenge({options, disabled, onSelect: onSelect, status, type, selectedOption}: Props){
    return <div className={cn('grid gap-2', type ==='ASSIST' && 'grid-cols-1', type ==='SELECT' && 'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]')}>
        {options.map((option, i)=>
            <Card key={option.id} id={option.id} text={option.text} imageSrc={option.imageSrc} shortcut={`${i+1}`} selected={selectedOption === option.id} onClick={()=>onSelect(option.id)} status={status} audioSrc={option.audioSrc} disabled={disabled} type={type} />
        )}
    </div>
}