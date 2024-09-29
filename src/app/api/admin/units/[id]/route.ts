import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: number}}){
    const data = await db.query.units.findFirst({
        where: eq(units.id, params.id)
    });
    return NextResponse.json(data)
}

export async function PUT(req: NextRequest, {params}: {params: {id: number}}){
    const body = await req.json();
    const data: any = await db.update(units).set({
        ...body,
    }).where(eq(units.id, params.id)).returning()
    return NextResponse.json(data[0])   
}

export async function DELETE(req: NextRequest, {params}: {params: {id: number}}){
    const data = await db.delete(units).where(eq(units.id, params.id)).returning()
    return NextResponse.json(data[0])
}
