import { useEffect, useState } from 'react'
import { getHealth, pingDatabase } from '../services/healthService.js'

const initialState = {
  health: null,
  database: null,
  isLoading: true,
  error: null,
}

export function useApiHealth() {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let isMounted = true

    async function loadStatus() {
      try {
        const [health, database] = await Promise.all([
          getHealth(),
          pingDatabase(),
        ])

        if (isMounted) {
          setState({ health, database, isLoading: false, error: null })
        }
      } catch (error) {
        if (isMounted) {
          setState({
            ...initialState,
            isLoading: false,
            error: error.message,
          })
        }
      }
    }

    loadStatus()

    return () => {
      isMounted = false
    }
  }, [])

  return state
}
