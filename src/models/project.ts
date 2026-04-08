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
  role: string;
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