import AuthProvider from './AuthProvider.jsx'

function AppProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}

export default AppProvider
