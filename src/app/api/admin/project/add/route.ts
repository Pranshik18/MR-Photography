import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ProjectModel from "@/models/project";
import { uploadSingle } from "@/utils/cloudinary-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      subtitle,
      description,
      clientName,
      projectRole,
      date,
      categoryId,
      heroImage, 
      images,   
    } = body;

    if (!title || !description || !heroImage) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields (title, description, heroImage)",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const heroUpload = await uploadSingle(heroImage, `mr-photography/projects/${slug}`);
    const heroUrl = heroUpload.secure_url;
    const uploadedImages = [];
    if (images && images.length > 0) {
      for (const img of images) {
        const upload = await uploadSingle(img.url, `mr-photography/projects/${slug}/gallery`);
        uploadedImages.push({
          url: upload.secure_url,
          publicId: upload.public_id,
          order: img.order || 0
        });
      }
    }

    const newProject = await ProjectModel.create({
      title,
      subtitle,
      description,
      client: clientName,
      role: projectRole || "Photographer",
      date: date || "",
      category: categoryId || null,
      heroImage: heroUrl,
      images: uploadedImages,
      slug,
      year: new Date().getFullYear(),
      isPublic: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "API Test: Project created successfully",
        data: newProject,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error receiving project data:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process request",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
