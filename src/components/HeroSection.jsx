import { motion } from 'framer-motion'

const coupleImage = '/couple.jpg'

const HeroSection = () => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-6 bg-cream">
      {/* Subtle top ornament */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex items-center gap-3 mb-4"
      >
        <div className="h-[1px] w-8 bg-gold/40" />
        <span className="text-gold text-sm">✦</span>
        <div className="h-[1px] w-8 bg-gold/40" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-lg md:text-2xl font-serif text-text-light tracking-wide text-center"
      >
        Silver Jubilee Celebration
      </motion.h1>

      {/* Couple Image - large and prominent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-5 relative"
      >
        {/* Gold frame border */}
        <div className="p-[3px] rounded-2xl bg-gradient-to-br from-gold via-gold-light to-gold shadow-lg shadow-gold/20">
          <div className="rounded-[13px] overflow-hidden">
            <img
              src={coupleImage}
              alt="Vani & Lingareddy"
              className="w-[300px] h-[400px] md:w-[380px] md:h-[500px] object-cover object-top"
            />
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold/60 rounded-tl-md" />
        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-gold/60 rounded-tr-md" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-gold/60 rounded-bl-md" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold/60 rounded-br-md" />
      </motion.div>

      {/* Couple Names */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-6 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-script shimmer-gold leading-tight">
          Vani & Lingareddy
        </h2>
        <div className="mt-2 flex items-center justify-center gap-3">
          <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold/70 text-xs">✦</span>
          <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
        <p className="mt-2 text-text-light text-xs md:text-sm tracking-[0.15em] uppercase font-light">
          25 Years of Togetherness
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <div className="bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 flex items-center gap-2">
            <span className="text-text-light text-[11px] md:text-xs tracking-wide">Scroll for details</span>
            <svg className="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
