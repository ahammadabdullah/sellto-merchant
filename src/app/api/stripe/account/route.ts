import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28.acacia",
});

export async function POST(req: NextRequest) {
  const { shopId, email } = await req.json();
  try {
    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
      email,
      default_currency: "usd",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: "individual",
      metadata: { shopId },
    });
    console.log(
      "---------< account >---------",
      account,
      "---------< account >---------"
    );
    const update = await prisma.shop.update({
      where: { id: shopId },
      data: {
        stripeAccountId: account.id,
      },
    });
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/earnings`,
      return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/earnings`,
      type: "account_onboarding",
    });
    return NextResponse.json(
      { account, onboardingUrl: accountLink.url, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
