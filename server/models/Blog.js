import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 140,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
    },
    content: {
      type: String,
      required: true,
      minlength: 40,
    },
    coverImage: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      default: 'Editorial',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    readTime: {
      type: Number,
      default: 1,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
)

blogSchema.index({ title: 'text', excerpt: 'text', content: 'text' })

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
