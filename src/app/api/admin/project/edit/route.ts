import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import ProjectModel from "@/models/project";
import { uploadSingle } from "@/utils/cloudinary-client";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      subtitle,
      description,
      clientName,
      projectRole,
      date,
      category,
      heroImage, 
      images,   
    } = body;

    if (!id || !title || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields (id, title, description)",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingProject = await ProjectModel.findById(id);

    if (!existingProject) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    let heroUrl = existingProject.heroImage;

    // Upload Hero Image if provided
    if (heroImage && heroImage.startsWith("data:image")) {
      const heroUpload = await uploadSingle(heroImage, `mr-photography/projects/${slug}`);
      heroUrl = heroUpload.secure_url;
    } else if (heroImage) {
        heroUrl = heroImage;
    }

    // Process Gallery Images 
    const uploadedImages = [];
    if (images && images.length > 0) {
      for (const img of images) {
        if (img.url && img.url.startsWith("data:image")) {
          const upload = await uploadSingle(img.url, `mr-photography/projects/${slug}/gallery`);
          uploadedImages.push({
            url: upload.secure_url,
            publicId: upload.public_id,
            order: img.order || 0
          });
        } else {
          // keep existing
          uploadedImages.push({
            url: img.url,
            publicId: img.publicId || "",
            order: img.order || 0
          });
        }
      }
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        description,
        client: clientName,
        role: projectRole || "Photographer",
        date: date || "",
        category: category || "",
        heroImage: heroUrl,
        images: uploadedImages,
        slug,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Project updated successfully",
        data: updatedProject,
      },
      { status: 200 }
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
