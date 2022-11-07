import Transaction from "../models/transaction.js";

export const createTransaction = async ({
  channelId,
  guildId,
  userId,
  username,
  discriminator,
}) => {
  try {
    const transaction = await Transaction.create({
      channelId,
      guildId,
      userId,
      username,
      discriminator,
    });
    transaction.save();
    return transaction;
  } catch (error) {
    console.log("Error in creating transaction", error);
  }
};

export const softDeleteTransaction = async ({ channelId }) => {
  try {
    const transaction = await Transaction.findOne({
      channelId,
    });

    if (!transaction) return;

    await transaction.updateOne({
      deletedAt: new Date(),
    });
  } catch (error) {
    console.log("Error in soft deleting transaction", error);
  }
};

export const getTransactionDetailsByChannelId = async ({ channelId }) => {
  try {
    return await Transaction.findOne({
      channelId,
      deletedAt: null,
    });
  } catch (error) {
    console.log("Error in getting transaction details by channel id", error);
  }
};

export const confirmUserTransaction = async ({ channelId, userId }) => {
  try {
    return await Transaction.findOneAndUpdate(
      {
        channelId,
        userId,
        deletedAt: null,
      },
      {
        confirmedByUser: true,
      }
    );
  } catch (error) {
    console.log("Error in soft deleting transaction", error);
  }
};
