import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ContactModel from "@/models/contact";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const contacts = await ContactModel.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        message: "Contact messages retrieved successfully",
        data: contacts,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching contacts:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contact messages",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
