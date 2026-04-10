import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import PricingModel from "@/models/price";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const pricings = await PricingModel.find({}).sort({ order: 1 });

    return NextResponse.json(
      {
        success: true,
        message: "Pricing information retrieved successfully",
        data: pricings,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching pricing info:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch pricing information",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
