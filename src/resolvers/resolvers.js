import Expense from "../models/Expense.js";
import User from "../models/User.js";

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find().populate("expenses");
      } catch (error) {
        throw new Error(error);
      }
    },
    user: async (_, { id }) => {
      try {
        return await User.findById(id).populate("expenses");
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    addUser: (_, { name }) => User.create({ name }),
    updateUser: (_, { id, name }) =>
      User.findByIdAndUpdate(id, { name }, { new: true }),
    deleteUser: async (_, { id }) => {
      const user = await User.findByIdAndDelete(id);
      await Expense.deleteMany({ user: id });
      return user;
    },
    addExpense: async (_, { amount, description, date, userId }) => {
      const expense = await Expense.create({
        amount,
        description,
        date,
        user: userId,
      });
      await User.findByIdAndUpdate(userId, { $push: { expenses: expense.id } });
      return expense;
    },
    updateExpense: (_, { id, amount, description, date }) =>
      Expense.findByIdAndUpdate(
        id,
        { amount, description, date },
        { new: true }
      ),
    deleteExpense: async (_, { id }) => {
      const expense = await Expense.findByIdAndDelete(id);
      await User.findByIdAndUpdate(expense.user, {
        $pull: { expenses: expense.id },
      });
      return expense;
    },
  },
  User: {
    expenses: async (parent) => await Expense.find({ user: parent.id }),
  },
  Expense: {
    user: async (parent) => await User.findById(parent.user),
  },
};

export default resolvers;
