import mongoose, { Model, Schema, Document } from "mongoose";

export interface IHomepageImage {
  url: string;
  publicId?: string;
  alt?: string;
  order: number;
}

export interface IHomepage extends Document {
  title: string;
  subtitle: string;
  images: IHomepageImage[];
  createdAt: Date;
  updatedAt: Date;
}

const HomepageImageSchema = new Schema<IHomepageImage>({
  url: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  publicId: {
    type: String,
    required: false,
  },
  alt: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
    required: true,
    default: 0,
  },
});

const homepageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Site title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      required: [true, 'Subtitle is required'],
      trim: true,
    },
    images: {
      type: [HomepageImageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'homepage',
  }
);

const HomepageModel: Model<IHomepage> =
  mongoose.models.Homepage || mongoose.model<IHomepage>('Homepage', homepageSchema);

export default HomepageModel;
