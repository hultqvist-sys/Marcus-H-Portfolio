import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1]

const NAV_CLASS =
  'w-11 h-11 rounded-full grid place-items-center bg-white/10 text-white transition ' +
  'hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-white disabled:opacity-30 disabled:pointer-events-none'

/**
 * Expanded view for a gallery image. Loads the full-size original rather than
 * the grid thumbnail, and can page across the whole gallery in display order.
 */
export default function Lightbox({ images, index, onClose, onNavigate }) {
  const isOpen = index !== null
  const image = isOpen ? images[index] : null
  const closeButtonRef = useRef(null)
  const restoreFocusRef = useRef(null)

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
      else if (event.key === 'ArrowLeft' && index > 0) onNavigate(index - 1)
      else if (event.key === 'ArrowRight' && index < images.length - 1) {
        onNavigate(index + 1)
      }
    }

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, index, images.length, onClose, onNavigate])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 p-6 bg-black/85 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
        >
          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close expanded image"
            className={`${NAV_CLASS} absolute top-6 right-6`}
          >
            <X size={22} />
          </button>

          {/* Stop propagation so clicking the image itself doesn't dismiss. */}
          <motion.img
            key={image.src}
            src={image.src}
            alt={image.alt}
            onClick={event => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />

          <div
            className="flex items-center gap-4"
            onClick={event => event.stopPropagation()}
          >
            <button
              type="button"
              className={NAV_CLASS}
              onClick={() => onNavigate(index - 1)}
              disabled={index === 0}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            <p className="font-body text-body-sm text-white/70 tabular-nums">
              {index + 1} / {images.length}
            </p>

            <button
              type="button"
              className={NAV_CLASS}
              onClick={() => onNavigate(index + 1)}
              disabled={index === images.length - 1}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
