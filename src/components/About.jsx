import { motion } from 'framer-motion'

// Scroll-triggered: fires once when the section is ~25% visible
const VIEWPORT = { once: true, amount: 0.25 }

const fromLeftVariants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const fromRightVariants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// Times its children's cascade without moving itself
const rightColumnVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.2, staggerChildren: 0.15 } },
}

const HEADING_CLASS = 'font-display font-semibold text-h3 uppercase'
const BODY_CLASS = 'font-body text-body-reg font-light'

export default function About() {
  return (
    <section className="w-full">
      <div className="w-full flex flex-col lg:flex-row gap-8">
        {/* Left - About me, enters from the left */}
        <motion.div
          className="w-full lg:flex-1 flex flex-col gap-12"
          variants={fromLeftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div className="flex flex-col gap-4">
            <h2 className={HEADING_CLASS} style={{ color: '#1558BC' }}>
              About me
            </h2>
            <p className={BODY_CLASS} style={{ color: '#292A2E' }}>
              I craft intuitive digital products, bridging the gap between
              design and engineering by combining high-level visual craft with
              hands-on front-end development.
            </p>
            <p className={BODY_CLASS} style={{ color: '#292A2E' }}>
              Currently at Atlassian, I lead end-to-end UX/UI design for the
              Atlassian Learning Platform, delivering complex learning
              experiences to hundreds of thousands of learners.
            </p>
          </div>
        </motion.div>

        {/* Right - staggered cascade from the right */}
        <motion.div
          className="w-full lg:w-[369px] lg:shrink-0 flex flex-col gap-8"
          variants={rightColumnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {/* Years of experience */}
          <motion.div className="flex flex-col gap-4" variants={fromRightVariants}>
            <h3 className={HEADING_CLASS} style={{ color: '#1558BC' }}>
              Years of experience
            </h3>
            <p
              className="font-body text-stat font-normal"
              style={{ color: '#292A2E' }}
            >
              7
            </p>
          </motion.div>

          {/* Education */}
          <motion.div className="flex flex-col gap-4" variants={fromRightVariants}>
            <h3 className={HEADING_CLASS} style={{ color: '#1558BC' }}>
              Education
            </h3>
            <p className={BODY_CLASS} style={{ color: '#292A2E' }}>
              Bachelors in Business, Marketing
              <br />
              Bachelors in Design, Industrial
            </p>
          </motion.div>

          {/* Current employment */}
          <motion.div className="flex flex-col gap-4" variants={fromRightVariants}>
            <h3 className={HEADING_CLASS} style={{ color: '#1558BC' }}>
              Current Employment
            </h3>
            <div className="flex flex-col gap-1">
              <p
                className="font-body text-body-reg font-bold"
                style={{ color: '#292A2E' }}
              >
                Atlassian
              </p>
              <p className={BODY_CLASS} style={{ color: '#292A2E' }}>
                Design Lead - Contractor
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
