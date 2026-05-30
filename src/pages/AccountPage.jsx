import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { ROUTES } from '../routes/routePaths.js'

function AccountPage() {
  const { user, isAdmin } = useAuth()

  return (
    <section className="mx-auto max-w-3xl rounded-lg border border-zinc-200 bg-white p-8 shadow-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
        Private account
      </p>
      <h1 className="mt-3 text-5xl font-semibold italic tracking-tight text-zinc-950">
        {user?.name}
      </h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-zinc-50 p-5">
          <p className="text-sm font-semibold text-zinc-950">Email</p>
          <p className="mt-2 text-zinc-600">{user?.email}</p>
        </div>
        <div className="rounded-lg bg-zinc-50 p-5">
          <p className="text-sm font-semibold text-zinc-950">Role</p>
          <p className="mt-2 capitalize text-zinc-600">{user?.role}</p>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 ring-1 ring-zinc-200 transition hover:bg-zinc-100"
          to={ROUTES.blogs}
        >
          Read editorials
        </Link>
        {isAdmin ? (
          <Link
            className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            to={ROUTES.adminBlogs}
          >
            Manage blogs
          </Link>
        ) : null}
      </div>
    </section>
  )
}

export default AccountPage
