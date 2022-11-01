import Transaction from "../models/transaction.js";

export const createTransaction = async (userId) => {
  const transaction = await Transaction.create({
    userId,
  });
  transaction.save();
  try {
  } catch (error) {
    console.log("Error in creating transaction", error);
  }
};
