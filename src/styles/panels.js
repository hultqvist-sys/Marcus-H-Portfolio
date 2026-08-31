/**
 * The full-bleed treatment for media panels — the Learning highlights
 * animations, the gamification video, the live training carousel.
 *
 * On a phone they break out of the page's gutters and drop their radius so the
 * media runs edge to edge: the detail in these recordings is small enough that
 * the gutter is worth more as picture than as margin. The negative margin is
 * exactly that gutter — 16px below md, where this treatment applies (px-4 on
 * HomePage's main) — and the width adds it back on both sides, so nothing
 * overflows. Both switch at md, which keeps the inset card.
 *
 * Carries its own width and radius, so don't pair it with w-full or rounded-*
 * on the same element.
 */
export const PANEL_BLEED =
  '-mx-4 w-[calc(100%+2rem)] rounded-none md:mx-0 md:w-full md:rounded-2xl'
