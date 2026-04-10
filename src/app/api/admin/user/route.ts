import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/utils/db";
import UserModel from "@/models/user";

const JWT_SECRET = process.env.JWT_SECRET || "123456";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const user = await UserModel.findById(decoded._id).select("-hashPassword");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User information retrieved",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch user data", error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
