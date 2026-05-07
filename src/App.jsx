import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import HeroSection from './components/HeroSection'
import InvitationCard from './components/InvitationCard'
import EventDetails from './components/EventDetails'
import Footer from './components/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-cream overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <main>
          {/* Section 1: Hero with image */}
          <HeroSection />
          {/* Section 2: Invitation + Event Details */}
          <InvitationCard />
          {/* Section 3: Venue & Footer */}
          <EventDetails />
          <Footer />
        </main>
      )}
    </div>
  )
}

export default App
