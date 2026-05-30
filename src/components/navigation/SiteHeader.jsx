import { Link } from 'react-router-dom'
import Container from '../common/Container.jsx'
import { useAppContext } from '../../hooks/useAppContext.js'
import { ROUTES } from '../../routes/routePaths.js'

function SiteHeader() {
  const { appName, stack } = useAppContext()

  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-4">
        <Link
          to={ROUTES.home}
          className="text-base font-bold tracking-tight text-zinc-950"
        >
          {appName}
        </Link>
        <nav className="hidden items-center gap-2 text-sm text-zinc-500 sm:flex">
          {stack.slice(0, 3).map((item) => (
            <span key={item} className="rounded-full bg-zinc-100 px-3 py-1">
              {item}
            </span>
          ))}
        </nav>
      </Container>
    </header>
  )
}

export default SiteHeader
