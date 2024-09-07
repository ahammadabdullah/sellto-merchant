import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const cnt = await prisma.waitList.count();
  return NextResponse.json({ count: cnt }, { status: 200 });
}
