import { NextRequest } from "next/server";
import response from "../response";
import { auth } from "@clerk/nextjs/server";
import db from "@/db/drizzle";
import { challengeProgress, lessons, units, userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
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
    
    const firstUncompletedLesson = unitsInActiveCourse.flatMap((unit)=> unit.lessons).find((lesson)=>lesson.challenges.some((challenge)=> !challenge.challengeProgress || challenge.challengeProgress.length === 0 || challenge.challengeProgress.some(process=> process.completed === false)))
    if(!firstUncompletedLesson?.id){
        return response('no active lesson Id', null) 
    }

    const lesson = await db.query.lessons.findFirst({
        where: eq(lessons.id, firstUncompletedLesson.id),
        with: {
            challenges: {
                orderBy: (challenges, {asc})=>[asc(challenges.id)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId)
                    }
                }
            }
        }
    })

    const normalizedChallenges = lesson?.challenges.map((challenge=> {
        const completed = challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((process)=>process.completed)
        return {...challenge, completed}
    }))

    const result = {
        lesson: lesson,
        normalizedChallenges: normalizedChallenges
    }
    
    return response('seccessful', result)
}