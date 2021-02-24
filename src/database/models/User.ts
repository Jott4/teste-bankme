import mongoose, { Document } from 'mongoose';

interface UserModel extends Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

export default mongoose.models.User ||
  mongoose.model<UserModel>('User', UserSchema);