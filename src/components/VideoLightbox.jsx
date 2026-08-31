import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Expanded view for one of the Learning highlights animations. Same shell as
 * the gallery Lightbox — dark scrim, click-out, Escape, scroll lock, focus
 * handed back on close — minus the paging, since each video stands alone.
 *
 * Like the inline panel, the expanded copy plays through once and rests on its
 * closing frame — it just starts over from the top, at size. Native controls
 * are how it gets replayed, and on a phone they're also the way to real
 * fullscreen: iOS and Android both offer landscape fullscreen from them, which
 * is worth far more on a 375px screen than the scrim itself.
 */
export default function VideoLightbox({ src, label, isOpen, onClose }) {
  const closeButtonRef = useRef(null)
  const restoreFocusRef = useRef(null)
  const videoRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  // Remember what was focused before opening so it can be handed back on close.
  useEffect(() => {
    if (isOpen) {
      restoreFocusRef.current = document.activeElement
      closeButtonRef.current?.focus()
    } else if (restoreFocusRef.current instanceof HTMLElement) {
      restoreFocusRef.current.focus()
      restoreFocusRef.current = null
    }
  }, [isOpen])

  // Keyboard control and scroll lock, both only while open.
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = event => {
      if (event.key === 'Escape') onClose()
    }

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // Reduced motion: park on the closing frame and let the controls do the rest,
  // matching how RevealVideo treats the inline panel.
  useEffect(() => {
    const video = videoRef.current
    if (!isOpen || !prefersReducedMotion || !video) return

    const seekToEnd = () => {
      if (Number.isFinite(video.duration)) video.currentTime = video.duration
    }
    if (video.readyState >= 1) seekToEnd()
    else video.addEventListener('loadedmetadata', seekToEnd, { once: true })
  }, [isOpen, prefersReducedMotion])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // Tighter padding than the gallery lightbox below sm: these panels are
          // landscape, so on a phone every pixel of width is height too.
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close expanded video"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full grid place-items-center bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X size={22} />
          </button>

          {/* Stop propagation or reaching for the controls dismisses the view. */}
          <motion.video
            ref={videoRef}
            src={src}
            muted
            playsInline
            controls
            // No loop: one pass from the top, then it holds the last frame.
            autoPlay={!prefersReducedMotion}
            preload="auto"
            aria-label={label}
            onClick={event => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
