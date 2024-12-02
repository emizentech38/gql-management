import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) {
          throw new Error("Unautorized");
        }
        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (err) {
        console.log("Error in getting transactions ", err);
        throw new Error("Error in getting transactions");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (err) {
        console.error("Error in getting transaction ", err);
        throw new Error("Error in getting transaction");
      }
    },
    // TODO => ADD categoryStatistics query
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });

        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error in creating transaction ", err);
        throw new Error("Error in creating transaction");
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );

        return updatedTransaction;
      } catch (error) {
        console.error("Error in updating transaction ", err);
        throw new Error("Error in updating transaction");
      }
    },
    deleteTransaction: async (_ , {transactionId}) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

        return deletedTransaction;
      } catch (error) {
        console.error("Error in deleting transaction ", err);
        throw new Error("Error in deleting transaction");
      }
    },
  },
  // TODO => ADD TRNASACTION/USER RELATIONSHIP
};

export default transactionResolver;
