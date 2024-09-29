import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: number}}){
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, params.id),
        with: {
            units: {
                orderBy: (units, {asc}) =>[asc(units.order)],
                with: {
                    lessons: {
                        orderBy: (lesson, {asc})=>[asc(lesson.order)]
                    }
                }
            }
        }
    });
    return new NextResponse(JSON.stringify(data))
}