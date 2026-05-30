import { apiRequest } from './apiClient.js'

export function getHealth() {
  return apiRequest('/api/health')
}

export function pingDatabase() {
  return apiRequest('/api/db/ping', { allowError: true })
}
