import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IPricing extends Document {
  title: string;                    
  features: string[];               
  currency: 'INR' | 'USD';
  price: number;          
  isActive: boolean;
  order: number;                    
  createdAt: Date;
  updatedAt: Date;
}

const pricingSchema: Schema<IPricing> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Package title is required'],
      trim: true,
      maxlength: 100,
    },

    features: {
      type: [String],
      required: [true, 'At least one feature is required'],
      validate: {
        validator: (features: string[]) => features.length > 0 && features.length <= 15,
        message: 'Features must be between 1 and 15 items',
      },
    },

    currency: {
      type: String,
      enum: ['INR', 'USD'],
      required: [true, 'Currency is required'],
      default: 'INR',
    },

    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    collection: 'pricings',
  }
);

const PricingModel: Model<IPricing> =
  mongoose.models.Pricing || mongoose.model<IPricing>('Pricing', pricingSchema);

export default PricingModel;