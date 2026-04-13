import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import PricingModel from "@/models/price";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, features, currency, price, isActive, order,isRecommended } = body;

    if (!title || !features || price === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields (title, features, or price)",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newPricing = await PricingModel.create({
      title,
      features,
      currency: currency || "INR",
      price,
      isActive: isActive !== undefined ? isActive : true,
      isRecommended: isRecommended !== undefined ? isRecommended : false,
      order: order || 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pricing package created successfully",
        data: newPricing,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating pricing:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create pricing package",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
