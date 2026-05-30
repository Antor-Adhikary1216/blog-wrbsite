import AuthProvider from './AuthProvider.jsx'
import ToastProvider from './ToastProvider.jsx'

function AppProvider({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  )
}

export default AppProvider
