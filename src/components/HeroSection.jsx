import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const coupleImage = '/couple.jpg'

// Floating golden particles
const Particles = () => {
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 2 + Math.random() * 4,
      opacity: 0.15 + Math.random() * 0.35,
    }))
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: '-5%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `rgba(184, 134, 11, ${p.opacity})`,
            animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

const HeroSection = () => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-3 py-3 bg-gradient-to-b from-cream via-cream to-warm overflow-hidden">
      {/* Background luxury glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-gold/[0.03] blur-2xl pointer-events-none" />

      {/* Floating particles */}
      <Particles />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-center z-10 mb-3"
      >
        <div className="flex items-center justify-center gap-3 mb-1.5">
          <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold/80 text-[10px]">✦</span>
          <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
        <h1 className="text-base md:text-xl font-serif text-text-light/80 tracking-wider uppercase">
          Silver Jubilee Celebration
        </h1>
      </motion.div>

      {/* Couple Image - cinematic premium */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
        className="relative z-10"
      >
        {/* Warm glow behind image */}
        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-gold/15 via-gold/5 to-gold-light/10 blur-xl" />

        {/* Floating animation wrapper */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          {/* Premium silver-gold frame */}
          <div className="p-[3px] rounded-2xl bg-gradient-to-br from-gold via-[#e0c56c] to-gold-dark shadow-xl shadow-gold/25 relative">
            {/* Inner gold glow line */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-light/30 via-transparent to-gold/20 pointer-events-none" />
            <div className="rounded-[13px] overflow-hidden relative">
              <img
                src={coupleImage}
                alt="Vani & Lingareddy"
                className="w-[85vw] max-w-[350px] h-[52vh] md:w-[400px] md:h-[500px] object-cover object-top"
                style={{ filter: 'contrast(1.03) saturate(1.08) brightness(1.01)' }}
              />
              {/* Cinematic vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/5 pointer-events-none" />
            </div>
          </div>

          {/* "25 Years" luxury badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-gold/30 rounded-full px-4 py-1.5 shadow-lg shadow-gold/10"
          >
            <span className="text-[11px] md:text-xs font-serif font-semibold text-gold-dark tracking-wider">
              ✦ 25 YEARS ✦
            </span>
          </motion.div>

          {/* Corner accents */}
          <div className="absolute -top-2.5 -left-2.5 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-gold/50 rounded-tl" />
          <div className="absolute -top-2.5 -right-2.5 w-5 h-5 border-t-[1.5px] border-r-[1.5px] border-gold/50 rounded-tr" />
          <div className="absolute -bottom-2.5 -left-2.5 w-5 h-5 border-b-[1.5px] border-l-[1.5px] border-gold/50 rounded-bl" />
          <div className="absolute -bottom-2.5 -right-2.5 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-gold/50 rounded-br" />
        </motion.div>
      </motion.div>

      {/* Couple Names */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="mt-6 text-center z-10"
      >
        <h2 className="text-5xl md:text-7xl font-script shimmer-gold leading-tight">
          Vani & Lingareddy
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-2 flex items-center justify-center gap-3"
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold/80 text-xs">✦</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-2 text-text-light text-xs md:text-sm tracking-[0.12em] font-light"
        >
          Celebrating 25 Beautiful Years of Love
        </motion.p>
      </motion.div>

      {/* Scroll button - glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <a
            href="#invitation"
            className="bg-white/70 backdrop-blur-lg border border-gold/25 rounded-full px-5 py-2 flex items-center gap-2 shadow-md shadow-gold/10 no-underline"
          >
            <span className="text-text text-[11px] md:text-xs font-medium tracking-wide">Scroll for details</span>
            <motion.svg
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-3.5 h-3.5 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
            </motion.svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
