import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from '../common/Container.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { BRAND_NAME } from '../../utils/constants.js'
import { PUBLIC_NAV_ITEMS, ROUTES } from '../../routes/routePaths.js'

function getNavLinkClass({ isActive }) {
  return `transition hover:text-zinc-950 ${
    isActive ? 'text-zinc-950' : 'text-zinc-500'
  }`
}

function DesktopNav({ isAdmin }) {
  return (
    <nav className="hidden items-center gap-7 text-sm font-semibold uppercase tracking-[0.18em] md:flex">
      {PUBLIC_NAV_ITEMS.map((item) => (
        <NavLink className={getNavLinkClass} end={item.to === ROUTES.home} key={item.to} to={item.to}>
          {item.label}
        </NavLink>
      ))}
      {isAdmin ? (
        <NavLink className={getNavLinkClass} to={ROUTES.adminBlogs}>
          Admin
        </NavLink>
      ) : null}
    </nav>
  )
}

function MobileNav({ isAdmin, isAuthenticated, logout, onNavigate }) {
  const authLinks = isAuthenticated
    ? [
        { label: 'Account', to: ROUTES.account },
        ...(isAdmin ? [{ label: 'Admin Studio', to: ROUTES.adminBlogs }] : []),
      ]
    : [
        { label: 'Sign in', to: ROUTES.signIn },
        { label: 'Join', to: ROUTES.signUp },
      ]

  return (
    <div className="border-t border-zinc-200 bg-white md:hidden">
      <Container className="py-4">
        <nav className="grid gap-2">
          {[...PUBLIC_NAV_ITEMS, ...authLinks].map((item) => (
            <NavLink
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition ${
                  isActive
                    ? 'bg-zinc-950 text-white'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950'
                }`
              }
              end={item.to === ROUTES.home}
              key={item.to}
              onClick={onNavigate}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <button
              className="rounded-lg px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.18em] text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
              type="button"
              onClick={() => {
                logout()
                onNavigate()
              }}
            >
              Logout
            </button>
          ) : null}
        </nav>
      </Container>
    </div>
  )
}

function SiteHeader() {
  const { isAuthenticated, isAdmin, logout, user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <Container className="flex min-h-20 items-center justify-between gap-4">
        <Link
          to={ROUTES.home}
          className="shrink-0 font-serif text-3xl font-semibold italic tracking-tight text-zinc-950"
        >
          {BRAND_NAME}
        </Link>

        <DesktopNav isAdmin={isAdmin} />

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <span className="max-w-32 truncate text-sm text-zinc-500">
                {user?.name}
              </span>
              <NavLink
                className={({ isActive }) =>
                  `text-sm font-semibold transition ${
                    isActive ? 'text-zinc-950' : 'text-zinc-600'
                  } hover:text-zinc-950`
                }
                to={ROUTES.account}
              >
                Account
              </NavLink>
              <button
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950"
                type="button"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  `text-sm font-semibold transition ${
                    isActive ? 'text-zinc-950' : 'text-zinc-600'
                  } hover:text-zinc-950`
                }
                to={ROUTES.signIn}
              >
                Sign in
              </NavLink>
              <Link
                className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                to={ROUTES.signUp}
              >
                Join
              </Link>
            </>
          )}
        </div>

        <button
          aria-expanded={isMenuOpen}
          className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700 md:hidden"
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </Container>

      {isMenuOpen ? (
        <MobileNav
          isAdmin={isAdmin}
          isAuthenticated={isAuthenticated}
          logout={logout}
          onNavigate={() => setIsMenuOpen(false)}
        />
      ) : null}
    </header>
  )
}

export default SiteHeader
