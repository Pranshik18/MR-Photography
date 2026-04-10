import mongoose , {Model , Schema , Document} from "mongoose";

export interface IProjectImage {
  url: string;
  publicId?: string;
  caption?: string;
  order: number;
}

export interface IProject extends Document {
  title: string;
  subtitle?: string;
  description: string;
  client?: string;
  role?: string;
  heroImage: string;                    
  images: IProjectImage[];              
  slug: string;                         
  year: number;
  location?: string;
  isPublic: boolean;                   
  featured: boolean;                    
  order?: number;                       

  createdAt: Date;
  updatedAt: Date;
}

const ProjectImageSchema = new Schema<IProjectImage>({
  url: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  publicId: {
    type: String,
    required: false,
  },
  caption: {
    type: String,
    maxlength: 250,
    trim: true,
  },
  order: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
});

const projectSchema: Schema<IProject> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: 120,
    },

    subtitle: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },

    client: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
      maxlength: 100,
    },

    role: {
      type: String,
      default: 'Photographer',
      trim: true,
      maxlength: 80,
    },

    heroImage: {
      type: String,
      required: [true, 'Hero image is required'],
    },

    images: {
      type: [ProjectImageSchema],
      default: [],
      validate: {
        validator: function (images: IProjectImage[]) {
          return images.length <= 30; // Limit gallery size
        },
        message: 'Maximum 30 images allowed per project',
      },
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: 2000,
      max: new Date().getFullYear() + 1,
    },

    location: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    isPublic: {
      type: Boolean,
      default: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,           
    collection: 'projects',
  }
);

const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);

export default ProjectModel;
