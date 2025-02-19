import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  userId: string | Schema.Types.ObjectId;
  sessionId: string;
  token: string;
  amount: number;
  status: "pending" | "success" | "failed";
}

const paymentSchema: Schema = new Schema<IPayment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sessionId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
});

export const PaymentModel = mongoose.model("Payment", paymentSchema);
