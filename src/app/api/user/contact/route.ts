import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ContactModel from "@/models/contact";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required" },
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
