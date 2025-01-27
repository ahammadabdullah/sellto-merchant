import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({
      message: "You are not authorized to perform this action",
      success: "false",
    });
  }

  try {
    const { amount, shopId } = await req.json();
    const res = await prisma.withdraw.create({
      data: {
        amount: parseFloat(amount),
        shopId,
      },
    });
    return NextResponse.json({
      message: "Withdrawal request submitted successfully",
      success: "true",
      data: res,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
