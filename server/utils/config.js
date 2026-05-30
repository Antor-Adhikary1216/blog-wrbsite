const PLACEHOLDER_MARKERS = ['your-', 'your_', '<', '>', 'placeholder']

export function hasUsableSecret(value) {
  if (!value) {
    return false
  }

  const normalized = value.toLowerCase()
  return !PLACEHOLDER_MARKERS.some((marker) => normalized.includes(marker))
}
