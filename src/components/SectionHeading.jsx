import { motion } from 'framer-motion'

/**
 * The two-column heading used by each numbered case study (Figma layout_PEHYRI):
 * a fixed 544px title beside a filling body column. Stacks on narrow screens.
 *
 * `title` accepts an array of lines so the "01." / heading split in the Figma
 * survives without hardcoding <br> tags in the copy.
 */
export default function SectionHeading({ title, body }) {
  const lines = Array.isArray(title) ? title : [title]
  const paragraphs = Array.isArray(body) ? body : [body]

  return (
    <motion.div
      className="w-full flex flex-col lg:flex-row gap-4"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h3 className="w-full lg:w-[544px] lg:shrink-0 font-display font-normal text-h2 text-black">
        {/* First line is the "01." marker — bold and accented against the
            headline, which stays regular weight. Size and family come from the
            h3 (Chivo 32) so the two lines share a baseline grid. */}
        {lines.map((line, index) => (
          <span
            key={line}
            className={index === 0 ? 'block font-bold text-[#E56E00]' : 'block'}
          >
            {line}
          </span>
        ))}
      </h3>

      <div className="w-full flex flex-col gap-4">
        {paragraphs.map(paragraph => (
          <p
            key={paragraph.slice(0, 40)}
            className="font-body text-body-base font-normal text-[#292A2E]"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  )
}
