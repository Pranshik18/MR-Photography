import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  title: string;
  imageUrl: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Category title is required'],
      trim: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      default:null,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: 'categories',
  }
);

const CategoryModel: Model<ICategory> = 
  mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default CategoryModel;
