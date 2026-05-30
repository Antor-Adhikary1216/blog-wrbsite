import { auth as firebaseAuth } from '../config/firebase.js'

const API_BASE_URL = import.meta.env.VITE_API_URL || ''

export async function apiRequest(path, options = {}) {
  const {
    allowError = false,
    body,
    headers = {},
    auth = true,
    ...fetchOptions
  } = options

  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  }

  const token = auth && firebaseAuth?.currentUser
    ? await firebaseAuth.currentUser.getIdToken()
    : null

  if (token) {
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
