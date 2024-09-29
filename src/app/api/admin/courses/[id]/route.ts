import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: number}}){
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, params.id)
    });
    return NextResponse.json(data)
}

export async function PUT(req: NextRequest, {params}: {params: {id: number}}){
    const body = await req.json();
    const data: any = await db.update(courses).set({
        ...body,
    }).where(eq(courses.id, params.id)).returning()
    return NextResponse.json(data[0])   
}

export async function DELETE(req: NextRequest, {params}: {params: {id: number}}){
    const data = await db.delete(courses).where(eq(courses.id, params.id)).returning()
    return NextResponse.json(data[0])
}
