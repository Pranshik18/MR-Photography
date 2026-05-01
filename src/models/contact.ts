import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  date?: string;
  location?: string;
  category?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  isRead: boolean;
  reply?: string;
  repliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema: Schema<IContact> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        'Please enter a valid email address',
      ],
    },

    phone: { type: String, trim: true },
    date: { type: String, trim: true },
    location: { type: String, trim: true },
    category: { type: String, trim: true },

    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },

    isRead: {
      type: Boolean,
      default: false,
    },
    
    reply: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    repliedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'contacts',
  }
);

const ContactModel: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', contactSchema);

export default ContactModel;