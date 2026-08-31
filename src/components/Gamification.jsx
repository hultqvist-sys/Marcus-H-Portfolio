import { motion } from 'framer-motion'
import LazyVideo from './LazyVideo'
import SectionHeading from './SectionHeading'
import { PANEL_BLEED } from '../styles/panels'

// Figma 315:37048 — fills the grid, 614.6 tall, with a deep single-direction drop.
const VIDEO_SHADOW = '0px 52px 52px -16px rgba(0, 0, 0, 0.24)'

export default function Gamification() {
  return (
    <section className="w-full flex flex-col gap-20">
      <SectionHeading
        title={['02.', 'Building a code-ready prototype in Claude for a gamification concept.']}
        body={[
          'The Learning Gamification Skilltree is a progression and engagement system designed to give learners clear motivation to build skills and return regularly.',
          'To bring this concept to life, I built a code-ready, fully functional prototype using AI-assisted coding tools — complete with motion and micro-interactions that made it feel real. This let us put a tangible experience in front of stakeholders and reduce time needed for engineering delivery.',
        ]}
      />

      {/* Eases up into place as the section is reached; the video itself starts
          as soon as it mounts, which LazyVideo defers until it's in view. */}
      <motion.div
        className={`${PANEL_BLEED} overflow-hidden aspect-[1104/614.6]`}
        style={{ boxShadow: VIDEO_SHADOW }}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <LazyVideo
          src="/assets/video/Gamification.mp4"
          className="w-full h-full"
          alt="Walkthrough of the Learning Gamification Skilltree prototype"
        />
      </motion.div>
    </section>
  )
}
