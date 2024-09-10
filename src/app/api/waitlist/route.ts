import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// email template
import { WaitlistEmailTemplate } from "@/emails/waitlistEmail";
import { revalidateTag } from "next/cache";

async function sendEmail(email: string) {
  // resend int
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "Sellto.io <noreply@mail.sellto.io>",
      to: [email],
      subject: `You've been added to the waitlist! // sent at ${new Date()}`,
      react: WaitlistEmailTemplate({}),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

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
      { message: "You have already been added to the waitList" },
      { status: 400 }
    );
  }
  try {
    await prisma.waitList.create({
      data: {
        email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding you to the waitlist, try again" },
      { status: 500 }
    );
  }
  try {
    await sendEmail(email);
    // revalidateTag("waitlistCount");
    return NextResponse.json(
      {
        message:
          "You have been added to the waitlist, check email for confirmation",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Added to waitlist, Error sending confirmation email" },
      { status: 500 }
    );
  }
}
