import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import PricingModel from "@/models/price";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderedIds } = body;

    if (!orderedIds || !Array.isArray(orderedIds)) {
      return NextResponse.json(
        { success: false, message: "orderedIds array is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updatePromises = orderedIds.map((id, index) => {
      return PricingModel.findByIdAndUpdate(id, { order: index });
    });

    await Promise.all(updatePromises);

    return NextResponse.json(
      { success: true, message: "Pricing order updated successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error reordering pricings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to reorder pricings", error },
      { status: 500 }
    );
  }
}
