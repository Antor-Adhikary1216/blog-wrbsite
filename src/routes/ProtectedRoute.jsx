import { Navigate, Outlet, useLocation } from 'react-router-dom'
import LoadingScreen from '../components/common/LoadingScreen.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { ROUTES } from './routePaths.js'

function ProtectedRoute() {
  const { isAuthReady, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthReady) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.signIn} state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
