import { Link, useParams } from 'react-router-dom'
import CommentSection from '../components/blog/CommentSection.jsx'
import LoadingScreen from '../components/common/LoadingScreen.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useBlogDetail } from '../hooks/useBlogDetail.js'
import { pathTo } from '../routes/routePaths.js'
import { formatDate } from '../utils/formatters.js'

function BlogDetailPage() {
  const { slug } = useParams()
  const { isAdmin } = useAuth()
  const { blog, comments, setComments, isLoading } = useBlogDetail(slug)

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!blog) {
    return (
      <section className="mx-auto max-w-2xl py-24 text-center">
        <h1 className="text-5xl italic text-zinc-950">
          Editorial not found
        </h1>
      </section>
    )
  }

  const paragraphs = blog.content.split('\n').filter(Boolean)
  const isDemo = blog._id?.startsWith('demo-')

  return (
    <article className="mx-auto max-w-4xl">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
          {blog.category}
        </p>
        <h1 className="mt-4 text-5xl font-semibold italic tracking-tight text-zinc-950 md:text-7xl">
          {blog.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
          {blog.excerpt}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-zinc-500">
          <span>{formatDate(blog.createdAt)}</span>
          <span>/</span>
          <span>{blog.readTime} min read</span>
          <span>/</span>
          <span>{blog.author?.name || 'Editorial desk'}</span>
        </div>
        {isAdmin && !isDemo ? (
          <Link
            className="mt-6 inline-flex rounded-full border border-zinc-200 px-5 py-2 text-sm font-semibold text-zinc-700 hover:border-zinc-950"
            to={pathTo.editBlog(blog._id)}
          >
            Edit editorial
          </Link>
        ) : null}
      </div>

      <img
        alt={blog.title}
        className="mt-10 h-[620px] w-full rounded-lg object-cover"
        src={blog.coverImage}
      />

      <div className="prose prose-zinc mx-auto mt-10 max-w-3xl text-lg leading-9 text-zinc-700">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <CommentSection
        blog={blog}
        comments={comments}
        isDemo={isDemo}
        setComments={setComments}
      />
    </article>
  )
}

export default BlogDetailPage
