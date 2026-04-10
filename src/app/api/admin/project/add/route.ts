import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ProjectModel from "@/models/project";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      subtitle,
      description,
      client,
      role,
      heroImage, 
      images,   
      slug,
      year,
      location,
      isPublic,
    } = body;

    if (!title || !description || !heroImage || !slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields (title, description, heroImage, or slug)",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newProject = await ProjectModel.create({
      title,
      subtitle,
      description,
      client,
      role: role || "Photographer",
      heroImage,
      images: images || [],
      slug,
      year,
      location,
      isPublic: isPublic !== undefined ? isPublic : true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "API Test: Project created successfully",
        data: newProject,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error receiving project data:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process request",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
