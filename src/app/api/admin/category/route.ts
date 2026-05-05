import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import CategoryModel from "@/models/category";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await CategoryModel.find({}, 'title _id order').sort({ order: 1 });
    console.log("--> Fetched Categories:", categories.length, categories);

    return NextResponse.json(
      {
        success: true,
        message: "Categories retrieved successfully",
        data: categories,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching categories for admin:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
