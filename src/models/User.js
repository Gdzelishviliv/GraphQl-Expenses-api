import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }]
});

const User= mongoose.model('User', UserSchema);

export default User;