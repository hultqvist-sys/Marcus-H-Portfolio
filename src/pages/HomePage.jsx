import Cover from '../components/Cover'
import About from '../components/About'
import Companies from '../components/Companies'
import LearningHighlights from '../components/LearningHighlights'
import Gamification from '../components/Gamification'
import LiveTraining from '../components/LiveTraining'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'
import SectionDivider from '../components/SectionDivider'

/**
 * The standardised 1104px content grid lives here and nowhere else — sections
 * are plain `w-full` blocks so there's a single place to change the measure.
 *
 * Figma root frame 317:11161: 1104 wide, column, centred, 160px between
 * sections. Cover and About are one 80px-gap group inside that rhythm.
 */
/**
 * A rule tied to the section it introduces: the full 160px rhythm stays above
 * the rule, but only 32px below it, so it reads as the opening of the block
 * rather than floating midway between two.
 *
 * Each section has to be a single element for this to work — a fragment of
 * siblings would take the 32px gap between its own blocks too.
 */
function SectionOpener({ children }) {
  return (
    <div className="w-full flex flex-col gap-8">
      <SectionDivider />
      {children}
    </div>
  )
}

export default function HomePage() {
  return (
    // The page's only horizontal gutter — 16px on a phone, 24px from md up.
    // PANEL_BLEED cancels it out for full-bleed media, so the two have to stay
    // in step.
    <main className="w-full px-4 md:px-6">
      <div className="mx-auto w-full max-w-grid flex flex-col items-center gap-40 pb-40">
        <div className="w-full flex flex-col gap-20">
          <Cover />
          <About />
        </div>

        <Companies />

        <SectionOpener>
          <LearningHighlights />
        </SectionOpener>

        <SectionOpener>
          <Gamification />
        </SectionOpener>

        <SectionOpener>
          <LiveTraining />
        </SectionOpener>

        <SectionOpener>
          <Gallery />
        </SectionOpener>

        <SectionDivider />

        <Contact />
      </div>
    </main>
  )
}
