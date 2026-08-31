/**
 * Sample highlights gallery.
 *
 * Grouped by the company the work was done for, in Figma order. The groups have
 * no visible labels — they only control spacing, so a group that doesn't fill its
 * last row (Volvo, Dome) leaves a gap, exactly as designed.
 *
 * ── ADDING IMAGES ───────────────────────────────────────────────────────────
 *
 * 1. Drop the full-size PNG into `public/assets/images/Grid/`
 * 2. Run `npm run thumbs` to generate its grid thumbnail
 * 3. Add an entry below with a real `alt` description
 *
 * `src` is the full-size original, loaded only when the image is expanded.
 * `thumb` is the downscaled version used for the grid tile.
 * ────────────────────────────────────────────────────────────────────────────
 */

const DIR = '/assets/images/Grid'

// Tiles are square. The sources are all ~3000x2753 (1.09), so object-cover
// trims roughly 8% off the sides — no vertical cropping.
export const TILE_ASPECT = '1 / 1'

const image = (file, alt) => ({
  src: `${DIR}/${file}`,
  thumb: `${DIR}/thumbs/${file}`,
  alt,
})

export const galleryGroups = [
  {
    id: 'volvo',
    company: 'Volvo',
    images: [
      image('Volvo 1.png', 'Volvo — in-car console interface design'),
      image('Volvo 2.png', 'Volvo — centre display navigation view'),
      image('Volvo 3.png', 'Volvo — media and audio controls'),
      image('Volvo 4.png', 'Volvo — wireless charging status screen'),
      image('Volvo 5.png', 'Volvo — vehicle settings interface'),
    ],
  },
  {
    id: 'dome',
    company: 'Dome',
    images: [
      image('Dome 1.png', 'Dome — product interface screen'),
      image('Dome 2.png', 'Dome — dashboard view'),
      image('Dome 3.png', 'Dome — detail view'),
      image('Dome 4.png', 'Dome — configuration screen'),
      image('Dome 5.png', 'Dome — summary view'),
    ],
  },
  {
    id: 'extreme',
    company: 'Extreme Networks',
    images: [
      image('Extreme 1.png', 'Extreme Networks — design system component library'),
      image('Extreme 2.png', 'Extreme Networks — SaaS dashboard'),
      image('Extreme 3.png', 'Extreme Networks — network monitoring view'),
      image('Extreme 4.png', 'Extreme Networks — admin configuration screen'),
      image('Extreme 5.png', 'Extreme Networks — data visualisation panel'),
      image('Extreme 6.png', 'Extreme Networks — component documentation'),
    ],
  },
  {
    id: 'dell',
    company: 'Dell',
    images: [
      image('Dell 1.png', 'Dell — cloud networking management console'),
      image('Dell 2.png', 'Dell — monitoring dashboard'),
      image('Dell 3.png', 'Dell — enterprise admin flow'),
    ],
  },
]

/** Flat list in display order, so the lightbox can page across group boundaries. */
export const galleryImages = galleryGroups.flatMap(group => group.images)
