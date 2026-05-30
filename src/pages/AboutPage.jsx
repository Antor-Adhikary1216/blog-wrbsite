import { BRAND_NAME } from '../utils/constants.js'

function AboutPage() {
  return (
    <section className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
            About
          </p>
          <h1 className="mt-3 font-serif text-5xl font-semibold italic tracking-tight text-zinc-950 md:text-7xl">
            A quieter kind of fashion authority.
          </h1>
        </div>
        <p className="text-lg leading-8 text-zinc-600">
          {BRAND_NAME} is a model-focused editorial journal for runway notes,
          casting-day style, backstage beauty, and the culture around modern
          fashion work. The voice is polished, useful, and deliberately
          restrained.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {[
          {
            title: 'Editorial Eye',
            text: 'Luxury fashion coverage with attention to silhouette, proportion, texture, and mood.',
          },
          {
            title: 'Model Guide',
            text: 'Practical notes for castings, portfolios, wardrobe, skin prep, and career presence.',
          },
          {
            title: 'Backstage Culture',
            text: 'Beauty, runway rhythm, and the small details that shape a season before the lights rise.',
          },
        ].map((item) => (
          <article
            className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
            key={item.title}
          >
            <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
              {item.title}
            </h2>
            <p className="mt-3 leading-7 text-zinc-600">{item.text}</p>
          </article>
        ))}
      </div>

      <img
        alt="Minimal luxury fashion editorial"
        className="h-[460px] w-full rounded-lg object-cover"
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=85"
      />
    </section>
  )
}

export default AboutPage
