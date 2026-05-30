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

function SignInPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false)
  const { signIn, signInWithGoogle } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  function updateField(name, value) {
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await signIn(form)
      const notification = await sendAuthSuccessNotification('signin')

      showToast({
        title: 'Login successful',
        message: notification.sent
          ? 'Welcome back. A confirmation email has been sent to you.'
          : 'Welcome back to Blog India.',
      })
      navigate(ROUTES.home, { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleGoogleSignIn() {
    setError('')
    setIsGoogleSubmitting(true)

    try {
      await signInWithGoogle()
      const notification = await sendAuthSuccessNotification('signin')

      showToast({
        title: 'Login successful',
        message: notification.sent
          ? 'Welcome back. A confirmation email has been sent to you.'
          : 'Welcome back to Blog India.',
      })
      navigate(ROUTES.home, { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsGoogleSubmitting(false)
    }
  }

  return (
    <section className="mx-auto grid max-w-5xl overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xl lg:grid-cols-2">
      <div className="hidden bg-zinc-950 lg:block">
        <img
          alt="Luxury runway detail"
          className="h-full w-full object-cover opacity-80"
          src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=85"
        />
      </div>
      <div className="p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
          Welcome back
        </p>
        <h1 className="mt-3 text-5xl font-semibold italic tracking-tight text-zinc-950">
          Sign in
        </h1>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
              required
              value={form.password}
              onChange={(event) => updateField('password', event.target.value)}
            />
          </FormField>
          {error ? <p className="text-sm text-rose-700">{error}</p> : null}
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Signing in...' : 'Sign in'}
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
          onClick={handleGoogleSignIn}
        >
          <FaGoogle aria-hidden="true" />
          {isGoogleSubmitting ? 'Connecting...' : 'Continue with Google'}
        </Button>
        <p className="mt-6 text-sm text-zinc-600">
          New here?{' '}
          <Link className="font-semibold text-zinc-950" to={ROUTES.signUp}>
            Create an account
          </Link>
        </p>
      </div>
    </section>
  )
}

export default SignInPage
