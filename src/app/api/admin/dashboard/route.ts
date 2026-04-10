import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ProjectModel from "@/models/project";


export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const recentProjects = await ProjectModel.find({})
      .sort({ createdAt: -1 })
      .limit(3);

    return NextResponse.json(
      {
        success: true,
        message: "Recent projects retrieved successfully",
        data: recentProjects,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard data",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
