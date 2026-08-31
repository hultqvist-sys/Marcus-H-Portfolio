import { useCallback, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SLIDE_ASPECT, carouselSlides } from '../data/carousel'
import { PANEL_BLEED } from '../styles/panels'

const EASE = [0.22, 1, 0.36, 1]

// zIndex keeps the incoming slide above anything still exiting. AnimatePresence
// doesn't guarantee DOM order between entering and exiting children, and if the
// tab is backgrounded mid-transition the exits freeze and stack up.
const slideVariants = {
  enter: direction => ({ opacity: 0, x: direction > 0 ? 48 : -48, zIndex: 1 }),
  center: { opacity: 1, x: 0, zIndex: 1 },
  exit: direction => ({ opacity: 0, x: direction > 0 ? -48 : 48, zIndex: 0 }),
}

/**
 * A slow scale pulse on the next arrow, hinting that there's more to see. The
 * keyframes rest at 1 for the back half of the cycle so it reads as an
 * occasional nudge rather than a constant throb.
 */
const PULSE = {
  animate: { scale: [1, 1.06, 1, 1] },
  transition: {
    duration: 2.4,
    times: [0, 0.18, 0.36, 1],
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

/**
 * Two-stage reveal on the chevron's circle. The chevron itself stays visible so
 * the control is still discoverable on touch, where there's no hover at all —
 * only the disc behind it responds:
 *
 *   idle                -> transparent
 *   carousel hovered    -> #D9D9D9 at 10%
 *   this button hovered -> #D9D9D9 at 20%
 *
 * The button-hover rule is stacked as `group-hover:hover:` rather than plain
 * `hover:`. A bare `hover:` loses to `group-hover:` on specificity (one class
 * and one pseudo vs two of each), so the 20% would never apply.
 */
const ARROW_CLASS =
  'absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full grid place-items-center ' +
  'bg-transparent text-white transition-colors duration-200 ' +
  'group-hover:bg-[#D9D9D9]/10 group-hover:hover:bg-[#D9D9D9]/20 ' +
  'focus-visible:bg-[#D9D9D9]/20 focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-white ' +
  'disabled:opacity-0 disabled:pointer-events-none'

// The dots double as the step counter, so they stay hidden until the carousel is
// hovered — or focused from the keyboard, where there's no hover to rely on.
const DOTS_CLASS =
  'absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 ' +
  'opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100'

export default function Carousel({ slides = carouselSlides }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  // Latches on first navigation, which retires the arrow's pulse hint.
  const [hasNavigated, setHasNavigated] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const hasNext = index < slides.length - 1
  const hasPrevious = index > 0

  // Advancing is entirely user-driven: an interval would run while the section
  // was still off screen and leave the carousel parked on the last slide by the
  // time it was scrolled into view.
  const goTo = useCallback(
    next => {
      setDirection(next > index ? 1 : -1)
      setIndex(next)
      setHasNavigated(true)
    },
    [index]
  )

  const handleKeyDown = event => {
    if (event.key === 'ArrowLeft' && hasPrevious) {
      event.preventDefault()
      goTo(index - 1)
    } else if (event.key === 'ArrowRight' && hasNext) {
      event.preventDefault()
      goTo(index + 1)
    }
  }

  if (!slides.length) return null

  const showPulse = !hasNavigated && hasNext && !prefersReducedMotion

  return (
    <div
      className={`${PANEL_BLEED} group relative overflow-hidden bg-carousel-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1558BC]`}
      style={{ aspectRatio: SLIDE_ASPECT }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Live training migration designs"
    >
      {/* Default (sync) mode keeps both slides mounted mid-transition; since
          they're both absolutely positioned they cross-fade in place. */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={slides[index].id}
          src={slides[index].src}
          alt={slides[index].alt}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute inset-0 w-full h-full object-cover"
          // The first slide is what the section leads with, so it shouldn't wait
          // for the lazy-load pass; the rest can.
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </AnimatePresence>

      <button
        type="button"
        className={`${ARROW_CLASS} left-4`}
        onClick={() => goTo(index - 1)}
        disabled={!hasPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>

      <motion.button
        type="button"
        className={`${ARROW_CLASS} right-4`}
        onClick={() => goTo(index + 1)}
        disabled={!hasNext}
        aria-label="Next slide"
        animate={showPulse ? PULSE.animate : { scale: 1 }}
        transition={showPulse ? PULSE.transition : { duration: 0.25, ease: EASE }}
      >
        <ChevronRight size={22} />
      </motion.button>

      {slides.length > 1 && (
        <div className={DOTS_CLASS}>
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(slideIndex)}
              aria-label={`Go to slide ${slideIndex + 1} of ${slides.length}`}
              aria-current={slideIndex === index}
              className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                slideIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/45 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
