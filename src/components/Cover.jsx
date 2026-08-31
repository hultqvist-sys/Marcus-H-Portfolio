import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const fromBelowVariants = {
  hidden: { opacity: 0, y: 64 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

export default function Cover() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center">
      <motion.div
        className="w-full flex flex-col items-center gap-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header - logo, title, subtitle */}
        <motion.div
          className="w-full flex flex-col items-center gap-6"
          variants={itemVariants}
        >
          <motion.img
            src="/assets/images/logo-real.svg"
            alt="Logo"
            className="w-16 h-16"
            variants={imageVariants}
          />
          <div className="w-full flex flex-col items-center gap-2">
            <h1
              className="font-display font-normal text-title text-center"
              style={{ color: '#292A2E' }}
            >
              Hey, I'm Marcus!
            </h1>
            <p
              className="font-body text-subtitle text-center w-full max-w-[932px]"
              style={{ color: '#292A2E', fontWeight: 300 }}
            >
              I'm a{' '}
              <span style={{ color: '#AE2E24' }}>Senior Product Designer</span>{' '}
              specializing in design systems, visual craft, and bridging design
              to production code.
            </p>
          </div>
        </motion.div>

        {/* Profile image */}
        <motion.div
          className="flex justify-center"
          variants={fromBelowVariants}
        >
          <img
            src="/assets/images/profile.svg"
            alt="Marcus Hultqvist"
            width={349}
            height={436}
            className="w-full max-w-[349px] h-auto"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
