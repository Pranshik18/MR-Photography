import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/utils/db";
import UserModel from "@/models/user";
import { uploadSingle, deleteSingle } from "@/utils/cloudinary-client";

const JWT_SECRET = process.env.JWT_SECRET || "123456";

// Helper function to extract public ID from Cloudinary URL
const getPublicIdFromUrl = (url: string) => {
  try {
    const parts = url.split("/");
    const filenameWithExtension = parts[parts.length - 1];
    const filename = filenameWithExtension.split(".")[0];
    
    // Check if there is a folder (for mr-photography)
    const folderIndex = parts.indexOf("mr-photography");
    if (folderIndex !== -1) {
      const folderParts = parts.slice(folderIndex, parts.length - 1);
      return [...folderParts, filename].join("/");
    }
    
    return filename;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};

export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const body = await req.json();
    const { name, email, bio, avatar } = body;

    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // We only update fields that are provided in the request body
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (bio !== undefined) updateData.bio = bio;

    // Handle Cloudinary Upload for Avatar
    if (avatar && avatar.startsWith("data:image/")) {
      try {
        // 1. Upload new image
        const uploadResult = await uploadSingle(avatar, "mr-photography/avatars");
        updateData.avatar = uploadResult.secure_url;

        // 2. Delete old image if it exists on Cloudinary
        if (user.avatar && user.avatar.includes("cloudinary.com")) {
          const oldPublicId = getPublicIdFromUrl(user.avatar);
          if (oldPublicId) {
            await deleteSingle(oldPublicId);
          }
        }
      } catch (uploadError) {
        console.error("Cloudinary operation failed:", uploadError);
        return NextResponse.json(
          { success: false, message: "Image upload failed" },
          { status: 500 }
        );
      }
    } else if (avatar !== undefined) {
      updateData.avatar = avatar;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "No data provided to update" },
        { status: 400 }
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      decoded._id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-hashPassword");

    return NextResponse.json(
      {
        success: true,
        message: "User information updated successfully",
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error updating user data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user data",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
