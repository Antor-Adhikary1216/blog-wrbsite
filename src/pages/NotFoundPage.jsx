import { Link } from 'react-router-dom'
import { ROUTES } from '../routes/routePaths.js'

function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[55vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">
        Page not found
      </h1>
      <p className="mt-3 text-zinc-600">
        The route you opened does not exist yet.
      </p>
      <Link
        className="mt-8 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        to={ROUTES.home}
      >
        Back home
      </Link>
    </section>
  )
}

export default NotFoundPage
