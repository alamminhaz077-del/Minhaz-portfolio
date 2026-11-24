/**
 * Experience, education and the learning journey.
 *
 * Dates and titles here come from the KodeToCareer offer letter
 * (KTC-OFF-2026-0147) and the resume. Anything that is genuinely unknown —
 * the graduation year, for example — is left as an empty string and simply not
 * rendered, rather than being filled with a plausible-looking guess.
 *
 * Fill `education.period` once you are happy to publish the year, and add
 * certifications to the array below when you have them.
 */

export const internship = {
  organisation: 'KodeToCareer',
  role: 'Web Development Intern',
  employment: 'Full-time internship',
  workMode: 'On-site / Hybrid',
  location: 'Noida, India',
  start: 'Oct 2026',
  end: 'Present',
  period: 'Oct 2026 — Present',
  offerRef: 'KTC-OFF-2026-0147',
  summary:
    'A full-time internship on real client-facing web and SaaS work, alongside the product and technology team. This is where classroom fundamentals meet deadlines, reviews and code someone else has to read.',
  responsibilities: [
    'Contributing to real-world web development projects as part of the product and technology team.',
    'Building and extending website and SaaS features alongside the team.',
    'Supporting the development of data-driven insights and presentations for ongoing project work.',
    'Collaborating on planning, development and review of project work.',
    'Applying core web development concepts — HTML5, CSS3, JavaScript (ES6+) and React.js — to practical tasks.',
  ],
  stack: ['React.js', 'JavaScript (ES6+)', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
  learning: [
    'Reading and contributing to an existing codebase instead of starting from a blank folder.',
    'Reviewing work against a brief, then iterating on feedback.',
    'Working to a production rhythm: tasks, check-ins, revisions.',
  ],
}

export const education = {
  degree: 'Bachelor of Computer Applications (BCA)',
  shortName: 'BCA',
  institution: 'Maharshi Dayanand University (MDU)',
  location: 'Haryana, India',
  /** Left blank on purpose — add the years when you want them public. */
  period: '',
  status: 'Graduated',
  summary:
    'A three-year undergraduate programme covering programming fundamentals, data structures, database management and software engineering — the base I have been building on since.',
  highlights: [
    'Programming fundamentals and problem solving',
    'Database management and query languages',
    'Software engineering and application development',
    'Web technologies, which is the part I kept returning to',
  ],
}

/** Narrative timeline for the About page. No invented dates — stages, not milestones. */
export const journeyTimeline = [
  {
    step: '01',
    label: 'Foundation',
    title: 'Curiosity about how pages are built',
    body:
      'I started by inspecting websites to see how they were put together, then rebuilt what I saw with plain HTML and CSS. The first layout that held together on a phone was more satisfying than it should have been.',
  },
  {
    step: '02',
    label: 'Education',
    title: 'BCA at Maharshi Dayanand University',
    body:
      'A computer applications degree gave the curiosity a structure: programming fundamentals, databases, software engineering and the vocabulary to describe problems properly instead of just fixing symptoms.',
  },
  {
    step: '03',
    label: 'Frontend',
    title: 'From static layouts to component-driven React',
    body:
      'JavaScript ES6+ changed how I thought about interaction, and React changed how I thought about structure. Building with reusable components and Tailwind CSS made me faster and, more importantly, made my code easier to come back to.',
  },
  {
    step: '04',
    label: 'Backend',
    title: 'Learning the other half of the stack',
    body:
      'A frontend that invents its own data only goes so far. So I started building the API too — Express routes, REST conventions, Mongoose models and MongoDB collections — and began to see why good data modelling makes the UI simpler.',
  },
  {
    step: '05',
    label: 'AI',
    title: 'Interest in AI-powered applications',
    body:
      'Using AI tools while learning taught me to move faster and check harder. The applications I find most interesting are the ones where a model removes real friction from a task rather than being the feature itself.',
  },
  {
    step: '06',
    label: 'Now',
    title: 'Web Development Intern at KodeToCareer',
    body:
      'A full-time internship on real web and SaaS projects with the product and technology team — deadlines, reviews and feedback from people who ship software for a living.',
  },
]

/** Career direction, stated plainly. */
export const careerGoals = [
  {
    title: 'Ship production frontend work',
    body: 'Join a team building real products as a frontend, React or MERN stack developer, and own features from ticket to release.',
  },
  {
    title: 'Get genuinely good at the backend',
    body: 'Move from "can build an API" to "can design one that holds up" — schema design, auth, validation and testing.',
  },
  {
    title: 'Build AI features that earn their place',
    body: 'Learn how to integrate models into applications where they solve an actual user problem, with sensible fallbacks.',
  },
]

/** Add entries as `{ title, issuer, year, credentialId, url }` — empty is the honest default. */
export const certifications = []

/** Self-directed learning, distinct from the internship. */
export const selfStudy = [
  {
    title: 'Frontend specialisation',
    topics: ['JavaScript ES6+', 'React.js', 'Tailwind CSS', 'Responsive design'],
    note: 'Documentation-led learning, then rebuilds of interfaces I liked to understand why they worked.',
  },
  {
    title: 'MERN stack fundamentals',
    topics: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs'],
    note: 'Applied by completing full-stack builds rather than stopping at tutorials.',
  },
  {
    title: 'Working practice',
    topics: ['Git & GitHub', 'Vite', 'Component architecture', 'Debugging'],
    note: 'Version control and project structure treated as part of the skill, not an afterthought.',
  },
]

/** Reusable summary numbers for the experience page. */
export const experienceFacts = [
  { label: 'Internship', value: 'KodeToCareer' },
  { label: 'Role', value: 'Web Development Intern' },
  { label: 'Since', value: 'Oct 2026' },
  { label: 'Education', value: 'BCA · MDU' },
]
