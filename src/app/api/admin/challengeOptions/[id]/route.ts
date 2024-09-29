import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: number}}){
    const data = await db.query.challengeOptions.findFirst({
        where: eq(challengeOptions.id, params.id)
    });
    return NextResponse.json(data)
}

export async function PUT(req: NextRequest, {params}: {params: {id: number}}){
    const body = await req.json();
    const data: any = await db.update(challengeOptions).set({
        ...body,
    }).where(eq(challengeOptions.id, params.id)).returning()
    return NextResponse.json(data[0])   
}

export async function DELETE(req: NextRequest, {params}: {params: {id: number}}){
    const data = await db.delete(challengeOptions).where(eq(challengeOptions.id, params.id)).returning()
    return NextResponse.json(data[0])
}
