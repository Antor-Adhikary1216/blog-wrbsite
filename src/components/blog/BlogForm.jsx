import { useMemo, useState } from 'react'
import { BLOG_CATEGORIES } from '../../utils/constants.js'
import Button from '../common/Button.jsx'
import FormField from '../common/FormField.jsx'

const emptyForm = {
  title: '',
  excerpt: '',
  content: '',
  coverImage: '',
  category: BLOG_CATEGORIES[0],
  tags: '',
  status: 'draft',
  featured: false,
}

function BlogForm({ initialBlog, onSubmit, isSubmitting }) {
  const initialValues = useMemo(
    () =>
      initialBlog
        ? {
            title: initialBlog.title || '',
            excerpt: initialBlog.excerpt || '',
            content: initialBlog.content || '',
            coverImage: initialBlog.coverImage || '',
            category: initialBlog.category || BLOG_CATEGORIES[0],
            tags: initialBlog.tags?.join(', ') || '',
            status: initialBlog.status || 'draft',
            featured: Boolean(initialBlog.featured),
          }
        : emptyForm,
    [initialBlog],
  )
  const [form, setForm] = useState(initialValues)

  function updateField(name, value) {
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({
      ...form,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Title">
        <input
          className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-950"
          required
          value={form.title}
          onChange={(event) => updateField('title', event.target.value)}
        />
      </FormField>
      <FormField label="Excerpt">
        <textarea
          className="min-h-24 w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-950"
          required
          value={form.excerpt}
          onChange={(event) => updateField('excerpt', event.target.value)}
        />
      </FormField>
      <FormField label="Content">
        <textarea
          className="min-h-64 w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-950"
          required
          value={form.content}
          onChange={(event) => updateField('content', event.target.value)}
        />
      </FormField>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Cover image URL">
          <input
            className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-950"
            required
            type="url"
            value={form.coverImage}
            onChange={(event) => updateField('coverImage', event.target.value)}
          />
        </FormField>
        <FormField label="Category">
          <select
            className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-950"
            value={form.category}
            onChange={(event) => updateField('category', event.target.value)}
          >
            {BLOG_CATEGORIES.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </FormField>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Tags, comma separated">
          <input
            className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-950"
            value={form.tags}
            onChange={(event) => updateField('tags', event.target.value)}
          />
        </FormField>
        <FormField label="Status">
          <select
            className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-950"
            value={form.status}
            onChange={(event) => updateField('status', event.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </FormField>
      </div>
      <label className="flex items-center gap-3 text-sm font-semibold text-zinc-800">
        <input
          checked={form.featured}
          className="h-4 w-4"
          type="checkbox"
          onChange={(event) => updateField('featured', event.target.checked)}
        />
        Feature this editorial on the homepage
      </label>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Saving...' : 'Save blog'}
      </Button>
    </form>
  )
}

export default BlogForm
