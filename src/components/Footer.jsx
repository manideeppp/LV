import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="relative py-10 px-4 text-center bg-warm">
      {/* Top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-gold/30" />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-3"
      >
        <p className="text-text-light text-sm font-light">
          With Love
        </p>

        <p className="text-text text-base font-medium">
          Manideep & Ashritha
        </p>

        <div className="pt-3">
          <span className="text-2xl font-serif shimmer-gold">25</span>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
