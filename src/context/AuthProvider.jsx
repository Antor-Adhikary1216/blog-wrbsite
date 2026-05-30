import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  getIdTokenResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import {
  auth,
  googleProvider,
  isFirebaseConfigured,
} from '../config/firebase.js'
import { getCurrentUser } from '../services/authService.js'
import { AuthContext } from './authContext.js'

const FIREBASE_SETUP_MESSAGE =
  'Firebase is not configured. Add the VITE_FIREBASE_* environment variables and redeploy.'

function getFirebaseErrorMessage(error) {
  const messages = {
    'auth/email-already-in-use': 'Email is already in use.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/invalid-email': 'Please use a valid email address.',
    'auth/popup-closed-by-user': 'Google sign-in was closed before finishing.',
    'auth/weak-password': 'Password should be at least 8 characters.',
  }

  return messages[error.code] || error.message || 'Authentication failed.'
}

function clearAuthState(setUser, setToken, setClaims) {
  setUser(null)
  setToken(null)
  setClaims({})
}

function AuthProvider({ children }) {
  const isFirebaseAuthAvailable = isFirebaseConfigured && Boolean(auth)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [claims, setClaims] = useState({})
  const [isAuthReady, setIsAuthReady] = useState(() => !isFirebaseAuthAvailable)

  const loadCurrentUser = useCallback(async (firebaseUser, forceRefresh = false) => {
    if (!firebaseUser || !auth) {
      return { user: null, token: null, claims: {} }
    }

    const tokenResult = await getIdTokenResult(firebaseUser, forceRefresh)
    const data = await getCurrentUser()

    return {
      user: data.user,
      token: tokenResult.token,
      claims: tokenResult.claims || {},
    }
  }, [])

  const syncCurrentUser = useCallback(
    async (firebaseUser, forceRefresh = false) => {
      const nextAuthState = await loadCurrentUser(firebaseUser, forceRefresh)

      setUser(nextAuthState.user)
      setToken(nextAuthState.token)
      setClaims(nextAuthState.claims)

      return nextAuthState.user
    },
    [loadCurrentUser],
  )

  useEffect(() => {
    if (!isFirebaseAuthAvailable) {
      return undefined
    }

    let isMounted = true

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        const nextAuthState = await loadCurrentUser(firebaseUser)

        if (!isMounted) {
          return
        }

        setUser(nextAuthState.user)
        setToken(nextAuthState.token)
        setClaims(nextAuthState.claims)
      } catch {
        if (isMounted) {
          clearAuthState(setUser, setToken, setClaims)
        }
      } finally {
        if (isMounted) {
          setIsAuthReady(true)
        }
      }
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [isFirebaseAuthAvailable, loadCurrentUser])

  const signIn = useCallback(
    async ({ email, password }) => {
      if (!auth) {
        throw new Error(FIREBASE_SETUP_MESSAGE)
      }

      try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        return syncCurrentUser(result.user, true)
      } catch (error) {
        throw new Error(getFirebaseErrorMessage(error), { cause: error })
      }
    },
    [syncCurrentUser],
  )

  const signUp = useCallback(
    async ({ name, email, password }) => {
      if (!auth) {
        throw new Error(FIREBASE_SETUP_MESSAGE)
      }

      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        )

        await updateProfile(result.user, { displayName: name })
        return syncCurrentUser(result.user, true)
      } catch (error) {
        throw new Error(getFirebaseErrorMessage(error), { cause: error })
      }
    },
    [syncCurrentUser],
  )

  const signInWithGoogle = useCallback(async () => {
    if (!auth || !googleProvider) {
      throw new Error(FIREBASE_SETUP_MESSAGE)
    }

    try {
      const result = await signInWithPopup(auth, googleProvider)
      return syncCurrentUser(result.user, true)
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error), { cause: error })
    }
  }, [syncCurrentUser])

  const logout = useCallback(async () => {
    if (auth) {
      await signOut(auth)
    }

    clearAuthState(setUser, setToken, setClaims)
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthReady,
      isAuthenticated: Boolean(user && token),
      isAdmin: claims.admin === true,
      signIn,
      signUp,
      signInWithGoogle,
      logout,
    }),
    [claims.admin, isAuthReady, logout, signIn, signInWithGoogle, signUp, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
