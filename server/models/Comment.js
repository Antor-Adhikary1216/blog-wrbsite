import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 1200,
    },
    status: {
      type: String,
      enum: ['approved', 'hidden'],
      default: 'approved',
    },
  },
  { timestamps: true },
)

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
