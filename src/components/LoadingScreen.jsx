import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const COLORS = [
  { bg: '#AE2E24', logo: 'light' },
  { bg: '#FCA700', logo: 'dark' },
  { bg: '#803FA5', logo: 'light' },
  { bg: '#669DF1', logo: 'dark' },
  { bg: '#292A2E', logo: 'light' },
]

// 5 holds + 4 flips = exactly 5000ms
const HOLD_MS = 620
const FLIP_MS = 475
const STEP_MS = HOLD_MS + FLIP_MS
const TOTAL_MS = HOLD_MS * COLORS.length + FLIP_MS * (COLORS.length - 1)

export default function LoadingScreen({ onLoadComplete }) {
  const [colorIndex, setColorIndex] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [minTimeDone, setMinTimeDone] = useState(false)
  const [assetsReady, setAssetsReady] = useState(false)
  const hasExited = useRef(false)

  // Stepped flip sequence: hold on each face, then flip to the next
  useEffect(() => {
    const timers = []
    const at = (ms, fn) => timers.push(setTimeout(fn, ms))

    for (let step = 0; step < COLORS.length - 1; step++) {
      const flipStart = step * STEP_MS + HOLD_MS
      // Begin the flip
      at(flipStart, () => setRotation(r => r + 180))
      // Swap color + logo at the midpoint, while the square is edge-on
      at(flipStart + FLIP_MS / 2, () => setColorIndex(step + 1))
    }

    at(TOTAL_MS, () => setMinTimeDone(true))

    return () => timers.forEach(clearTimeout)
  }, [])

  // Critical assets: fonts + DOM. Heavy media is excluded by design.
  useEffect(() => {
    let cancelled = false

    const domReady = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise(resolve =>
          window.addEventListener('load', resolve, { once: true })
        )

    const fontsReady = document.fonts
      ? document.fonts.ready.catch(() => {})
      : Promise.resolve()

    Promise.all([domReady, fontsReady]).then(() => {
      if (!cancelled) setAssetsReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  const shouldExit = minTimeDone && assetsReady
  const { bg, logo } = COLORS[colorIndex]
  const logoSrc = `/assets/images/logo-${logo}.svg`
  // Odd steps land the face at 180°/540°, so counter-rotate the logo to keep
  // it upright. Keyed to colorIndex so the flip happens edge-on and unseen.
  const logoUpsideDown = colorIndex % 2 === 1

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white flex items-center justify-center"
      style={{ pointerEvents: shouldExit ? 'none' : 'auto' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: shouldExit ? 0 : 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (shouldExit && !hasExited.current) {
          hasExited.current = true
          onLoadComplete()
        }
      }}
    >
      <div className="w-12 h-12" style={{ perspective: '150px' }}>
        <motion.div
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: bg, borderRadius: '8px' }}
          animate={{ rotateX: rotation }}
          transition={{ duration: FLIP_MS / 1000, ease: 'easeInOut' }}
        >
          <img
            src={logoSrc}
            alt=""
            className="w-6 h-6"
            style={{ transform: logoUpsideDown ? 'rotateX(180deg)' : 'none' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
