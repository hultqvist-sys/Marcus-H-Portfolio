import { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox'
import { TILE_ASPECT, galleryImages } from '../data/gallery'

/**
 * Tiles lift and scale ~10% on hover. `z-10` is load-bearing: without it a
 * scaled tile is painted under its later siblings and the growth gets clipped.
 */
const TILE_CLASS =
  'group relative block w-full rounded-[11px] overflow-hidden bg-[#F0F1F2] ' +
  'transition-[transform,box-shadow] duration-300 ease-out will-change-transform ' +
  'hover:z-10 hover:-translate-y-1 hover:scale-110 ' +
  'hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.28)] ' +
  'focus-visible:z-10 focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-[#1558BC]'

export default function Gallery() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  return (
    <section className="w-full flex flex-col gap-20">
      <motion.div
        className="w-full flex flex-col lg:flex-row gap-8"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="w-full lg:w-[514px] lg:shrink-0 font-display font-normal text-h2 text-black">
          Sample highlights gallery
        </h2>
        <p className="w-full font-body text-body-base font-normal text-[#292A2E]">
          Below is a sample of highlight screens that i've designed and led
          projects for across my career within multiple enterprise and startup
          teams.
        </p>
      </motion.div>

      {/* One continuous grid over every image in company order — groups share
          rows rather than each starting a fresh one, so there are no ragged
          trailing gaps. Company is still conveyed by each tile's alt text.
          Two columns until md, where four would be ~133px each.

          Deviates from Figma (three 346.28 columns, 32.58 apart, with 49.92
          between groups): four columns on the same 1104 measure with a uniform
          20px gutter, so tiles land at 261px square. 12px on a phone, where
          20px between 164px tiles reads as too loose. */}
      <div
        // Literal classes on purpose: Tailwind generates utilities by scanning
        // source text, so an interpolated column count or gap is never emitted.
        className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5"
      >
        {galleryImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={TILE_CLASS}
            style={{ aspectRatio: TILE_ASPECT }}
            onClick={() => setExpandedIndex(index)}
            aria-label={`Expand: ${image.alt}`}
          >
            <img
              src={image.thumb}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <Lightbox
        images={galleryImages}
        index={expandedIndex}
        onClose={() => setExpandedIndex(null)}
        onNavigate={setExpandedIndex}
      />
    </section>
  )
}
