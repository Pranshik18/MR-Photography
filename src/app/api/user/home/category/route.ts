import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ProjectModel from "@/models/project";

export async function GET() {
  try {
    await connectToDatabase();
    const distinctCategoryIds = await ProjectModel.distinct("category", { 
      category: { $ne: null },
      isPublic: true 
    });

    return NextResponse.json(
      {
        success: true,
        message: "Unique category IDs retrieved successfully",
        data: distinctCategoryIds,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching unique category IDs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch category IDs",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
