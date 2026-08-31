import { useEffect, useRef } from 'react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

/**
 * A video that plays through once when it scrolls into view, then holds its
 * final frame. All three animated blocks in the Learning highlights section use
 * it, so they stay consistent.
 *
 * Deliberately not LazyVideo: that one loops and starts the moment it mounts,
 * which is right for the Gamification walkthrough but not for a 2s one-shot.
 */
export default function RevealVideo({ src, className = '', ariaLabel }) {
  const { ref, shouldLoad, shouldPlay, prefersReducedMotion } = useRevealOnScroll()
  const videoRef = useRef(null)

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
    <div ref={ref} className={className}>
      {shouldLoad && (
        <video
          ref={videoRef}
          // muted + playsInline are both required or iOS Safari refuses to
          // autoplay and takes the video fullscreen instead.
          muted
          playsInline
          // No loop: it plays once and rests on the closing frame.
          preload="auto"
          aria-label={ariaLabel}
          className="w-full h-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
