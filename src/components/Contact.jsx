import { motion } from 'framer-motion'

/**
 * Closing "get in touch" section (Figma 317:20117).
 *
 * The Figma frame is 824 wide inside the 1104 grid, so the block is capped and
 * left-aligned rather than filling the measure — no mx-auto, matching how the
 * Learning highlights captions sit.
 */

const ICON_DIR = '/assets/images/icons'

/**
 * `download` is only honoured same-origin, which the PDF is — it's served out of
 * public/. Without it the browser would navigate to the file and let its own PDF
 * viewer take over instead of saving it.
 */
const LINKS = [
  {
    id: 'email',
    icon: `${ICON_DIR}/Mail.svg`,
    label: 'Hultqvist40@gmail.com',
    href: 'mailto:Hultqvist40@gmail.com',
  },
  {
    id: 'linkedin',
    icon: `${ICON_DIR}/Linkedin.svg`,
    label: 'Linkedin',
    href: 'https://www.linkedin.com/in/marcus-hultqvist-413b87119/',
    external: true,
  },
  {
    id: 'resume',
    icon: `${ICON_DIR}/Resume.svg`,
    label: 'Resume',
    href: '/assets/docs/Marcus-Hultqvist-Resume.pdf',
    download: 'Marcus-Hultqvist-Resume.pdf',
  },
]

const LINK_CLASS =
  'group inline-flex items-center gap-2 self-start rounded-sm ' +
  'transition-opacity duration-200 hover:opacity-70 ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ' +
  'focus-visible:outline-[#1558BC]'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export default function Contact() {
  return (
    <section className="w-full">
      <motion.div
        className="w-full max-w-[824px] flex flex-col gap-[72px]"
        {...fadeUp}
      >
        {/* Sign-off */}
        <div className="w-full flex flex-col gap-4">
          <h2 className="font-display font-semibold text-h1 text-black">
            Thanks for visiting!
          </h2>
          <p className="font-body text-body-lg font-normal text-[#292A2E]">
            Let’s get in touch
          </p>
        </div>

        {/* Portrait beside the contact list; stacks below lg */}
        <div className="w-full flex flex-col lg:flex-row lg:items-center gap-12">
          <img
            src="/assets/images/profile.svg"
            alt="Marcus Hultqvist"
            width={400}
            height={500}
            className="w-full max-w-[400px] h-auto shrink-0"
          />

          <div className="w-full flex flex-col gap-4">
            <h3 className="font-display font-semibold text-h3 text-[#1558BC]">
              Contact
            </h3>

            <ul className="w-full flex flex-col gap-2">
              {LINKS.map(link => (
                <li key={link.id} className="flex">
                  <a
                    href={link.href}
                    className={LINK_CLASS}
                    {...(link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    {...(link.download ? { download: link.download } : {})}
                  >
                    <img
                      src={link.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="w-6 h-6 shrink-0"
                    />
                    <span className="font-body text-body-reg font-normal text-[#292A2E]">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
