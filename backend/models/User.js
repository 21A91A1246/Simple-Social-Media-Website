import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // 🆕 Extra profile fields
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  profilePic: { type: String, default: '' }, // URL or path to uploaded image
});

const User = mongoose.model('User', UserSchema);
export default User;
