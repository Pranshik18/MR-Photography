import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ProjectModel from "@/models/project";

export async function PUT(req: NextRequest) {
  try {
    const { id, isPublic } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updatedProject = await ProjectModel.findByIdAndUpdate(
  id,
  { isPublic },                    
  { 
    returnDocument: 'after',       
    runValidators: true 
  }
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
        message: "Project status updated",
        data: updatedProject,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update status",
        error: error,
      },
      { status: 500 }
    );
  }
}
