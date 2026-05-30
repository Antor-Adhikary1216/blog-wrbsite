import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import BrandLogo from '../common/BrandLogo.jsx'
import Container from '../common/Container.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { PUBLIC_NAV_ITEMS, ROUTES } from '../../routes/routePaths.js'

function getDesktopNavLinkClass({ isActive }) {
  return `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-zinc-950 text-white shadow-sm'
      : 'text-zinc-500 hover:bg-white hover:text-zinc-950 hover:shadow-sm'
  }`
}

function DesktopNav({ isAdmin }) {
  return (
    <nav className="hidden items-center rounded-full border border-zinc-200/80 bg-zinc-100/80 p-1 shadow-inner shadow-zinc-200/60 backdrop-blur md:flex">
      {PUBLIC_NAV_ITEMS.map((item) => (
        <NavLink
          className={getDesktopNavLinkClass}
          end={item.to === ROUTES.home}
          key={item.to}
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
      {isAdmin ? (
        <NavLink className={getDesktopNavLinkClass} to={ROUTES.adminBlogs}>
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
    <div className="md:hidden">
      <Container className="pb-4">
        <nav className="rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl shadow-zinc-950/10">
          {[...PUBLIC_NAV_ITEMS, ...authLinks].map((item) => (
            <NavLink
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
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
              <span aria-hidden="true" className="text-xs opacity-50">
                /
              </span>
            </NavLink>
          ))}
          {isAuthenticated ? (
            <button
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
              type="button"
              onClick={() => {
                logout()
                onNavigate()
              }}
            >
              Logout
              <span aria-hidden="true" className="text-xs opacity-50">
                /
              </span>
            </button>
          ) : null}
        </nav>
      </Container>
    </div>
  )
}

function MenuIcon({ isOpen }) {
  return (
    <span className="relative h-4 w-4" aria-hidden="true">
      <span
        className={`absolute left-0 top-1 h-0.5 w-4 rounded-full bg-current transition ${
          isOpen ? 'translate-y-1 rotate-45' : ''
        }`}
      />
      <span
        className={`absolute bottom-1 left-0 h-0.5 w-4 rounded-full bg-current transition ${
          isOpen ? '-translate-y-1 -rotate-45' : ''
        }`}
      />
    </span>
  )
}

function SiteHeader() {
  const { isAuthenticated, isAdmin, logout, user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/75 backdrop-blur-xl">
      <Container className="flex min-h-20 items-center justify-between gap-4">
        <Link
          to={ROUTES.home}
          className="group shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-4"
        >
          <BrandLogo
            className="transition group-hover:scale-[1.02]"
            size="md"
          />
        </Link>

        <DesktopNav isAdmin={isAdmin} />

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                className="flex max-w-44 items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-950 hover:text-zinc-950"
                to={ROUTES.account}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold uppercase text-emerald-900">
                  {user?.name?.charAt(0) || 'U'}
                </span>
                <span className="truncate">{user?.name || 'Account'}</span>
              </Link>
              <button
                className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950"
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
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-950'
                      : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950'
                  }`
                }
                to={ROUTES.signIn}
              >
                Sign in
              </NavLink>
              <Link
                className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-zinc-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-800"
                to={ROUTES.signUp}
              >
                Join
              </Link>
            </>
          )}
        </div>

        <button
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-950 hover:text-zinc-950 md:hidden"
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <MenuIcon isOpen={isMenuOpen} />
          Menu
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
