import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import HomepageModel from "@/models/homepage";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const homepageData = await HomepageModel.findOne().sort({ createdAt: -1 });

    if (!homepageData) {
      return NextResponse.json(
        {
          success: true,
          data: {
            title: "TITLE",
            subtitle: "SubTitle",
            images: [],
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: homepageData,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching homepage information:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch homepage information",
        data: {
          title: "TITLE",
          subtitle: "SubTitle",
          images: [],
        }
      },
      { status: 500 }
    );
  }
}
