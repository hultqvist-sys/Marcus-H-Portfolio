import Carousel from './Carousel'
import SectionHeading from './SectionHeading'

export default function LiveTraining() {
  return (
    <section className="w-full flex flex-col gap-20">
      <SectionHeading
        title={['03.', 'Atlassian Live Training Migration: From Legacy Platform to ALP']}
        body={[
          "As design lead on this project, I drove the end-to-end UX for migrating Atlassian's live training off our legacy platform onto the new Atlassian Learning Platform (ALP). This spanned early research synthesis, ILT enrollment flows, session and course page design, and calendar invite functionality.",
          'After launch, I also led the initiative to centralize all Atlassian events into our calendar and scale the experience from a handful of events to hundreds, redesigning patterns to handle the increased volume without sacrificing usability.',
        ]}
      />
      <Carousel />
    </section>
  )
}
