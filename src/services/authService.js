import { apiRequest } from './apiClient.js'

export function signUpUser(payload) {
  return apiRequest('/api/auth/signup', {
    method: 'POST',
    body: payload,
    auth: false,
  })
}

export function signInUser(payload) {
  return apiRequest('/api/auth/signin', {
    method: 'POST',
    body: payload,
    auth: false,
  })
}

export function getCurrentUser() {
  return apiRequest('/api/auth/me')
}

export function logoutUser() {
  return apiRequest('/api/auth/logout', {
    method: 'POST',
  })
}
