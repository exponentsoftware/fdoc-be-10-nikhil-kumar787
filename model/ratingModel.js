import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      default: 0,
      max: [5, "Number should be less than or Equal to 5 "],
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

export default mongoose.models.Rating || mongoose.model("Rating", RatingSchema);
