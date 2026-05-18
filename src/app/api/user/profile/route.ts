import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import UserModel from "@/models/user";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Find the first user in the database (since this is a boutique studio site for one owner/photographer)
    const user = await UserModel.findOne().select("name email bio avatar");

    if (!user) {
      return NextResponse.json(
        {
          success: true,
          data: {
            name: "MR Photography",
            bio: "",
            avatar: null,
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching public user profile:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profile information",
        data: {
          name: "MR Photography",
          bio: "",
          avatar: null,
        }
      },
      { status: 500 }
    );
  }
}
