const Transaction = require("../models/transaction");

module.exports = {
  async createTransaction(userId) {
    const transaction = await Transaction.create({
      userId,
    });
    transaction.save();
    try {
    } catch (error) {
      console.log("Error in creating transaction", error);
    }
  },
};
