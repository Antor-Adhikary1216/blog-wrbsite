import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  clearStoredToken,
  getStoredToken,
  setStoredToken,
} from '../services/apiClient.js'
import {
  getCurrentUser,
  logoutUser,
  signInUser,
  signUpUser,
} from '../services/authService.js'
import { AuthContext } from './authContext.js'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => getStoredToken())
  const [isAuthReady, setIsAuthReady] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function hydrateUser() {
      if (!token) {
        setIsAuthReady(true)
        return
      }

      try {
        const data = await getCurrentUser()

        if (isMounted) {
          setUser(data.user)
        }
      } catch {
        clearStoredToken()

        if (isMounted) {
          setToken(null)
          setUser(null)
        }
      } finally {
        if (isMounted) {
          setIsAuthReady(true)
        }
      }
    }

    hydrateUser()

    return () => {
      isMounted = false
    }
  }, [token])

  const handleAuthSuccess = useCallback((data) => {
    setStoredToken(data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }, [])

  const signIn = useCallback(
    async (credentials) => handleAuthSuccess(await signInUser(credentials)),
    [handleAuthSuccess],
  )

  const signUp = useCallback(
    async (payload) => handleAuthSuccess(await signUpUser(payload)),
    [handleAuthSuccess],
  )

  const logout = useCallback(async () => {
    try {
      if (getStoredToken()) {
        await logoutUser()
      }
    } finally {
      clearStoredToken()
      setToken(null)
      setUser(null)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthReady,
      isAuthenticated: Boolean(user && token),
      isAdmin: user?.role === 'admin',
      signIn,
      signUp,
      logout,
    }),
    [isAuthReady, logout, signIn, signUp, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
