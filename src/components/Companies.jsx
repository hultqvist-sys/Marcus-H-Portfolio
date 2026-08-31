import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { companies } from '../data/companies'
import CompanyCard from './CompanyCard'

/**
 * Row geometry lives here because Companies owns the flex row — the expanded
 * card's width is only derivable from the row as a whole, not from a card.
 *
 * Figma: collapsed 309, expanded 618, siblings shrink to 232. 618/232 is the
 * flex-grow ratio that reproduces those proportions at any row width.
 */
const EXPANDED_GROW = 618 / 232
const CARD_GAP = 8 // gap-2 on the row

/**
 * The measured content width is shaved by this much before use. Browser
 * sub-pixel rounding puts the arithmetic within a couple of pixels of the real
 * content box either way, and the two directions are not equally bad: a hair
 * narrow wraps the text imperceptibly early, a hair wide overflows the card's
 * padding and gets clipped. Measured against Chrome across 700-1600px row
 * widths, 2px is enough to always land under.
 */
const WIDTH_SAFETY = 2

const sectionVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

export default function Companies() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [expandedContentWidth, setExpandedContentWidth] = useState(null)
  const rowRef = useRef(null)

  /**
   * The expanded card's inner width has to be known *before* it expands, so its
   * content can be laid out at the final width instead of re-wrapping on every
   * frame of the grow animation.
   */
  useEffect(() => {
    const row = rowRef.current
    if (!row) return

    const measure = () => {
      // Below lg the row stacks and cards are already full width, so there's
      // nothing to pre-size. Reading the computed direction keeps this in sync
      // with the Tailwind breakpoint rather than duplicating it here.
      if (getComputedStyle(row).flexDirection === 'column') {
        setExpandedContentWidth(null)
        return
      }

      const count = companies.length

      // Cards are flex-basis:0 with border-box sizing, so the browser floors
      // each one's base size at its own padding + border and shares everything
      // left over by flex-grow. That makes the padding and borders of *all*
      // cards unavailable to the grow calculation, not just the expanded one's
      // — so they come off the total before the ratio is applied.
      const insetTotal = Array.from(row.children).reduce((sum, card) => {
        const style = getComputedStyle(card)
        return (
          sum +
          parseFloat(style.paddingLeft) +
          parseFloat(style.paddingRight) +
          parseFloat(style.borderLeftWidth) +
          parseFloat(style.borderRightWidth)
        )
      }, 0)

      const free = row.clientWidth - (count - 1) * CARD_GAP - insetTotal

      // Since each card's base size is nothing but padding and border, the
      // expanded card's share of the free space *is* its content box — no
      // further padding subtraction.
      const expanded = (free * EXPANDED_GROW) / (EXPANDED_GROW + count - 1)
      setExpandedContentWidth(Math.max(0, Math.floor(expanded) - WIDTH_SAFETY))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(row)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="w-full">
      <motion.div
        className="w-full flex flex-col gap-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2
          className="font-display font-normal text-h2 max-w-[1000px]"
          style={{ color: '#292A2E' }}
        >
          Some of companies I've worked with...
        </h2>

        {/* Fixed height on desktop makes flex-grow distribute width.
            On mobile the row stacks and cards size to their content.
            Figma: section 529 tall with a 48px heading gap, so the row is 443. */}
        <div ref={rowRef} className="flex flex-col lg:flex-row gap-2 lg:h-[443px]">
          {companies.map((company, index) => (
            <CompanyCard
              key={company.id}
              company={company}
              isActive={activeIndex === index}
              expandedGrow={EXPANDED_GROW}
              expandedContentWidth={expandedContentWidth}
              onActivate={() => setActiveIndex(index)}
              onDeactivate={() => setActiveIndex(null)}
              onToggle={() =>
                setActiveIndex(current => (current === index ? null : index))
              }
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
