import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");
import { render } from "@react-email/components";

import { waitlistEmailTemplate } from "@/emails/waitlistEmail";

async function sendEmail(email: string) {
  const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "f678625cfc75068c78d4bde3dd24b1e1",
    },
  });
  const emailHtml = await render(waitlistEmailTemplate({}), {
    pretty: true,
  });

  const plainText = await render(waitlistEmailTemplate({}), {
    plainText: true,
  });

  const mailOptions = {
    from: '"Sellto.io" <noreply@sellto.io>',
    to: `<${email}>`,
    subject: `You've been added to the waitlist! // sent at ${new Date()}`,
    html: emailHtml,
    plainText: plainText,
    text: plainText,
    date: new Date(),
  };

  console.log("email sent to:", email);
  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
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
