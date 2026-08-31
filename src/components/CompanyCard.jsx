import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1]
const BORDER = '0.5px solid'

/**
 * Stacked (mobile) cards have no row width to redistribute, so the open card
 * grows downwards instead — it doubles in height while its siblings hold the
 * collapsed one. Mirrors the min-h-[220px] baseline in the card's classes,
 * which is what carries the collapsed height before the row is measured.
 */
const STACKED_HEIGHT = 220
const STACKED_EXPANDED_HEIGHT = STACKED_HEIGHT * 2

export default function CompanyCard({
  company,
  isActive,
  // Row geometry comes from Companies — see the constants there.
  isStacked,
  expandedGrow,
  expandedContentWidth,
  onActivate,
  onDeactivate,
  onToggle,
}) {
  const {
    name,
    logo,
    logoLight,
    shortBlurb,
    longBlurb,
    expandedImage,
    placeholderColor,
  } = company

  /**
   * Only keyboard focus should open the card. A tap focuses the element too
   * (it's tabbable), and that focus lands before the click — so a bare
   * onActivate here would open the card and the click would immediately toggle
   * it shut again, costing touch users a second tap to open. Hover is safe to
   * leave alone: framer-motion drops touch pointers from its hover gesture.
   */
  const handleFocus = event => {
    let isFocusVisible = true
    try {
      isFocusVisible = event.currentTarget.matches(':focus-visible')
    } catch {
      // No :focus-visible support means the browser rings every focus anyway,
      // so match that and activate.
    }
    if (isFocusVisible) onActivate()
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg cursor-pointer flex flex-col justify-end gap-4 p-4 min-h-[220px] lg:min-h-0 basis-auto lg:basis-0 min-w-0"
      style={{
        // Transparent rather than none when active, so the box doesn't shift.
        border: `${BORDER} ${isActive ? 'transparent' : 'rgba(11, 18, 14, 0.14)'}`,
      }}
      animate={
        isStacked
          ? { height: isActive ? STACKED_EXPANDED_HEIGHT : STACKED_HEIGHT }
          : // height back to auto so a card that was expanded while stacked
            // doesn't carry an inline height across the breakpoint, where the
            // row's own height should size it.
            { flexGrow: isActive ? expandedGrow : 1, height: 'auto' }
      }
      transition={{ duration: 0.5, ease: EASE }}
      onHoverStart={onActivate}
      onHoverEnd={onDeactivate}
      onClick={onToggle}
      onFocus={handleFocus}
      onBlur={onDeactivate}
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
      aria-label={`${name} — ${isActive ? longBlurb : shortBlurb}`}
    >
      {/* Expanded background: real image if supplied, flat colour if not */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {expandedImage ? (
              <img
                src={expandedImage}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full"
                style={{ backgroundColor: placeholderColor }}
              />
            )}
            {/* Legibility scrim — Figma: black to 30%, transparent by the top */}
            <div
              className="absolute inset-x-0 bottom-0 h-[85%]"
              style={{
                background:
                  'linear-gradient(to top, #000 0%, #000 10%, transparent 80%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plus rotates into a cross */}
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center"
        animate={{ rotate: isActive ? 45 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <Plus
          size={32}
          strokeWidth={2}
          color={isActive ? '#FFFFFF' : '#4D8CED'}
        />
      </motion.div>

      {/* Content sits above the background, pinned to the bottom.

          When active it's pinned to the expanded card's final inner width
          straight away, rather than tracking the card as it grows. The card
          clips the overhang for the first few frames and reveals it — but the
          text is wrapped for its end state from the outset, so it doesn't
          reflow line by line through the animation. */}
      <div
        className="relative flex flex-col gap-4 min-w-0"
        style={
          isActive && expandedContentWidth
            ? { width: expandedContentWidth }
            : undefined
        }
      >
        {/* Where a light logo exists the two crossfade on the same timing as
            the background, rather than one <img> hard-swapping its src. The
            default Volvo mark is an opaque tile, so swapping at t=0 would
            leave the white wordmark sitting invisibly on it for the first
            frames of the fade — and the dark mark invisible on the image on
            the way back out. */}
        {logoLight ? (
          <div className="relative w-[46px] h-[46px]">
            <motion.img
              src={logo}
              alt={`${name} logo`}
              className="absolute inset-0 w-full h-full object-contain"
              animate={{ opacity: isActive ? 0 : 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
            <motion.img
              src={logoLight}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain"
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </div>
        ) : (
          <img src={logo} alt={`${name} logo`} className="w-[46px] h-[46px] object-contain" />
        )}

        <div className="flex flex-col gap-2 min-w-0">
          {/* Always one line — ellipsis when the card is too narrow */}
          <h3
            className="font-display font-normal text-h4 truncate"
            style={{ color: isActive ? '#FFFFFF' : '#000000' }}
            title={name}
          >
            {name}
          </h3>

          {/* Keyed so the element remounts and fades on state change, which
              keeps the block's height matched to whichever copy is showing */}
          <motion.p
            key={isActive ? 'long' : 'short'}
            className={
              // Same size and weight either way; only the copy and colour
              // change. The clamp stays on the collapsed card, where the
              // shortBlurb has to survive a ~180px column.
              isActive
                ? 'font-body text-body-base font-normal'
                : 'font-body text-body-base font-normal line-clamp-2'
            }
            style={{ color: isActive ? '#FFFFFF' : '#292A2E' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {isActive ? longBlurb : shortBlurb}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
