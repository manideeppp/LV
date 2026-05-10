import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import HeroSection from './components/HeroSection'
import InvitationCard from './components/InvitationCard'
import EventDetails from './components/EventDetails'
import Footer from './components/Footer'
import InvitationVideoPage from './components/InvitationVideoPage'

function HomePage() {
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
          <HeroSection />
          <InvitationCard />
          <EventDetails />
          <Footer />
        </main>
      )}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/invitation" element={<InvitationVideoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
