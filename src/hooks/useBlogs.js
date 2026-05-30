import { useEffect, useMemo, useState } from 'react'
import { fallbackBlogs } from '../data/fallbackBlogs.js'
import { getAdminBlogs, getBlogs } from '../services/blogService.js'

function matchesSearch(blog, searchTerm) {
  if (!searchTerm) {
    return true
  }

  const searchableText = [
    blog.title,
    blog.excerpt,
    blog.content,
    blog.category,
    blog.author?.name,
    ...(blog.tags || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return searchableText.includes(searchTerm.toLowerCase())
}

function filterFallbackBlogs(params) {
  const category = params.category || 'all'
  const search = params.search?.trim() || ''

  return fallbackBlogs.filter((blog) => {
    const matchesCategory = category === 'all' || blog.category === category
    return matchesCategory && matchesSearch(blog, search)
  })
}

export function useBlogs({ admin = false, params = {}, fallback = true } = {}) {
  const paramsKey = useMemo(() => JSON.stringify(params), [params])
  const stableParams = useMemo(() => JSON.parse(paramsKey), [paramsKey])
  const fallbackList = useMemo(
    () => (fallback && !admin ? filterFallbackBlogs(stableParams) : []),
    [admin, fallback, stableParams],
  )
  const shouldShowFallbackImmediately = fallbackList.length > 0

  const [blogs, setBlogs] = useState(() => fallbackList)
  const [isLoading, setIsLoading] = useState(
    () => !shouldShowFallbackImmediately,
  )
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadBlogs() {
      if (shouldShowFallbackImmediately) {
        setBlogs(fallbackList)
        setIsLoading(false)
      } else {
        setIsLoading(true)
      }

      setError(null)

      try {
        const data = admin ? await getAdminBlogs() : await getBlogs(stableParams)
        const nextBlogs = data.blogs || []

        if (isMounted) {
          setBlogs(nextBlogs.length > 0 ? nextBlogs : fallbackList)
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message)
          setBlogs(fallbackList)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadBlogs()

    return () => {
      isMounted = false
    }
  }, [admin, fallbackList, shouldShowFallbackImmediately, stableParams])

  return { blogs, isLoading, error, setBlogs }
}
