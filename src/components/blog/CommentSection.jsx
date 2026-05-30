import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../common/Button.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { addComment, deleteComment } from '../../services/blogService.js'
import { formatDate } from '../../utils/formatters.js'
import { ROUTES } from '../../routes/routePaths.js'

function CommentSection({ blog, comments, setComments, isDemo }) {
  const { isAuthenticated, user, isAdmin } = useAuth()
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const data = await addComment(blog.slug, content)
      setComments((currentComments) => [data.comment, ...currentComments])
      setContent('')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(commentId) {
    await deleteComment(commentId)
    setComments((currentComments) =>
      currentComments.filter((comment) => comment._id !== commentId),
    )
  }

  return (
    <section className="mt-14 border-t border-zinc-200 pt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
            Reader notes
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
            Comments
          </h2>
        </div>
        {!isAuthenticated ? (
          <Link
            className="text-sm font-semibold text-zinc-950 underline decoration-emerald-700 decoration-2 underline-offset-4"
            to={ROUTES.signIn}
          >
            Sign in to comment
          </Link>
        ) : null}
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mt-6">
          <textarea
            className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-950"
            disabled={isDemo}
            placeholder={
              isDemo
                ? 'Connect MongoDB Atlas to enable comments.'
                : 'Share a thoughtful note...'
            }
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          {error ? <p className="mt-2 text-sm text-rose-700">{error}</p> : null}
          <Button
            className="mt-4"
            disabled={isSubmitting || isDemo || content.trim().length < 2}
            type="submit"
          >
            {isSubmitting ? 'Publishing...' : 'Publish comment'}
          </Button>
        </form>
      ) : null}

      <div className="mt-8 space-y-4">
        {comments.length === 0 ? (
          <p className="rounded-lg bg-zinc-50 p-5 text-zinc-600">
            No comments yet. Be the first to start the conversation.
          </p>
        ) : (
          comments.map((comment) => (
            <article
              key={comment._id}
              className="rounded-lg border border-zinc-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-zinc-950">
                    {comment.author?.name || 'Reader'}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
                {(isAdmin || comment.author?._id === user?._id) && !isDemo ? (
                  <button
                    className="text-sm font-semibold text-rose-700"
                    type="button"
                    onClick={() => handleDelete(comment._id)}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
              <p className="mt-4 leading-7 text-zinc-700">{comment.content}</p>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default CommentSection
