import FeatureGrid from '../components/home/FeatureGrid.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import IntegrationStatus from '../components/home/IntegrationStatus.jsx'

function HomePage() {
  return (
    <div className="space-y-10 pb-16 pt-8 sm:space-y-14 sm:pt-12">
      <HeroSection />
      <IntegrationStatus />
      <FeatureGrid />
    </div>
  )
}

export default HomePage
