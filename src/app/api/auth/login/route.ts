import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import UserModel from "@/src/models/user";
import { z } from "zod";
import { connectToDatabase } from "@/src/utils/db";
import jwt  from 'jsonwebtoken'

const loginSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

const JWT_SECRET = process.env.JWT_SECRET;
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const { email, password } = loginSchema.parse(body);

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }
    const isPasswordValid = await bcrypt.compare(password,user.hashPassword);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const {hashPassword:__, ...userResponse } = 
      user.toObject?.() || user;

    const token = jwt.sign(userResponse, JWT_SECRET, {expiresIn: "7d",});
    const response =  NextResponse.json(
      {
        success: true,
        message: "Login successful",
      },
      { status: 200 }
    );

    response.cookies.set('token',token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", 
      maxAge: 60 * 60 * 24 * 14, 
      path: "/",
    })
    return response;
  } catch (error: any) {
    console.error("Login error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.errors.map((err: any) => ({
            field: err.path[0],
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}