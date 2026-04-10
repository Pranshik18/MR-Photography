import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import connectToDatabase from "@/utils/db";
import UserModel from "@/models/user";

const JWT_SECRET = process.env.JWT_SECRET || "123456";


export async function POST(req: NextRequest) {
  try {
    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Both current and new passwords are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 4) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 4 characters long" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No session token found" },
        { status: 401 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invalid or expired session" },
        { status: 401 }
      );
    }
    await connectToDatabase();
    const user = await UserModel.findById(decoded._id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(oldPassword, user.hashPassword);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Incorrect current password" },
        { status: 401 }
      );
    }

    // 5. Hash new password and save
    // Use salt rounds from env or default to 12
    const saltRounds = parseInt(process.env.SECRET_SALT || "12");
    const newHash = await bcrypt.hash(newPassword, saltRounds);

    user.hashPassword = newHash;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Password updated successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Password reset error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to reset password",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
