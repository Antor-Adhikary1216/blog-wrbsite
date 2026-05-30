const API_BASE_URL = import.meta.env.VITE_API_URL || ''
const TOKEN_KEY = 'model_blog_token'

export async function apiRequest(path, options = {}) {
  const {
    allowError = false,
    body,
    headers = {},
    auth = true,
    ...fetchOptions
  } = options

  const token = getStoredToken()
  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  }

  if (auth && token) {
    requestHeaders.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: requestHeaders,
    body: body && typeof body !== 'string' ? JSON.stringify(body) : body,
    ...fetchOptions,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok && !allowError) {
    const error = new Error(data.message || 'Request failed')
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setStoredToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY)
}
