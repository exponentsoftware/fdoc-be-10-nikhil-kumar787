import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      default: 0,
    },
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    todoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Like || mongoose.model("Like", LikeSchema);
