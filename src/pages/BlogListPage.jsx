import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import BlogCard from '../components/blog/BlogCard.jsx'
import { useBlogs } from '../hooks/useBlogs.js'
import { BLOG_CATEGORIES } from '../utils/constants.js'

function BlogListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || 'all'
  const search = searchParams.get('search') || ''
  const params = useMemo(
    () => ({
      category,
      search,
    }),
    [category, search],
  )
  const { blogs, isLoading, error } = useBlogs({ params })

  function updateFilter(name, value) {
    const nextParams = new URLSearchParams(searchParams)

    if (!value || value === 'all') {
      nextParams.delete(name)
    } else {
      nextParams.set(name, value)
    }

    setSearchParams(nextParams)
  }

  return (
    <div className="space-y-8">
      <section className="border-b border-zinc-200 pb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
          Editorial archive
        </p>
        <h1 className="mt-3 font-serif text-5xl font-semibold italic tracking-tight text-zinc-950">
          Stories in motion
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
          Browse runway analysis, model guides, beauty notes, and culture essays
          from the Velvet Runway desk.
        </p>
      </section>

      <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:flex-row">
        <input
          className="flex-1 rounded-lg border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-950"
          placeholder="Search editorials"
          value={search}
          onChange={(event) => updateFilter('search', event.target.value)}
        />
        <select
          className="rounded-lg border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-950"
          value={category}
          onChange={(event) => updateFilter('category', event.target.value)}
        >
          <option value="all">All categories</option>
          {BLOG_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          Showing demo editorials until MongoDB Atlas is connected. {error}
        </div>
      ) : null}

      {isLoading ? (
        <p className="text-zinc-500">Loading editorials...</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogListPage
