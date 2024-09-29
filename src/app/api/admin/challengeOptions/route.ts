import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const {userId} = await auth()
    console.log("userId " + userId)
    const challengeOptions = await db.query.challengeOptions.findMany();
    return new NextResponse(JSON.stringify(challengeOptions))
}

export async function POST(req: NextRequest){
    const body = await req.json();
    const data = await db.insert(challengeOptions).values({
        ...body,
    }).returning();

    return NextResponse.json(data[0])
}