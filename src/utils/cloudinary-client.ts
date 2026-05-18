import { Readable } from "stream";
import cloudinary from "./cloudinary";

export const uploadStream = async (buffer: Buffer, folder: string = "mr-photography"): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload_stream error:", error);
          const message = error?.message || "Unknown Cloudinary error";
          reject(new Error(`Failed to upload image to Cloudinary: ${message}`));
        } else {
          resolve(result);
        }
      }
    );
    Readable.from(buffer).pipe(stream);
  });
};


export const uploadSingle = async (file: string, folder: string = "mr-photography") => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: "auto",
    });
    return result;
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    const message = error?.message || "Unknown Cloudinary error";
    throw new Error(`Failed to upload image to Cloudinary: ${message}`);
  }
};

export const uploadMultiple = async (files: string[], folder: string = "mr-photography") => {
  try {
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file, {
        folder: folder,
        resource_type: "auto",
      })
    );
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error("Cloudinary multiple upload error:", error);
    throw new Error("Failed to upload images to Cloudinary");
  }
};

export const deleteSingle = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
};
