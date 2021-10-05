import mongoose from "mongoose";

const ViewSchema = new mongoose.Schema(
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

export default mongoose.models.View || mongoose.model("View", ViewSchema);
