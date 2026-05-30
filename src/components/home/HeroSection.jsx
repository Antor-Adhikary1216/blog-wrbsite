import { useAppContext } from '../../hooks/useAppContext.js'

function HeroSection() {
  const { appName, stack } = useAppContext()

  return (
    <section className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
          Full-stack starter
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
          {appName} with a clean React and Express architecture.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
          A maintainable foundation with separated pages, components, routes,
          hooks, services, context, layouts, utilities, and server modules.
        </p>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-zinc-950">Stack</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              key={item}
              className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 ring-1 ring-emerald-100"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
