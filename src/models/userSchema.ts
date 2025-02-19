import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  document: string;
  phone: string;
  comparePassword(comparedPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    document: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
  },
  { timestamps: true, versionKey: false }
);

// events
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    // update the password and hashed
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (
  comparedPassword: string
): Promise<boolean> {
  return bcrypt.compare(comparedPassword, this.password);
};

export const UserModel = mongoose.model<IUser>("User", userSchema);
