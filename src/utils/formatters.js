export function formatTimestamp(value) {
  if (!value) {
    return 'Not checked yet'
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}
