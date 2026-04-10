import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ProjectModel from "@/models/project";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const projects = await ProjectModel.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        message: "All projects information",
        data: projects,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects",
        error: error,
      },
      { status: 500 }
    );
  }
}
