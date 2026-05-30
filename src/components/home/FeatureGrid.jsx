import SectionCard from '../common/SectionCard.jsx'
import { FEATURE_ITEMS } from '../../utils/constants.js'

function FeatureGrid() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
          Project structure
        </h2>
        <p className="mt-2 text-zinc-600">
          Each layer has a focused purpose, so future features have an obvious
          place to live.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {FEATURE_ITEMS.map((feature) => (
          <SectionCard key={feature.title}>
            <h3 className="text-lg font-semibold text-zinc-950">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {feature.description}
            </p>
          </SectionCard>
        ))}
      </div>
    </section>
  )
}

export default FeatureGrid
