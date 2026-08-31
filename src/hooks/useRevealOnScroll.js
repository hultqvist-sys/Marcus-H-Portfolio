import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * How early the asset is mounted, ahead of entering the viewport. Generous,
 * because these run 1.7-3.0MB each — if
 * they only started downloading once visible, the animation would begin late or
 * stutter through its first frames.
 */
export const LOAD_MARGIN = '500px'

/**
 * How much of the asset must be on screen before it starts playing. Playing at
 * first pixel means the opening beats happen off screen; a third of the panel is
 * enough that the animation reads as a response to arriving at it.
 */
export const PLAY_RATIO = 0.35

/**
 * Splits "load it" from "play it" into two separate scroll triggers, and latches
 * both — each animation plays through exactly once and never replays.
 *
 * @returns {{
 *   ref: import('react').RefObject<HTMLElement>,
 *   shouldLoad: boolean,
 *   shouldPlay: boolean,
 *   prefersReducedMotion: boolean,
 * }}
 */
export function useRevealOnScroll() {
  const ref = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [shouldPlay, setShouldPlay] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Each observer disconnects itself once it has fired — these are one-way
    // latches, not a live "is it visible" signal.
    const loadObserver = new IntersectionObserver(
      ([entry], observer) => {
        if (!entry.isIntersecting) return
        setShouldLoad(true)
        observer.disconnect()
      },
      { rootMargin: LOAD_MARGIN }
    )

    const playObserver = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.intersectionRatio < PLAY_RATIO) return
        setShouldPlay(true)
        observer.disconnect()
      },
      { threshold: PLAY_RATIO }
    )

    loadObserver.observe(node)
    playObserver.observe(node)

    return () => {
      loadObserver.disconnect()
      playObserver.disconnect()
    }
  }, [])

  return {
    ref,
    shouldLoad,
    shouldPlay,
    prefersReducedMotion: Boolean(prefersReducedMotion),
  }
}
