import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const {userId} = await auth()
    console.log("userId " + userId)
    const courses = await db.query.courses.findMany();
    return new NextResponse(JSON.stringify(courses))
}
