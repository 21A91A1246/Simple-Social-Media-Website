import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  text: { type: String, required: true },
  imageUrl: { type: String }, // optional
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // users who liked

}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
