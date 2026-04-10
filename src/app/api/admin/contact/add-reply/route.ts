import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ContactModel from "@/models/contact";


export async function POST(req: NextRequest) {
  try {
    const { id, reply } = await req.json();

    if (!id || !reply) {
      return NextResponse.json(
        { success: false, message: "Inquiry ID and reply message are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const updatedContact = await ContactModel.findByIdAndUpdate(
      id,
      {
        status: "replied",
        reply: reply,
        repliedAt: new Date(),
        isRead: true,
      },
      { new: true }
    );

    if (!updatedContact) {
      return NextResponse.json(
        { success: false, message: "Contact inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Reply added and status updated successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error adding reply:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add reply",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
