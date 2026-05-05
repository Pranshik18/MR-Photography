import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import CategoryModel from "@/models/category";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const category = await CategoryModel.findById(id);

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Category information retrieved successfully",
        data: category,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching category info:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch category info",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
