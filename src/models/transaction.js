import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    channelId: {
      type: String,
      require: true,
    },
    guildId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    discriminator: {
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
