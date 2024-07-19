import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }]
});

export default mongoose.model('User', UserSchema);
