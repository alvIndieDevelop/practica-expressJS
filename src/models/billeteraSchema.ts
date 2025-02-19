import mongoose, { Schema, Document } from "mongoose";
import { UserModel } from "./userSchema";

export interface IBilletera extends Document {
  userId: string | Schema.Types.ObjectId;
  amount: number;
}

const billeteraSchema = new Schema<IBilletera>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const BilleteraModel = mongoose.model("Billetera", billeteraSchema);
