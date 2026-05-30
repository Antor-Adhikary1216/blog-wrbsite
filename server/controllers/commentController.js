import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'

const AUTHOR_SELECT = 'name role avatarUrl'

async function findPublishedBlog(slug) {
  return Blog.findOne({ slug, status: 'published' })
}

export async function getComments(request, response, next) {
  try {
    const blog = await findPublishedBlog(request.params.slug)

    if (!blog) {
      return response.status(404).json({ message: 'Blog not found.' })
    }

    const comments = await Comment.find({ blog: blog._id, status: 'approved' })
      .populate('author', AUTHOR_SELECT)
      .sort({ createdAt: -1 })

    return response.json({ comments })
  } catch (error) {
    return next(error)
  }
}

export async function addComment(request, response, next) {
  try {
    const { content } = request.body
    const blog = await findPublishedBlog(request.params.slug)

    if (!blog) {
      return response.status(404).json({ message: 'Blog not found.' })
    }

    if (!content || content.trim().length < 2) {
      return response
        .status(400)
        .json({ message: 'Comment must be at least 2 characters.' })
    }

    const comment = await Comment.create({
      blog: blog._id,
      author: request.user._id,
      content,
    })

    await comment.populate('author', AUTHOR_SELECT)
    return response.status(201).json({ comment })
  } catch (error) {
    return next(error)
  }
}

export async function deleteComment(request, response, next) {
  try {
    const comment = await Comment.findById(request.params.id)

    if (!comment) {
      return response.status(404).json({ message: 'Comment not found.' })
    }

    const isOwner = comment.author.toString() === request.user._id.toString()
    const isAdmin = request.user.role === 'admin'

    if (!isOwner && !isAdmin) {
      return response.status(403).json({ message: 'You do not have access.' })
    }

    await comment.deleteOne()
    return response.json({ message: 'Comment deleted successfully.' })
  } catch (error) {
    return next(error)
  }
}
