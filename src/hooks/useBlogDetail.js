import { useEffect, useState } from 'react'
import { fallbackBlogs } from '../data/fallbackBlogs.js'
import { getBlog } from '../services/blogService.js'

export function useBlogDetail(slug) {
  const fallbackBlog = fallbackBlogs.find((item) => item.slug === slug)
  const [blog, setBlog] = useState(() => fallbackBlog || null)
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(() => !fallbackBlog)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadBlog() {
      if (fallbackBlog) {
        setBlog(fallbackBlog)
        setComments([])
        setIsLoading(false)
      } else {
        setIsLoading(true)
      }

      setError(null)

      try {
        const data = await getBlog(slug)

        if (isMounted) {
          setBlog(data.blog)
          setComments(data.comments || [])
        }
      } catch (requestError) {
        if (isMounted) {
          setBlog(fallbackBlog || null)
          setComments([])
          setError(requestError.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadBlog()

    return () => {
      isMounted = false
    }
  }, [fallbackBlog, slug])

  return { blog, comments, setComments, isLoading, error }
}
