import mongoose, { Document } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { required: true, type: String, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  _doc: any;
}

export default mongoose.model<UserDocument>('User', userSchema);
