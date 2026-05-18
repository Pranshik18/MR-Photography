import { NextRequest, NextResponse } from "next/server";
import { uploadStream } from "@/utils/cloudinary-client";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;
    const slug = (data.get("slug") as string) || "default";

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const upload = await uploadStream(buffer, `mr-photography/projects/${slug}/gallery`);

    return NextResponse.json({
      success: true,
      url: upload.secure_url,
      publicId: upload.public_id,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to upload image",
      },
      { status: 500 }
    );
  }
}
