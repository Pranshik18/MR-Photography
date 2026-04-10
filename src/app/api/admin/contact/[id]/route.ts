import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ContactModel from "@/models/contact";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Contact ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const contact = await ContactModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isRead: true,
          status: "read",           
        },
      },
      { 
        new: true,                  
        runValidators: true 
      }
    );

    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact information retrieved successfully",
        data: contact,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching contact detail:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contact details",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
