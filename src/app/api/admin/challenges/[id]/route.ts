import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: number}}){
    const data = await db.query.challenges.findFirst({
        where: eq(challenges.id, params.id)
    });
    return NextResponse.json(data)
}

export async function PUT(req: NextRequest, {params}: {params: {id: number}}){
    const body = await req.json();
    const data: any = await db.update(challenges).set({
        ...body,
    }).where(eq(challenges.id, params.id)).returning()
    return NextResponse.json(data[0])   
}

export async function DELETE(req: NextRequest, {params}: {params: {id: number}}){
    const data = await db.delete(challenges).where(eq(challenges.id, params.id)).returning()
    return NextResponse.json(data[0])
}
