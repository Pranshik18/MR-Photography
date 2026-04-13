import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import PricingModel from "@/models/price";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, features, currency, price, isActive, order, isRecommended} = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing required field: id" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Prepare update data
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (features !== undefined) updateData.features = features;
    if (currency !== undefined) updateData.currency = currency;
    if (price !== undefined) updateData.price = price;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (isRecommended !== undefined) updateData.isRecommended = isRecommended;
    if (order !== undefined) updateData.order = order;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "No data provided to update" },
        { status: 400 }
      );
    }

  const updatedPricing = await PricingModel.findByIdAndUpdate(
  id,
  { $set: updateData },
  { 
    returnDocument: 'after',
    runValidators: true 
  }
);

    if (!updatedPricing) {
      return NextResponse.json(
        { success: false, message: "Pricing package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Pricing package updated successfully",
        data: updatedPricing,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error updating pricing:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update pricing package",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
