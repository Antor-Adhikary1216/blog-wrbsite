function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-8">
      <div className="rounded-lg border border-zinc-200 bg-zinc-950 p-8 text-white shadow-xl sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
          Contact
        </p>
        <h1 className="mt-3 text-5xl font-semibold italic tracking-tight md:text-7xl">
          Work with the editorial desk.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
          Send collaboration notes, model features, campaign ideas, or press
          releases. Keep it sharp, visual, and relevant to fashion culture.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
            Editorial
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
            Story pitches
          </h2>
          <p className="mt-3 leading-7 text-zinc-600">
            Pitch features, interviews, runway reflections, and model guides.
          </p>
          <a
            className="mt-5 inline-flex rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            href="mailto:editorial@blogindia.com"
          >
            editorial@blogindia.com
          </a>
        </article>

        <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
            Partnerships
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
            Campaigns and placements
          </h2>
          <p className="mt-3 leading-7 text-zinc-600">
            Discuss brand collaborations, launch coverage, and luxury creative
            partnerships.
          </p>
          <a
            className="mt-5 inline-flex rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-950"
            href="mailto:studio@blogindia.com"
          >
            studio@blogindia.com
          </a>
        </article>
      </div>
    </section>
  )
}

export default ContactPage
