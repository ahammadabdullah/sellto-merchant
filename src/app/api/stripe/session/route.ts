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
      customer: {
        email: session.customer_details?.email,
        name: session.customer_details?.name,
      },
      productData: session.metadata?.productData,
      lineItems,
      orderData: {
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount,
      },
    };

    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
