import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/routePaths.js'
import { BRAND_NAME } from '../../utils/constants.js'

function HeroSection() {
  return (
    <section className="grid min-h-[620px] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 text-white shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-14">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
          India-first editorial blog
        </p>
        <div>
          <h1 className="max-w-2xl text-5xl italic tracking-tight sm:text-6xl lg:text-7xl">
            {BRAND_NAME}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
            Indian fashion stories, culture notes, beauty reports, and model
            guides written with a refined editorial eye.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-200"
              to={ROUTES.blogs}
            >
              Read editorials
            </Link>
            <Link
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
              to={ROUTES.signUp}
            >
              Join the list
            </Link>
          </div>
        </div>
        <p className="mt-10 text-sm uppercase tracking-[0.24em] text-zinc-400">
          Runway / Beauty / Model Guide
        </p>
      </div>
      <div className="relative min-h-[420px]">
        <img
          alt="Editorial fashion model in black styling"
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/45 via-transparent to-transparent" />
      </div>
    </section>
  )
}

export default HeroSection
