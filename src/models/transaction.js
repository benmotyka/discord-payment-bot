import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
