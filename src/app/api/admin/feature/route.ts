import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ProjectModel from "@/models/project";


export async function GET() {
  try {
    await connectToDatabase();
    const featuredProjects = await ProjectModel.find({ featured: true }).sort({ order: 1 });
    
    return NextResponse.json(
      {
        success: true,
        data: featuredProjects,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching featured projects:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch featured projects" },
      { status: 500 }
    );
  }
}


export async function PUT(req: NextRequest) {
  try {
    const { projectIds } = await req.json();

    if (!Array.isArray(projectIds)) {
      return NextResponse.json(
        { success: false, message: "Invalid payload: projectIds array is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updatePromises = projectIds.map((id, index) => {
      return ProjectModel.findByIdAndUpdate(id, { order: index });
    });

    await Promise.all(updatePromises);

    return NextResponse.json(
      {
        success: true,
        message: "Project order updated successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Bulk reorder error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update project sequence",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
