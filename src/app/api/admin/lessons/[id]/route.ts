import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: number}}){
    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, params.id)
    });
    return NextResponse.json(data)
}

export async function PUT(req: NextRequest, {params}: {params: {id: number}}){
    const body = await req.json();
    const data: any = await db.update(lessons).set({
        ...body,
    }).where(eq(lessons.id, params.id)).returning()
    return NextResponse.json(data[0])   
}

export async function DELETE(req: NextRequest, {params}: {params: {id: number}}){
    const data = await db.delete(lessons).where(eq(lessons.id, params.id)).returning()
    return NextResponse.json(data[0])
}
