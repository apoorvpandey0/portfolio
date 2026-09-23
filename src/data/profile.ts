// Every piece of copy on the site lives here, so updating the portfolio
// means editing data, not components.
import bazaarHaatImg from '../assets/projects/bazaarhaat.webp'
import kisanSamadhanImg from '../assets/projects/kisansamadhan.webp'
import quizBanaoImg from '../assets/projects/quizbanao.webp'

export const profile = {
  name: 'Apoorv Pandey',
  role: 'Frontend Engineer',
  company: 'DP World',
  location: 'Bengaluru',
  email: 'apoorvpandey0@gmail.com',
  resume: '/Apoorv_Pandey_Resume.pdf',
  contactForm: 'https://getform.io/f/1e0e22fa-930a-4cdf-9b0a-24c82a8f927d',
  github: 'https://github.com/apoorvpandey0',
  linkedin: 'https://www.linkedin.com/in/apoorv-pandey/',
  tagline: 'Frontend engineer building customer-facing apps at scale.',
  summary:
    "Since 2022 I've shipped React applications that real customers use every day: health records and insights for 2 lakh+ users, a global care app in English and Arabic, and now enterprise ERP modules at DP World. I focus on what customers feel: speed, accessibility, and interfaces that hold up on every device.",
}

export type Stat = { value: string; label: string }

export const stats: Stat[] = [
  { value: '2L+', label: 'users on health dashboards I built' },
  { value: '1L+', label: 'documents a month through my GenAI viewer' },
  { value: '100K+', label: 'downloads on an app I built solo' },
  { value: '60%', label: 'faster product configuration after my redesign' },
]

export type Role = {
  company: string
  title: string
  period: string
  location: string
  // Wrap the numbers that matter in **double asterisks** to highlight them.
  highlights: string[]
}

export const experience: Role[] = [
  {
    company: 'DP World',
    title: 'Group Software Development Engineer 1, Frontend',
    period: 'Dec 2025 – Present',
    location: 'Bengaluru',
    highlights: [
      'Delivered **Purchase Orders, Quotations and Reports** for Phase 1 of an in-house ERP.',
      'Cut duplicated code by moving screens to a **config-driven** structure.',
    ],
  },
  {
    company: 'Bajaj Finserv Health',
    title: 'Software Development Engineer, Frontend',
    period: 'Jul 2022 – Dec 2025',
    location: 'Pune',
    highlights: [
      'Shipped **v23.2.2 of the Al-Koot global care app**: migrated to v2 APIs, built RTL-ready modules and fixed device-specific bugs.',
      'Redesigned product configuration with dynamic forms, cutting configuration time by **60%**.',
      'Built Smart Reports health insight dashboards for **2 lakh+ users**, lifting engagement by **25%**.',
      'Built a GenAI document viewer with summaries, smart highlights and previews, handling **1 lakh+ documents a month**.',
      'Created a library of **10+ reusable, accessible React components** used across modules.',
      'Took over a vendor-built portal, set up CI/CD, and shipped features **within two weeks**.',
      'Built agent-facing Health Saathi portal modules for handling customer complaints.',
      'Instrumented **40+ Firebase events across 6 journeys** to guide product decisions.',
    ],
  },
]

export const extras = [
  { label: 'Community', text: 'Co-lead, Google Developer Student Clubs UIT RGPV. Trained 1,000+ students (2019–2022).' },
  { label: 'Education', text: 'B.Tech, Information Technology, UIT RGPV Bhopal (2019–2023).' },
]

// Drawn covers for work that can't be shown publicly; real screenshots otherwise.
export type Cover = 'doc' | 'bars' | 'rtl'

export type Project = {
  name: string
  org: string
  summary: string
  facts: string[]
  wins: string[]
  cover: Cover | { image: string; alt: string }
  href?: string
  hrefLabel?: string
}

export const projects: Project[] = [
  {
    name: 'GenAI document viewer',
    org: 'Bajaj Finserv Health',
    summary: 'Turns prescriptions and lab reports into AI summaries, smart highlights and previews, so patients can trust what they read.',
    facts: ['React', 'GenAI + NLP'],
    wins: ['1L+ docs / month'],
    cover: 'doc',
  },
  {
    name: 'Smart Reports',
    org: 'Bajaj Finserv Health',
    summary: 'Pixel-perfect health insight dashboards, built to be accessible to every user.',
    facts: ['React', 'Accessibility'],
    wins: ['2L+ users', '+25% engagement'],
    cover: 'bars',
  },
  {
    name: 'Al-Koot global care app',
    org: 'Bajaj Finserv Health',
    summary: 'Production release v23.2.2: v2 API migration, RTL layouts for Arabic, and device-specific fixes.',
    facts: ['v2 APIs', 'RTL'],
    wins: ['Shipped to production'],
    cover: 'rtl',
  },
  {
    name: 'KisanSamadhan',
    org: 'Side project',
    summary: 'Real-time support and content for farmers. Built and maintained solo, from Flutter migration to Firebase.',
    facts: ['Flutter', 'Firebase'],
    wins: ['100K+ downloads'],
    cover: { image: kisanSamadhanImg, alt: 'KisanSamadhan app screens showing agricultural news in Hindi' },
    href: 'https://play.google.com/store/apps/details?id=com.kisansamadhan.kisansamadhan',
    hrefLabel: 'Play Store',
  },
  {
    name: 'BazaarHaat',
    org: 'Side project',
    summary: 'A multi-vendor e-commerce app with buyer and seller onboarding, a catalog for varied products and services, push notifications and an admin panel.',
    facts: ['Full stack', 'Push notifications'],
    wins: ['Open source'],
    cover: { image: bazaarHaatImg, alt: 'BazaarHaat storefront and admin panel on tablets' },
    href: 'https://github.com/apoorvpandey0/BazaarHaat',
    hrefLabel: 'GitHub',
  },
  {
    name: 'Quiz Banao',
    org: 'Side project',
    summary: 'An app for running live event quizzes, with quiz IDs for joining, timed questions and a live leaderboard.',
    facts: ['Live quizzes', 'Leaderboards'],
    wins: ['On Google Play'],
    cover: { image: quizBanaoImg, alt: 'Quiz Banao app screens with a leaderboard and a quiz question' },
    href: 'https://play.google.com/store/apps/details?id=com.quizbanao.app',
    hrefLabel: 'Play Store',
  },
]

export const coreSkills = ['React', 'TypeScript', 'WCAG 2.1 AA']

export const skills = [
  'React',
  'TypeScript',
  'JavaScript',
  'React Native',
  'Redux',
  'Tailwind CSS',
  'GraphQL',
  'Node.js',
  'Jest',
  'Webpack',
  'Docker',
  'WCAG 2.1 AA',
  'Firebase',
  'Shadcn UI',
  'CI/CD',
  'Flutter',
]
