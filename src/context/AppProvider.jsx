import { useMemo } from 'react'
import { APP_NAME, STACK_ITEMS } from '../utils/constants.js'
import { AppContext } from './appContext.js'

function AppProvider({ children }) {
  const value = useMemo(
    () => ({
      appName: APP_NAME,
      stack: STACK_ITEMS,
    }),
    [],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
