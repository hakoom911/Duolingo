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

export async function POST(req: NextRequest){
    const body = await req.json();
    const data = await db.insert(courses).values({
        ...body,
    }).returning();

    return NextResponse.json(data[0])
}