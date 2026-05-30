function SectionCard({ children, className = '' }) {
  return (
    <section
      className={`rounded-lg border border-zinc-200 bg-white p-6 shadow-sm ${className}`}
    >
      {children}
    </section>
  )
}

export default SectionCard
