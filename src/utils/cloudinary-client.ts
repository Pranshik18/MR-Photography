import cloudinary from "./cloudinary";


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
