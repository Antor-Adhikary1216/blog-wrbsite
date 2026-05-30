import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

function PasswordInput({ className = '', ...props }) {
  const [isVisible, setIsVisible] = useState(false)
  const Icon = isVisible ? FaEyeSlash : FaEye

  return (
    <div className="relative">
      <input
        className={`w-full rounded-lg border border-zinc-200 px-4 py-3 pr-12 outline-none focus:border-zinc-950 ${className}`}
        type={isVisible ? 'text' : 'password'}
        {...props}
      />
      <button
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
        type="button"
        onClick={() => setIsVisible((current) => !current)}
      >
        <Icon aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  )
}

export default PasswordInput
