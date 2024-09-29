import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import response from "../response";
import db from "@/db/drizzle";

export async function GET(req: NextRequest){
    const {userId} = await auth();
    if(!userId){
        return response('unauthorized', null)
    }

    const data = await db.query.userProgress.findMany({
        orderBy: (userProgress, {desc}) =>[desc(userProgress.points)],
        limit: 10,
        columns: {
            userId: true,
            userName: true,
            userImageSrc: true,
            points: true,
        }
    })

    return response('successful', data)
}