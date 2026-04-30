import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ContactModel from "@/models/contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, date, location, category, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email and message are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    await ContactModel.create({
      name,
      email,
      phone,
      date,
      location,
      category,
      message,
      status: "new",
      isRead: false,
    });

    // Send email notification via Resend
    try {
      const { data, error } = await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.ADMIN_EMAIL || "bhavik@mrphotography.com", 
        subject: `New Client Inquiry: ${category || 'General'} - ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">New Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Event Date:</strong> ${date || 'N/A'}</p>
            <p><strong>Location:</strong> ${location || 'N/A'}</p>
            <p><strong>Category:</strong> ${category || 'N/A'}</p>
            <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 4px;">
              <p style="margin-top: 0;"><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; margin-bottom: 0;">${message}</p>
            </div>
          </div>
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
