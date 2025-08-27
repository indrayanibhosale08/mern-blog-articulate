import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  blog: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Blog' },
  text: { type: String, required: true },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;