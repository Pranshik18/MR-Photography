import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import CategoryModel from "@/models/category";
import ProjectModel from "@/models/project";

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

    const projects = await ProjectModel.find({ category: id, isPublic: true });

    const formattedImages: { title: string; imageUrl: string }[] = [];

    projects.forEach((project) => {
      if (project.heroImage) {
        formattedImages.push({
          title: project.title,
          imageUrl: project.heroImage,
        });
      }

      if (project.images && Array.isArray(project.images)) {
        project.images.forEach((img: any) => {
          if (img.url) {
            formattedImages.push({
              title: project.title,
              imageUrl: img.url,
            });
          }
        });
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Category images retrieved successfully",
        data: formattedImages,
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
