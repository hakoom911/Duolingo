import { NextRequest } from "next/server";
import response from "../response";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { challengeProgress, lessons, units, userProgress } from "@/db/schema";
import db from "@/db/drizzle";

export async function GET(req: NextRequest){
    try{
        const {userId} = auth();
    if(!userId){
        return response('unauthorized', null);
    }

    const myUserProgress = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    });

    if(!myUserProgress?.activeCourseId){
        return response('no active course id' , null)
    }


    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, {asc})=> [asc(units.order)],
        where: eq(units.courseId, myUserProgress.activeCourseId),
        with: {
            lessons:{
                orderBy: (lessons, {asc})=>[asc(lessons.order)],
                with: {
                    unit: true,
                    challenges:{
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId)
                            }
                        }
                    }
                }
            }
        }
    })
    
    
    const firstUncompletedLesson = unitsInActiveCourse.flatMap((unit)=> unit.lessons).find((lesson)=>lesson.challenges.some((challenge)=> !challenge.challengeProgress || challenge.challengeProgress.length === 0 || challenge.challengeProgress.some(process=> process.completed === false) ))

    const result ={
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id
    }
    


    return response('seccessful', result)
    }
    catch(e){
        throw e;
    }
}