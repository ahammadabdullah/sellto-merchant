import { CartItem } from "@/components/shop/productProfile";
import { stat } from "fs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const { cartItems } = await req.json();
    const referer = req.headers.get("referer");
    let baseUrl;
    if (referer) {
      const refererURL = new URL(referer);
      baseUrl = `${refererURL.protocol}//${refererURL.hostname}`;
    }

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
          description: item.shortDescription || "",
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity,
    }));
    const metadata = {
      productData: JSON.stringify(
        cartItems.map((item: CartItem) => ({
          productId: item.productId,
          variantId: item.variantId,
          variant: item.variant,
          quantity: item.quantity,
        }))
      ),
    };
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${baseUrl}:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}:3000/checkout`,
      metadata: metadata,
    });

    return NextResponse.json(
      { session: session, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
