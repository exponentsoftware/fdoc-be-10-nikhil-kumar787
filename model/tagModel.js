import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter tag title"],
    },
    category: {
      type: String,
      required: [true, "Please enter tag category"],
    },
    todoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Tag || mongoose.model("Tag", TagSchema);
