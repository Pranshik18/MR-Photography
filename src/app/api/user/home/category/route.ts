import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ProjectModel from "@/models/project";
import CategoryModel from "@/models/category";

export async function GET() {
  try {
    await connectToDatabase();
    const distinctCategoryIds = await ProjectModel.distinct("category", { 
      category: { $ne: null },
      isPublic: true 
    });

    const categories = await CategoryModel.find({
      _id: { $in: distinctCategoryIds }
    }).select("title imageUrl _id").sort({ order: 1 });

    const formattedCategories = categories.map((cat) => ({
      id: cat._id.toString(),
      title: cat.title,
      imageUrl: cat.imageUrl,
    }));

    return NextResponse.json(
      {
        success: true,
        message: "Unique categories retrieved successfully",
        data: formattedCategories,
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
