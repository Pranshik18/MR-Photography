import mongoose ,{ Schema,Model, Document } from "mongoose"


export interface user extends Document {
 _id: mongoose.Types.ObjectId;
 name: string;
 email: string;
 hashPassword: string;
 bio?: string | null;
 avatar?: string | null;
}


const userSchema : Schema<user> = new mongoose.Schema({
  name: {
     type: String,
     required: [true, 'Name is required'],
     trim: true,
     maxlength: 100,
   },

   email: {
     type: String,
     required: [true, 'Email is required'],
     unique: true,
     lowercase: true,
     trim: true,
     match: [
       /^\S+@\S+\.\S+$/,
       'Please provide a valid email address',
     ],
   },

   hashPassword: {
     type: String,
     required: [true, 'Password is required'],
     minlength: 8,
   },

   bio: {
     type: String,
     default: null,
     maxlength: 500,
   },

   avatar: {
     type: String,
     default: null,
   }
})

const UserModel: Model<user> = mongoose.models.User || mongoose.model<user>('User', userSchema);

export default UserModel;


