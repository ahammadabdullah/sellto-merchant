import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// email template
import { render } from "@react-email/components";
import { WaitlistEmailTemplate } from "@/emails/waitlistEmail";

import { revalidateTag } from "next/cache";

async function sendEmail(email: string, uniqID: string) {
  // resend int
  const resend = new Resend(process.env.RESEND_API_KEY);

  const plainText = await render(
    WaitlistEmailTemplate({ email: email, uniqID: uniqID }),
    {
      plainText: true,
    }
  );
  try {
    const { data, error } = await resend.emails.send({
      from: "Sellto.io <updates@mail.sellto.io>",
      to: [email],
      subject: `You've been signed up for the beta tester list! // sent at ${new Date()}`,
      react: WaitlistEmailTemplate({ email: email, uniqID: uniqID }),
      text: plainText,
      headers: {
        "List-Unsubscribe": `<https://www.sellto.io/waitlist/remove?token=${uniqID}>`,
      },
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
  let uniqID: string = "";

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
    await prisma.waitList
      .create({
        data: {
          email,
        },
      })
      .then((data) => {
        uniqID = data.id;
      });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding you to the waitlist, try again" },
      { status: 500 }
    );
  }
  try {
    // console.log("uniqID: " + uniqID);

    await sendEmail(email, uniqID);
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
