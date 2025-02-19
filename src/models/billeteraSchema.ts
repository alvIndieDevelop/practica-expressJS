import mongoose, { Schema, Document } from "mongoose";

export interface IBilletera extends Document {
  userId: string | Schema.Types.ObjectId;
  amount: number;
}

const billeteraSchema: Schema = new Schema<IBilletera>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
