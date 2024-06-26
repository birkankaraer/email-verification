import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  verificationToken: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});