import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { email } = body;
  if (!email) {
    return NextResponse.json(
      { error: "Please provide a valid email" },
      { status: 400 }
    );
  }
  const emailExists = await prisma.waitList.findUnique({
    where: {
      email: email,
    },
  });
  if (emailExists) {
    return NextResponse.json(
      { message: "You have already been added to the waitlist" },
      { status: 400 }
    );
  }
  try {
    await prisma.waitList.create({
      data: {
        email,
      },
    });
    return NextResponse.json(
      { message: "You have been added to the waitlist" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
