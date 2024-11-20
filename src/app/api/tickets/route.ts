import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { subject, email, invoiceId, shopId, message } = await req.json();

    if (!subject || !email || !message || !shopId) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const ticket = await prisma.ticket.create({
      data: {
        subject,
        email,
        invoiceId,
        shopId,
        messages: {
          create: {
            sender: "user",
            content: message,
          },
        },
      },
    });

    return NextResponse.json({ ticketId: ticket.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const shopId = searchParams.get("shopId");
  try {
    if (!shopId) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    const tickets = await prisma.ticket.findMany({
      where: {
        shopId,
      },
      orderBy: { createdAt: "desc" },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
