import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28.acacia",
});

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  try {
    const loginLink = await stripe.accounts.createLoginLink(id);

    console.log(
      "---------< login Link >---------",
      loginLink,
      "---------< login Link >---------"
    );

    return NextResponse.json(
      { loginLink: loginLink.url, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
