import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ProjectModel from "@/models/project";

export async function PUT(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id,
      { featured: true },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Project added to featured successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error adding feature status:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update feature status",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
