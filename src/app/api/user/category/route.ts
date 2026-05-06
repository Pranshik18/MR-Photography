import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import CategoryModel from "@/models/category";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await CategoryModel.find().select("title").sort({ order: 1 });
    return NextResponse.json(
      {
        success: true,
        data: categories,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
