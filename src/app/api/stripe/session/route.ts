import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
    if (!session.payment_intent) {
      throw new Error("Payment intent is missing");
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(
      session.payment_intent as string
    );
    const data = {
      customer: session.customer_details,
      session,
      lineItems,
      paymentIntent,
    };

    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
