import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const {userId} = await auth()
    console.log("userId " + userId)
    const courses = await db.query.lessons.findMany();
    return new NextResponse(JSON.stringify(courses))
}

export async function POST(req: NextRequest){
    const body = await req.json();
    const data = await db.insert(lessons).values({
        ...body,
    }).returning();

    return NextResponse.json(data[0])
}