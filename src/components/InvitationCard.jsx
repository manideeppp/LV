import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const InvitationCard = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="invitation" className="relative py-12 md:py-20 px-5 bg-warm" ref={ref}>
      {/* Top decorative border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto text-center"
      >
        {/* Section ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-10 bg-gold/40" />
          <span className="text-gold text-base">❈</span>
          <div className="h-[1px] w-10 bg-gold/40" />
        </div>

        {/* Invitation text - clear and readable */}
        <div className="space-y-5 text-text leading-relaxed">
          <p className="text-base md:text-lg font-light">
            With great joy and happiness,
          </p>
          
          <p className="text-base md:text-lg font-light">
            we warmly invite you to celebrate
            the <span className="font-medium text-gold-dark">Silver Jubilee Anniversary</span> of
          </p>

          <p className="text-2xl md:text-3xl font-serif font-semibold text-gold-dark py-2">
            Vani & Lingareddy
          </p>

          <p className="text-base md:text-lg font-light">
            as they complete <span className="font-medium">25 wonderful years</span> of togetherness.
          </p>

          <p className="text-base md:text-lg font-light text-text-light">
            Your presence and blessings will make this
            occasion truly memorable. ✨
          </p>
        </div>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-[1px] w-10 bg-gold/40" />
          <span className="text-gold text-base">❈</span>
          <div className="h-[1px] w-10 bg-gold/40" />
        </div>

        {/* Invited by */}
        <p className="mt-6 text-sm text-text-light tracking-wide">
          Invited by <span className="font-medium text-text">Vani & Lingareddy</span>
        </p>
      </motion.div>
    </section>
  )
}

export default InvitationCard
