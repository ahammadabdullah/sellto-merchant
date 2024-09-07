import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");
async function sendEmail(email: string) {
  // Import the Nodemailer library

  // Create a transporter object
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, // use SSL
    auth: {
      user: "0530fe69bfc298",
      pass: "04c2ab6e28ec95",
    },
  });

  // Configure the mailoptions object
  const mailOptions = {
    from: "yourusername@email.com",
    to: "alcahammad@email.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  // Send the email
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
