/**
 * Live training migration carousel.
 *
 * Each slide is a full composed scene exported from Figma at the frame's own
 * size (1104x625) — dark background, decorative shapes and device mockups are
 * all baked in, so the component just cross-fades between images.
 *
 * ── ADDING SLIDES ───────────────────────────────────────────────────────────
 *
 * Drop the file into `public/assets/images/carousel images/` and add an entry
 * below with a real `alt` description. Order here is display order; the carousel
 * picks up any number of slides and the arrows and dots adapt.
 * ────────────────────────────────────────────────────────────────────────────
 */

const DIR = '/assets/images/carousel images'

/** Slide frame aspect, from the Figma carousel frame (317:19892). */
export const SLIDE_ASPECT = '1104 / 625'

export const carouselSlides = [
  {
    id: 'ilt-enrollment2',
    src: `${DIR}/Image_1.png`,
    alt: 'Live training session page shown on desktop and mobile',
  },
  {
    id: 'session-pages',
    src: `${DIR}/Image_2.png`,
    alt: 'Session and course page designs',
  },
  {
    id: 'calendar',
    src: `${DIR}/Image_3.svg`,
    alt: 'Event calendar and enrollment flow',
  },
  {
    id: 'events-at-scale',
    src: `${DIR}/Image_4.png`,
    alt: 'Centralised events calendar scaled to hundreds of events',
  },
]
