import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    payment_id: {
      type: String,
    },
    order_id: {
      type: String,
    },
    amount: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
