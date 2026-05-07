import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EventDetails = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section className="relative py-12 md:py-20 px-5 bg-cream" ref={ref}>
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <p className="text-text-light text-xs tracking-[0.2em] uppercase mb-2">Event Details</p>
        <h2 className="text-xl md:text-2xl font-serif text-text">
          Please Join Us
        </h2>
      </motion.div>

      {/* Details - clean cards */}
      <div className="max-w-sm mx-auto space-y-4">
        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-5 border border-border shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
            <span className="text-2xl">📅</span>
          </div>
          <div>
            <p className="text-xs text-text-light uppercase tracking-wider">Date</p>
            <p className="text-lg font-serif font-semibold text-text">13 May 2026</p>
            <p className="text-sm text-text-light">Wednesday</p>
          </div>
        </motion.div>

        {/* Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="bg-white rounded-2xl p-5 border border-border shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
            <span className="text-2xl">⏰</span>
          </div>
          <div>
            <p className="text-xs text-text-light uppercase tracking-wider">Time</p>
            <p className="text-lg font-serif font-semibold text-text">6:30 PM</p>
            <p className="text-sm text-text-light">Onwards</p>
          </div>
        </motion.div>

        {/* Venue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-2xl p-5 border border-border shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
            <span className="text-2xl">📍</span>
          </div>
          <div>
            <p className="text-xs text-text-light uppercase tracking-wider">Venue</p>
            <p className="text-lg font-serif font-semibold text-text">Anha Farmstay</p>
            <p className="text-sm text-text-light">Garrepalle, Telangana</p>
          </div>
        </motion.div>
      </div>

      {/* Map Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="text-center mt-8"
      >
        <a
          href="https://share.google/CnXTUpnmvvsZtevPq"
          target="_blank"
          rel="noopener noreferrer"
          className="gold-button font-sans"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Open Venue Location
        </a>
      </motion.div>
    </section>
  )
}

export default EventDetails
