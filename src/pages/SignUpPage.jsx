import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import FormField from '../components/common/FormField.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { ROUTES } from '../routes/routePaths.js'

function SignUpPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  function updateField(name, value) {
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)

    try {
      const { name, email, password } = form
      const user = await signUp({ name, email, password })
      navigate(user.role === 'admin' ? ROUTES.adminBlogs : ROUTES.blogs)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-2xl rounded-lg border border-zinc-200 bg-white p-8 shadow-xl sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
        Join the salon
      </p>
      <h1 className="mt-3 text-5xl font-semibold italic tracking-tight text-zinc-950">
        Create account
      </h1>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <FormField label="Name">
          <input
            className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-950"
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </FormField>
        <FormField label="Email">
          <input
            className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-950"
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        </FormField>
        <FormField label="Password">
          <input
            className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-950"
            minLength={8}
            required
            type="password"
            value={form.password}
            onChange={(event) => updateField('password', event.target.value)}
          />
        </FormField>
        <FormField label="Confirm password">
          <input
            className="w-full rounded-lg border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-950"
            minLength={8}
            required
            type="password"
            value={form.confirmPassword}
            onChange={(event) =>
              updateField('confirmPassword', event.target.value)
            }
          />
        </FormField>
        {error ? <p className="text-sm text-rose-700">{error}</p> : null}
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Creating...' : 'Create account'}
        </Button>
      </form>
      <p className="mt-6 text-sm text-zinc-600">
        Already have an account?{' '}
        <Link className="font-semibold text-zinc-950" to={ROUTES.signIn}>
          Sign in
        </Link>
      </p>
    </section>
  )
}

export default SignUpPage
