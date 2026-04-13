import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ContactModel from "@/models/contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email and message are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newContact = await ContactModel.create({
      name,
      email,
      message,
      status: "new",
      isRead: false,
    });

    // Send email notification via Resend
    try {
      const { data, error } = await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.ADMIN_EMAIL as string, // Will send to whoever is configured in .env
        subject: `New Client Inquiry from ${name}`,
        html: `
          <h2>New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
        `,
      });

      if (error) {
        console.error("Resend API Error:", error);
      } else {
        console.log("Email sent successfully. ID:", data?.id);
      }
    } catch (emailError) {
      console.error("Email sending exception:", emailError);
      // Proceed without throwing to not break the UI submission behavior 
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Contact submission error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
