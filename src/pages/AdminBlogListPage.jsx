import { Link } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs.js'
import { deleteBlog } from '../services/blogService.js'
import { ROUTES, pathTo } from '../routes/routePaths.js'
import { formatDate } from '../utils/formatters.js'

function AdminBlogListPage() {
  const { blogs, setBlogs, isLoading, error } = useBlogs({
    admin: true,
    fallback: false,
  })

  async function handleDelete(id) {
    await deleteBlog(id)
    setBlogs((currentBlogs) => currentBlogs.filter((blog) => blog._id !== id))
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
            Admin studio
          </p>
          <h1 className="mt-3 text-5xl font-semibold italic tracking-tight text-zinc-950">
            Manage blogs
          </h1>
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          to={ROUTES.adminNewBlog}
        >
          New editorial
        </Link>
      </div>

      {error ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {error}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
        {isLoading ? (
          <p className="p-6 text-zinc-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="p-6 text-zinc-500">No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div
              className="grid gap-4 border-b border-zinc-100 p-5 last:border-b-0 lg:grid-cols-[1fr_auto]"
              key={blog._id}
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-zinc-500">
                  <span>{blog.status}</span>
                  <span>{blog.category}</span>
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <h2 className="mt-2 text-xl font-semibold text-zinc-950">
                  {blog.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-600">{blog.excerpt}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:border-zinc-950"
                  to={pathTo.editBlog(blog._id)}
                >
                  Edit
                </Link>
                <button
                  className="rounded-full bg-rose-700 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-800"
                  type="button"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default AdminBlogListPage
