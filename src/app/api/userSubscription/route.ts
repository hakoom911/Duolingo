import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import response from "../response";
import { DAY_IN_MS } from "@/constants"

export async function GET(req: NextRequest){
    const {userId} = await auth()
    if(!userId) return  response('unauthorized', null);

    const data = await db.query.userSubscription.findFirst({
        where: eq(userSubscription.userId, userId)
    })

    if(!data) return response('no data', null);

    const isActive = data.stripePriceId && data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()
    return response('response successfully', {...data, isActive: !!isActive})
}