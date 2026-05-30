import { Outlet } from 'react-router-dom'
import SiteHeader from '../components/navigation/SiteHeader.jsx'
import Container from '../components/common/Container.jsx'

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer className="border-t border-zinc-200 bg-white/80 py-6">
        <Container>
          <p className="text-sm text-zinc-500">
            Built with React, Tailwind CSS, Express, MongoDB Atlas, and
            Anthropic.
          </p>
        </Container>
      </footer>
    </div>
  )
}

export default MainLayout
