import { Navigate, Outlet } from 'react-router-dom'
import LoadingScreen from '../components/common/LoadingScreen.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { ROUTES } from './routePaths.js'

function AdminRoute() {
  const { isAuthReady, isAuthenticated, isAdmin } = useAuth()

  if (!isAuthReady) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.signIn} replace />
  }

  if (!isAdmin) {
    return <Navigate to={ROUTES.blogs} replace />
  }

  return <Outlet />
}

export default AdminRoute
