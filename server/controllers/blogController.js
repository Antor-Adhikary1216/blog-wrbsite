import mongoose from 'mongoose'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'
import { estimateReadTime, slugify } from '../utils/slugify.js'

const BLOG_SELECT = '-__v'
const AUTHOR_SELECT = 'name role avatarUrl'

function isAdmin(request) {
  return request.user?.role === 'admin'
}

function parseTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => tag.trim()).filter(Boolean)
  }

  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  }

  return []
}

async function uniqueSlug(title, blogId) {
  const baseSlug = slugify(title)
  let nextSlug = baseSlug
  let counter = 2

  while (
    await Blog.exists({
      slug: nextSlug,
      ...(blogId ? { _id: { $ne: blogId } } : {}),
    })
  ) {
    nextSlug = `${baseSlug}-${counter}`
    counter += 1
  }

  return nextSlug
}

function buildBlogPayload(body) {
  const payload = {
    title: body.title,
    excerpt: body.excerpt,
    content: body.content,
    coverImage: body.coverImage,
    category: body.category || 'Editorial',
    tags: parseTags(body.tags),
    status: body.status === 'published' ? 'published' : 'draft',
    featured: Boolean(body.featured),
  }

  if (payload.content) {
    payload.readTime = estimateReadTime(payload.content)
  }

  return payload
}

export async function getBlogs(request, response, next) {
  try {
    const { search, category, status } = request.query
    const query = {}

    if (!isAdmin(request)) {
      query.status = 'published'
    } else if (status && status !== 'all') {
      query.status = status
    }

    if (category && category !== 'all') {
      query.category = category
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { excerpt: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') },
      ]
    }

    const blogs = await Blog.find(query)
      .select(BLOG_SELECT)
      .populate('author', AUTHOR_SELECT)
      .sort({ featured: -1, createdAt: -1 })

    return response.json({ blogs })
  } catch (error) {
    return next(error)
  }
}

export async function getAdminBlogs(_request, response, next) {
  try {
    const blogs = await Blog.find()
      .select(BLOG_SELECT)
      .populate('author', AUTHOR_SELECT)
      .sort({ createdAt: -1 })

    return response.json({ blogs })
  } catch (error) {
    return next(error)
  }
}

export async function getBlog(request, response, next) {
  try {
    const { slug } = request.params
    const idQuery = mongoose.isValidObjectId(slug) ? { _id: slug } : null
    const blog = await Blog.findOne({
      $or: [{ slug }, ...(idQuery ? [idQuery] : [])],
      ...(!isAdmin(request) ? { status: 'published' } : {}),
    })
      .select(BLOG_SELECT)
      .populate('author', AUTHOR_SELECT)

    if (!blog) {
      return response.status(404).json({ message: 'Blog not found.' })
    }

    const comments = await Comment.find({ blog: blog._id, status: 'approved' })
      .populate('author', AUTHOR_SELECT)
      .sort({ createdAt: -1 })

    return response.json({ blog, comments })
  } catch (error) {
    return next(error)
  }
}

export async function createBlog(request, response, next) {
  try {
    const payload = buildBlogPayload(request.body)

    if (!payload.title || !payload.excerpt || !payload.content || !payload.coverImage) {
      return response.status(400).json({
        message: 'Title, excerpt, content, and cover image are required.',
      })
    }

    payload.slug = await uniqueSlug(payload.title)
    payload.author = request.user._id

    const blog = await Blog.create(payload)
    await blog.populate('author', AUTHOR_SELECT)

    return response.status(201).json({ blog })
  } catch (error) {
    return next(error)
  }
}

export async function updateBlog(request, response, next) {
  try {
    const payload = buildBlogPayload(request.body)

    if (payload.title) {
      payload.slug = await uniqueSlug(payload.title, request.params.id)
    }

    const blog = await Blog.findByIdAndUpdate(request.params.id, payload, {
      new: true,
      runValidators: true,
    }).populate('author', AUTHOR_SELECT)

    if (!blog) {
      return response.status(404).json({ message: 'Blog not found.' })
    }

    return response.json({ blog })
  } catch (error) {
    return next(error)
  }
}

export async function deleteBlog(request, response, next) {
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id)

    if (!blog) {
      return response.status(404).json({ message: 'Blog not found.' })
    }

    await Comment.deleteMany({ blog: blog._id })
    return response.json({ message: 'Blog deleted successfully.' })
  } catch (error) {
    return next(error)
  }
}
