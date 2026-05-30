function Button({
  children,
  variant = 'dark',
  className = '',
  type = 'button',
  ...props
}) {
  const variants = {
    dark: 'bg-zinc-950 text-white hover:bg-emerald-800',
    light: 'bg-white text-zinc-950 ring-1 ring-zinc-200 hover:bg-zinc-100',
    danger: 'bg-rose-700 text-white hover:bg-rose-800',
    ghost: 'bg-transparent text-zinc-700 hover:bg-zinc-100',
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
