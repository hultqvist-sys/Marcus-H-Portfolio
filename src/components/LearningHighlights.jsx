import { motion } from 'framer-motion'
import RevealVideo from './RevealVideo'
import SectionHeading from './SectionHeading'

// Each animated asset carries its own background, so the panel aspect comes
// straight from the source file rather than from a wrapper we guess at.
//   Mix and match 2.mp4           1610 x 1196   (matches Figma 296:10513)
//   Designed for all devices.mp4  1610 x 880    (matches Figma 297:10323)
//   Component_board2.mp4          2000 x 1490   (padded; panel crops to 1104x742)
const PANEL = 'w-full rounded-2xl overflow-hidden bg-panel-warm'

// The component board panel is #F5EEE5, a shade off the other two.
const PANEL_ALT = 'w-full rounded-2xl overflow-hidden bg-panel-warm-alt'

// Captions are held to a 824px measure for readability rather than running the
// full 1104 grid, then centred in it — mx-auto centres the block, text-center
// the lines within it.
const CAPTION =
  'w-full max-w-[824px] mx-auto text-center font-body text-body-base font-normal text-[#292A2E]'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export default function LearningHighlights() {
  return (
    <>
      {/* Section intro */}
      <motion.div className="w-full flex flex-col gap-4" {...fadeUp}>
        <h2 className="font-display font-normal text-h1 text-black">
          Atlassian Learning work examples.
        </h2>
        <p className="font-body text-body-reg font-normal text-[#292A2E]">
          A selection of key projects and contributions across my time on the
          Atlassian Learning team from platform migrations and design systems
          to product UX improvements and code-ready prototypes.
        </p>
      </motion.div>

      {/* 01 — modular component system */}
      <section className="w-full flex flex-col gap-6">
        <SectionHeading
          title={['01.', 'Designing A modular Component System for Atlassian Learning.']}
          body={[
            'Working with a team of learning designers and engineers, I led, designed and helped implement a scalable, modular component system — enabling learning designers to independently create and publish learning resources.',
            'Before it existed, every new page required design and engineering support creating bottlenecks and slowing content delivery. By providing a flexible, accessible toolkit of standardized components I removed that dependency, getting learning resources to learners faster.',
          ]}
        />

        {/* 1610x1196 is the source's own size — a 1.46x upscale on a 1104
            panel, so it holds up on retina where the 1104-wide first cut went
            soft. */}
        <RevealVideo
          src="/assets/video/Mix and match 2.mp4"
          className={`${PANEL} aspect-[1610/1196]`}
          ariaLabel="Learning designers assembling a page from pre-built components"
        />

        <div className="w-full flex flex-col gap-4">
          <h4 className="text-center font-body text-body-reg font-semibold text-[#292A2E]">
            How it works
          </h4>
          <p className={CAPTION}>
            Authors build a page by selecting from a
            library of UI components such as heroes, rich text
            blocks, and CTAs. Each component has defined fields and constraints
            that keep content on-brand and accessible without requiring design
            oversight. Once assembled, the page can be published directly, with
            no engineering or design involvement needed.
          </p>
        </div>
      </section>

      {/* Responsive across devices */}
      <section className="w-full flex flex-col gap-6">
        <RevealVideo
          src="/assets/video/Designed for all devices.mp4"
          className={`${PANEL} aspect-[1610/880]`}
          ariaLabel="The component system rendered across desktop, tablet and mobile"
        />
        <p className={CAPTION}>
          Every component has been designed to be accessible, on-brand, flexible
          and responsive across desktop, tablet and mobile.
        </p>
      </section>

      {/* Component board */}
      <section className="w-full flex flex-col gap-6">
        {/* Was an animated SVG export, now an MP4, re-exported at 2000x1490 so
            it stays sharp on retina where the first 1104-wide cut went soft.

            The panel keeps the Figma frame's 1104x742 (317:19058) rather than
            the source's own 1.342 aspect: this export is the padded artboard
            the SVG used for off-stage motion, so object-cover trims ~5% off the
            top and bottom to get back to the designed height. The board itself
            sits well inside that, so nothing of it is clipped. */}
        <RevealVideo
          src="/assets/video/Component_board2.mp4"
          className={`${PANEL_ALT} aspect-[1104/742]`}
          ariaLabel="The delivered component library laid out as a board"
        />
        <p className={CAPTION}>
          The initial library delivery was scoped around Atlassian's most common
          webpage use cases, resulting in a suite of 20+ purpose-built
          components.
        </p>
      </section>
    </>
  )
}
