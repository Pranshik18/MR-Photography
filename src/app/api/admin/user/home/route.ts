import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import HomepageModel from "@/models/homepage";
import { uploadSingle } from "@/utils/cloudinary-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, subtitle, images } = body;

    if (!title || !subtitle) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and Subtitle are required",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const processedImages = [];
    if (images && Array.isArray(images)) {
      for (const img of images) {
        if (img.url.startsWith("data:image/")) {
          try {
            const uploadResult = await uploadSingle(img.url, "mr-photography/homepage");
            processedImages.push({
              url: uploadResult.secure_url,
              publicId: uploadResult.public_id,
              order: img.order,
              alt: img.alt || ""
            });
          } catch (uploadError) {
            console.error("Failed to upload image to Cloudinary:", uploadError);
          }
        } else {
          processedImages.push(img);
        }
      }
    }

    const updatedHomepage = await HomepageModel.findOneAndUpdate(
      {}, 
      {
        $set: {
          title,
          subtitle,
          images: processedImages,
        }
      },
      { 
        new: true, 
        upsert: true,
        setDefaultsOnInsert: true 
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Homepage information updated successfully",
        data: updatedHomepage,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error adding homepage information:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add homepage information",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const homepageData = await HomepageModel.findOne().sort({ createdAt: -1 });

    if (!homepageData) {
      return NextResponse.json(
        {
          success: false,
          message: "No homepage data found",
        },
        { status: 404 }
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
      },
      { status: 500 }
    );
  }
}
