import { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import FormField from '../components/common/FormField.jsx'
import PasswordInput from '../components/common/PasswordInput.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useToast } from '../hooks/useToast.js'
import { ROUTES } from '../routes/routePaths.js'
import { sendAuthSuccessNotification } from '../services/notificationService.js'

function SignUpPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false)
  const { signInWithGoogle, signUp } = useAuth()
  const { showToast } = useToast()
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
      await signUp({ name, email, password })
      const notification = await sendAuthSuccessNotification('signup')

      showToast({
        title: 'Account created',
        message: notification.sent
          ? 'Welcome to Blog India. A confirmation email has been sent to you.'
          : 'Welcome to Blog India.',
      })
      navigate(ROUTES.home, { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleGoogleSignUp() {
    setError('')
    setIsGoogleSubmitting(true)

    try {
      await signInWithGoogle()
      const notification = await sendAuthSuccessNotification('signup')

      showToast({
        title: 'Account ready',
        message: notification.sent
          ? 'Welcome to Blog India. A confirmation email has been sent to you.'
          : 'Welcome to Blog India.',
      })
      navigate(ROUTES.home, { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsGoogleSubmitting(false)
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
          <PasswordInput
            minLength={8}
            required
            value={form.password}
            onChange={(event) => updateField('password', event.target.value)}
          />
        </FormField>
        <FormField label="Confirm password">
          <PasswordInput
            minLength={8}
            required
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
      <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
        <span className="h-px flex-1 bg-zinc-200" />
        or
        <span className="h-px flex-1 bg-zinc-200" />
      </div>
      <Button
        className="w-full gap-3"
        disabled={isGoogleSubmitting}
        variant="light"
        onClick={handleGoogleSignUp}
      >
        <FaGoogle aria-hidden="true" />
        {isGoogleSubmitting ? 'Connecting...' : 'Continue with Google'}
      </Button>
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
