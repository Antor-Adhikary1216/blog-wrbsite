import { apiRequest } from './apiClient.js'

export function getBlogs(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value),
  ).toString()

  return apiRequest(`/api/blogs${query ? `?${query}` : ''}`, {
    auth: false,
  })
}

export function getAdminBlogs() {
  return apiRequest('/api/blogs/admin')
}

export function getBlog(slug) {
  return apiRequest(`/api/blogs/${slug}`, {
    auth: false,
  })
}

export function createBlog(payload) {
  return apiRequest('/api/blogs', {
    method: 'POST',
    body: payload,
  })
}

export function updateBlog(id, payload) {
  return apiRequest(`/api/blogs/${id}`, {
    method: 'PUT',
    body: payload,
  })
}

export function deleteBlog(id) {
  return apiRequest(`/api/blogs/${id}`, {
    method: 'DELETE',
  })
}

export function addComment(slug, content) {
  return apiRequest(`/api/blogs/${slug}/comments`, {
    method: 'POST',
    body: { content },
  })
}

export function deleteComment(id) {
  return apiRequest(`/api/comments/${id}`, {
    method: 'DELETE',
  })
}
