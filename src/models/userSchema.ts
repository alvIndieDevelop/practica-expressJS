import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  id: Number;
  name: String;
  email: String;
  password: String;
  document: String;
  comparePassword(comparedPassword: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    id: { type: Number, required: false },
    name: { type: String, required: false },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    document: { type: String, unique: true, required: false },
  },
  { timestamps: true, versionKey: false }
);

// events
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    // get las user to increment the id key
    const lastUser = await mongoose
      .model("User")
      .findOne({}, {}, { sort: { id: -1 } });
    this.id = lastUser ? lastUser.id + 1 : 1;

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
