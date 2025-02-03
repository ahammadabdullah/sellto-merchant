import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28.acacia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "account.updated") {
    const account = event.data.object as Stripe.Account;
    console.log("Received account update:", account);
    const shopId = account.metadata?.shopId;

    if (account.requirements?.disabled_reason) {
      console.log(
        `⚠️ Account ${account.id} is restricted: ${account.requirements.disabled_reason}`
      );

      const loginLink = await stripe.accounts.createLoginLink(account.id);
      await prisma.shop.update({
        where: {
          id: shopId,
        },
        data: {
          stripeStatus: "restricted",
          stripeLoginLink: loginLink.url,
        },
      });
    } else {
      console.log(`✅ Account ${account.id} is in good standing.`);
      await prisma.shop.update({
        where: {
          id: shopId,
        },
        data: {
          stripeStatus: "active",
        },
      });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
