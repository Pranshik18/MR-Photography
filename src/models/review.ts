// models/Review.ts
import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IReview extends Document {
  clientName: string;
  description: string;
  projectId?: mongoose.Types.ObjectId;    
  rating?: number;                         
  isApproved: boolean;   
  createdAt: Date;               
  updatedAt: Date;
}

const reviewSchema: Schema<IReview> = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: [true, 'Review description is required'],
      trim: true,
      maxlength: 800,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: false,
    },

    isApproved: {
      type: Boolean,
      default: true,         
    },
  },
  {
    timestamps: true,           
    collection: 'reviews',
  }
);


const ReviewModel: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);

export default ReviewModel;