import { lessons, units } from "@/db/schema";
import UnitBanner from "./unitBanner";
import LessonButton from "./lessonButton";

interface Props{
    id: number;
    order: number;
    description: string;
    title: string;
    lessons: (typeof lessons.$inferSelect & {completed: boolean})[];
    activeLesson?: typeof lessons.$inferSelect & {unit: typeof units.$inferSelect};
    activeLessonPercentage: number;
}

export default function Unit({id, order, title, description, lessons, activeLesson, activeLessonPercentage}: Props){
    return <>
        <UnitBanner title={title} description={description} />
        <div className="flex flex-col items-center relative">
            {lessons.map((lesson, index)=>{
                const isCurrnet = lesson.id === activeLesson?.id; // TODO: remove later
                const isLocked = !lesson.completed && !isCurrnet
                console.log(`index: ${index}, current: ${isCurrnet}, lesson.completed: ${JSON.stringify(lesson)}`)

                return <LessonButton
                    key={lesson.id}
                    id={lesson.id}
                    index={index}
                    totalCount={lessons.length -1}
                    current={isCurrnet}
                    locked={isLocked}
                    percentage={activeLessonPercentage}

                />
            })}
        </div>
    </>
}