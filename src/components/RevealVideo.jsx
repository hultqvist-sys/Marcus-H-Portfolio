import { useEffect, useRef, useState } from 'react'
import { Maximize2 } from 'lucide-react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import VideoLightbox from './VideoLightbox'

/**
 * A video that plays through once when it scrolls into view, then holds its
 * final frame. All three animated blocks in the Learning highlights section use
 * it, so they stay consistent.
 *
 * Deliberately not LazyVideo: that one loops and starts the moment it mounts,
 * which is right for the Gamification walkthrough but not for a 2s one-shot.
 *
 * The panel is a button: tapping or clicking it opens the animation in an
 * expanded view. Details of the components in these recordings are small at
 * panel size and smaller again on a phone, so being able to open one is the
 * difference between reading it and guessing at it.
 */
const AFFORDANCE =
  'absolute top-3 right-3 w-9 h-9 rounded-full grid place-items-center ' +
  'bg-black/40 text-white opacity-70 transition-opacity duration-200 ' +
  'group-hover:opacity-100 group-focus-visible:opacity-100'

const PANEL_BUTTON =
  'group relative block cursor-zoom-in focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-[#1558BC]'

export default function RevealVideo({ src, className = '', ariaLabel }) {
  const { ref, shouldLoad, shouldPlay, prefersReducedMotion } = useRevealOnScroll()
  const videoRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (prefersReducedMotion) {
      // Park on the last frame instead of animating. Seeking needs duration,
      // which isn't known until metadata arrives.
      const seekToEnd = () => {
        if (Number.isFinite(video.duration)) video.currentTime = video.duration
      }
      if (video.readyState >= 1) seekToEnd()
      else video.addEventListener('loadedmetadata', seekToEnd, { once: true })
      return
    }

    if (!shouldPlay) return

    // Autoplay can still be refused (power saving, strict settings). Falling
    // back to the last frame beats leaving a blank panel.
    const played = video.play()
    if (played?.catch) {
      played.catch(() => {
        if (Number.isFinite(video.duration)) video.currentTime = video.duration
      })
    }
  }, [shouldPlay, prefersReducedMotion])

  return (
    <>
      {/* The panel classes stay on the element the reveal observers watch, so
          the load and play triggers still key off the panel's own geometry. */}
      <button
        ref={ref}
        type="button"
        onClick={() => setIsExpanded(true)}
        aria-label={`Expand: ${ariaLabel}`}
        className={`${className} ${PANEL_BUTTON}`}
      >
        {shouldLoad && (
          <video
            ref={videoRef}
            // muted + playsInline are both required or iOS Safari refuses to
            // autoplay and takes the video fullscreen instead.
            muted
            playsInline
            // No loop: it plays once and rests on the closing frame.
            preload="auto"
            // The button carries the description now, so the video repeating it
            // would only make screen readers say it twice.
            aria-hidden="true"
            className="w-full h-full object-cover"
          >
            <source src={src} type="video/mp4" />
          </video>
        )}

        <span className={AFFORDANCE} aria-hidden="true">
          <Maximize2 size={16} />
        </span>
      </button>

      <VideoLightbox
        src={src}
        label={ariaLabel}
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
      />
    </>
  )
}
