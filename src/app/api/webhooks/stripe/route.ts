import { stripe } from "@/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import response from "../../response";
import { userSubscription } from "@/db/schema";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest){
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;
    let event: Stripe.Event;

    try{
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    }
    catch(e : any){
        return new NextResponse(`webhook error ${e.message}`, {status: 400})
    }

    const session = event.data.object as Stripe.Checkout.Session;
    if(event.type === 'checkout.session.completed'){
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        if(!session?.metadata?.userId){
            return new NextResponse("user ID is required", {status: 400})
        }

        await db.insert(userSubscription).values({
            userId: session.metadata.userId,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeSubscriptionId: subscription.id,
            stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000
            )
        })
    }
    else if(event.type === 'checkout.session.async_payment_succeeded'){
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        await db.update(userSubscription).set({
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000
            )
        }).where(eq(userSubscription.stripeSubscriptionId, subscription.id))
    }





    return new NextResponse(null, {status: 200})
}