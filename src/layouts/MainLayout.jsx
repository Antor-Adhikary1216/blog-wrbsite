import { Outlet } from 'react-router-dom'
import SiteHeader from '../components/navigation/SiteHeader.jsx'
import SiteFooter from '../components/navigation/SiteFooter.jsx'
import Container from '../components/common/Container.jsx'

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa]">
      <SiteHeader />
      <main className="flex-1">
        <Container className="py-8">
          <Outlet />
        </Container>
      </main>
      <SiteFooter />
    </div>
  )
}

export default MainLayout
