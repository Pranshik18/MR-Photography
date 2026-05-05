import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ProjectModel from "@/models/project";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all");
    const categoryId = searchParams.get("categoryId");

    const filter: any = all === "true" ? {} : { isPublic: true };
    
    if (categoryId) {
      filter.category = categoryId;
    }

    const projects = await ProjectModel.find(filter).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        message: "All projects information",
        data: projects,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("DEBUG PROJECT FETCH ERROR:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
