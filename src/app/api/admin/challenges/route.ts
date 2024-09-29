import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const {userId} = await auth()
    console.log("userId " + userId)
    const challenges = await db.query.challenges.findMany();
    return new NextResponse(JSON.stringify(challenges))
}

export async function POST(req: NextRequest){
    const body = await req.json();
    const data = await db.insert(challenges).values({
        ...body,
    }).returning();

    return NextResponse.json(data[0])
}