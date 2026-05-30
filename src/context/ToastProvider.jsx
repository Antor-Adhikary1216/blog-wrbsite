import { useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContext } from './toastContext.js'

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((nextToast) => {
    setToast({
      id: Date.now(),
      type: 'success',
      title: '',
      message: '',
      ...nextToast,
    })
  }, [])

  const clearToast = useCallback(() => {
    setToast(null)
  }, [])

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timeoutId = window.setTimeout(clearToast, 4500)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [clearToast, toast])

  const value = useMemo(
    () => ({
      showToast,
      clearToast,
    }),
    [clearToast, showToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <div className="fixed right-4 top-24 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-lg border border-emerald-200 bg-white p-4 shadow-2xl shadow-zinc-950/15">
          <div className="flex items-start gap-3">
            <span className="mt-1 flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600" />
            <div className="min-w-0 flex-1">
              {toast.title ? (
                <p className="font-semibold text-zinc-950">{toast.title}</p>
              ) : null}
              {toast.message ? (
                <p className="mt-1 text-sm leading-6 text-zinc-600">
                  {toast.message}
                </p>
              ) : null}
            </div>
            <button
              aria-label="Close notification"
              className="rounded-full px-2 text-lg leading-none text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-950"
              type="button"
              onClick={clearToast}
            >
              x
            </button>
          </div>
        </div>
      ) : null}
    </ToastContext.Provider>
  )
}

export default ToastProvider
