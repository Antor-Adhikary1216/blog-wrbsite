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
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const paramsKey = useMemo(() => JSON.stringify(params), [params])
  const stableParams = useMemo(() => JSON.parse(paramsKey), [paramsKey])

  useEffect(() => {
    let isMounted = true

    async function loadBlogs() {
      setIsLoading(true)
      setError(null)

      try {
        const data = admin ? await getAdminBlogs() : await getBlogs(stableParams)

        if (isMounted) {
          setBlogs(data.blogs || [])
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message)
          setBlogs(fallback && !admin ? filterFallbackBlogs(stableParams) : [])
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
  }, [admin, fallback, stableParams])

  return { blogs, isLoading, error, setBlogs }
}
