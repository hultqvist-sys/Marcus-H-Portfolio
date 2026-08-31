/**
 * Companies shown in the "Some of companies I've worked with..." section.
 *
 * ── ADDING A COMPANY ────────────────────────────────────────────────────────
 *
 * shortBlurb       Collapsed card. Clamped to two lines in a ~180px column,
 *                  so keep it to a few words.
 * longBlurb        Expanded card. Roughly 140-160 characters; much more than
 *                  that and it overflows the card.
 * expandedImage    Drop the file into `public/assets/images/company images/`.
 *                  While this is null the card expands with a solid
 *                  `placeholderColor` background instead of looking broken.
 * logoLight        Optional. A white version of the logo, used only on the
 *                  expanded card. Set it when the default logo is dark enough
 *                  to disappear against the expanded image.
 *
 * Nothing else needs changing — no component edits required.
 * ────────────────────────────────────────────────────────────────────────────
 */

const LOGO_DIR = '/assets/images/company images'

export const companies = [
  {
    id: 'atlassian',
    name: 'Atlassian',
    logo: `${LOGO_DIR}/Atlassian logo.svg`,
    shortBlurb: 'Learning education and data security.',
    longBlurb:
      'Led design for learning and community at Atlassian, defining UX across platform migrations, live training, and scalable event discovery.',
    expandedImage: `${LOGO_DIR}/Atlassian expanded.png`,
    placeholderColor: '#1D3B6E',
  },
  {
    id: 'volvo',
    name: 'Volvo',
    logo: `${LOGO_DIR}/Volvo logo.svg`,
    // The default wordmark is dark, and the expanded card is not.
    logoLight: `${LOGO_DIR}/Volvo_light logo.svg`,
    shortBlurb: 'In-car design & wireless charging',
    longBlurb:
      'Working with engineers I designed a wireless charging app for the Volvo car, which then launched at the start of 2022.',
    expandedImage: `${LOGO_DIR}/Volvo expanded.png`,
    placeholderColor: '#1F3A4D',
  },
  {
    id: 'dell',
    name: 'Dell',
    logo: `${LOGO_DIR}/Dell logo.svg`,
    logoLight: `${LOGO_DIR}/Dell_light_logo.svg`,
    shortBlurb: 'Cloud networking management tools',
    longBlurb:
      'Integrated into Dell’s hybrid-cloud solutions team and designed their new cloud server management software.',
    expandedImage: `${LOGO_DIR}/Dell expanded.png`,
    placeholderColor: '#123A5C',
  },
  {
    id: 'att',
    name: 'AT&T',
    logo: `${LOGO_DIR}/ATT logo.svg`,
    logoLight: `${LOGO_DIR}/ATT_light_logo.svg`,
    shortBlurb: 'UX & research for cybersecurity app',
    longBlurb:
      'Spearheaded focus group testing and analysis to design and validate updates to AT&T’s cybersecurity platform.',
    expandedImage: `${LOGO_DIR}/ATT expanded.png`,
    placeholderColor: '#0F4C81',
  },
  {
    id: 'extreme',
    name: 'Extreme Networks',
    logo: `${LOGO_DIR}/Extreme networks logo.svg`,
    shortBlurb: 'Defining & building design systems',
    longBlurb:
      'Drove the design and adoption strategy for Extreme’s net-new core components.',
    expandedImage: `${LOGO_DIR}/Extreme expanded.png`,
    placeholderColor: '#3B2A63',
  },
]
