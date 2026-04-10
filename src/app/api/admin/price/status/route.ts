import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import PricingModel from "@/models/price";


export async function PUT(req: NextRequest) {
  try {
    const { id, isActive } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Pricing package ID is required" },
        { status: 400 }
      );
    }
    console.log(id , isActive)
    await connectToDatabase();

    const updatedPricing = await PricingModel.findByIdAndUpdate(
      id,
      { isActive },                    
      { 
        new: true,                     
        returnDocument: 'after',       
        runValidators: true 
      }
    );
    console.log(updatedPricing)

    if (!updatedPricing) {
      return NextResponse.json(
        { success: false, message: "Pricing package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Pricing status updated successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error updating pricing status:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update pricing status",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
