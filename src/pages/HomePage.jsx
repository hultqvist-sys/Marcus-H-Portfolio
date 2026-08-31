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
export default function HomePage() {
  return (
    <main className="w-full px-6">
      <div className="mx-auto w-full max-w-grid flex flex-col items-center gap-40 pb-40">
        <div className="w-full flex flex-col gap-20">
          <Cover />
          <About />
        </div>

        <Companies />

        <SectionDivider />

        <LearningHighlights />

        <SectionDivider />

        <Gamification />

        <SectionDivider />

        <LiveTraining />

        <SectionDivider />

        <Gallery />

        <SectionDivider />

        <Contact />
      </div>
    </main>
  )
}
