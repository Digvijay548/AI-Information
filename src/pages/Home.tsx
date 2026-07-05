import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import TickerBar from '../components/sections/TickerBar'
import TopicsSection from '../components/sections/TopicsSection'
import NewsSection from '../components/sections/NewsSection'
import TrendingTechSection from '../components/sections/TrendingTechSection'
import AIModelsSection from '../components/sections/AIModelsSection'
import GithubSection from '../components/sections/GithubSection'
import FrameworksSection from '../components/sections/FrameworksSection'
import ComparisonSection from '../components/sections/ComparisonSection'
import ArchitecturesSection from '../components/sections/ArchitecturesSection'
import FeaturedProjectsSection from '../components/sections/FeaturedProjectsSection'
import MarketTrendsSection from '../components/sections/MarketTrendsSection'
import CTASection from '../components/sections/CTASection'

export default function Home() {
  const { hash } = useLocation()

  // smooth-scroll to hash targets (e.g. /#news) after render
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [hash])

  return (
    <>
      <Hero />
      <TickerBar />
      <TopicsSection />
      <NewsSection />
      <TrendingTechSection />
      <AIModelsSection />
      <GithubSection />
      <FrameworksSection />
      <ComparisonSection />
      <ArchitecturesSection />
      <FeaturedProjectsSection />
      <MarketTrendsSection />
      <CTASection />
    </>
  )
}
