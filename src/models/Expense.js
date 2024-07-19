import mongoose from 'mongoose';
const { Schema } = mongoose;

const ExpenseSchema = new Schema({
  amount: Number,
  description: String,
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Expense', ExpenseSchema);
