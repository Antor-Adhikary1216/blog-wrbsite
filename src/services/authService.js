import { apiRequest } from './apiClient.js'

export function getCurrentUser() {
  return apiRequest('/api/auth/me')
}
