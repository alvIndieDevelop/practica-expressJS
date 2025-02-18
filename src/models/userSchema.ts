import mongoose, { Schema, Document } from "mongoose";

const userSchema = new Schema(
  {
    id: { type: String, required: false },
    name: { type: String, required: false },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    document: { type: String, unique: true, required: false },
  },
  { timestamps: true, versionKey: false }
);

export const UserModel = mongoose.model("User", userSchema);
