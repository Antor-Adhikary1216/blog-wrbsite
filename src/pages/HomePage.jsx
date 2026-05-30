import { Link } from 'react-router-dom'
import BlogCard from '../components/blog/BlogCard.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import { useBlogs } from '../hooks/useBlogs.js'
import { ROUTES } from '../routes/routePaths.js'

function HomePage() {
  const { blogs, isLoading, error } = useBlogs()
  const featuredBlog = blogs.find((blog) => blog.featured) || blogs[0]
  const latestBlogs = blogs.filter((blog) => blog._id !== featuredBlog?._id)

  return (
    <div className="space-y-16">
      <HeroSection />

      {error ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          Showing demo editorials until MongoDB Atlas is connected. {error}
        </div>
      ) : null}

      {isLoading ? (
        <p className="text-zinc-500">Loading editorials...</p>
      ) : (
        <>
          {featuredBlog ? <BlogCard blog={featuredBlog} large /> : null}

          <section>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
                  Latest
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
                  New season notes
                </h2>
              </div>
              <Link
                className="text-sm font-semibold text-zinc-950 underline decoration-emerald-700 decoration-2 underline-offset-4"
                to={ROUTES.blogs}
              >
                View all
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {latestBlogs.slice(0, 2).map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default HomePage
