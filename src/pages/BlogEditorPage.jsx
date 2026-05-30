import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlogForm from '../components/blog/BlogForm.jsx'
import LoadingScreen from '../components/common/LoadingScreen.jsx'
import { useBlogs } from '../hooks/useBlogs.js'
import { createBlog, updateBlog } from '../services/blogService.js'
import { ROUTES } from '../routes/routePaths.js'

function BlogEditorPage() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { blogs, isLoading } = useBlogs({ admin: true, fallback: false })

  const currentBlog = useMemo(
    () => blogs.find((blog) => blog._id === id),
    [blogs, id],
  )

  async function handleSubmit(payload) {
    setError('')
    setIsSubmitting(true)

    try {
      if (isEditing) {
        await updateBlog(id, payload)
      } else {
        await createBlog(payload)
      }

      navigate(ROUTES.adminBlogs)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isEditing && isLoading) {
    return <LoadingScreen />
  }

  return (
    <section className="mx-auto max-w-4xl rounded-lg border border-zinc-200 bg-white p-6 shadow-xl sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
        Editorial desk
      </p>
      <h1 className="mt-3 font-serif text-5xl font-semibold italic tracking-tight text-zinc-950">
        {isEditing ? 'Edit blog' : 'New blog'}
      </h1>
      {error ? (
        <div className="my-6 rounded-lg border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-800">
          {error}
        </div>
      ) : null}
      <div className="mt-8">
        <BlogForm
          initialBlog={currentBlog}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  )
}

export default BlogEditorPage
