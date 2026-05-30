import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatters.js'
import { pathTo } from '../../routes/routePaths.js'

function BlogCard({ blog, large = false }) {
  return (
    <article
      className={`group overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${large ? 'lg:grid lg:grid-cols-[1.15fr_0.85fr]' : ''}`}
    >
      <Link to={pathTo.blog(blog.slug)} className="block overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className={`w-full object-cover transition duration-500 group-hover:scale-105 ${large ? 'h-96 lg:h-full' : 'h-72'}`}
        />
      </Link>
      <div className="flex flex-col p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-emerald-800">
          <span>{blog.category}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-300" />
          <span>{formatDate(blog.createdAt)}</span>
        </div>
        <h2
          className={`mt-4 font-semibold tracking-tight text-zinc-950 ${large ? 'text-4xl' : 'text-2xl'}`}
        >
          <Link to={pathTo.blog(blog.slug)}>{blog.title}</Link>
        </h2>
        <p className="mt-4 leading-7 text-zinc-600">{blog.excerpt}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {blog.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          to={pathTo.blog(blog.slug)}
          className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-950 underline decoration-emerald-700 decoration-2 underline-offset-4"
        >
          Read editorial
        </Link>
      </div>
    </article>
  )
}

export default BlogCard
