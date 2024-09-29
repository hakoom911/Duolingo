import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import response from "../response";

export async function GET(req: NextRequest){
    const {userId} = await auth();
    if(!userId){
        return response('unauthorized', null)
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    });

    return response('seccessful', data ?? null)
}