import { useEffect, useState } from 'react'
import { fallbackBlogs } from '../data/fallbackBlogs.js'
import { getBlog } from '../services/blogService.js'

export function useBlogDetail(slug) {
  const [blog, setBlog] = useState(null)
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadBlog() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getBlog(slug)

        if (isMounted) {
          setBlog(data.blog)
          setComments(data.comments || [])
        }
      } catch (requestError) {
        const fallbackBlog = fallbackBlogs.find((item) => item.slug === slug)

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
  }, [slug])

  return { blog, comments, setComments, isLoading, error }
}
