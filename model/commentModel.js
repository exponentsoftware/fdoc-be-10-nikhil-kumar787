import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Please enter comment field"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    todoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
