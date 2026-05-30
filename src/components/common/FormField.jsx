function FormField({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-zinc-800">{label}</span>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-2 text-sm text-rose-700">{error}</p> : null}
    </label>
  )
}

export default FormField
