const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}

export async function apiRequest(path, options = {}) {
  const { allowError = false, ...fetchOptions } = options

  const response = await fetch(path, {
    headers: DEFAULT_HEADERS,
    ...fetchOptions,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok && !allowError) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}
