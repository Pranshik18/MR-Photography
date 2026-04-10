import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import PricingModel from "@/models/price";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Pricing package ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const deletedPricing = await PricingModel.findByIdAndDelete(id);

    if (!deletedPricing) {
      return NextResponse.json(
        { success: false, message: "Pricing package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Pricing package deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting pricing:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete pricing package",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
