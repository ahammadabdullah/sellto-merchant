import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");
import { render } from "@react-email/components";
import { NotionMagicLinkEmail } from "@/emails/notion-magic-link";
import { Email } from "@/emails/email";
async function sendEmail(email: string) {
  const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "f678625cfc75068c78d4bde3dd24b1e1",
    },
  });
  const emailHtml = await render(
    NotionMagicLinkEmail({ loginCode: "123456" }),
    {
      pretty: true,
    }
  );

  const plainText = await render(
    NotionMagicLinkEmail({ loginCode: "123456" }),
    {
      plainText: true,
    }
  );

  const mailOptions = {
    from: "info@sellto.io",
    to: `<${email}>`,
    subject: "Thanks for signing up!",
    html: emailHtml,
    plainText: plainText,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log("Error:", error);
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
    await sendEmail(email);
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
