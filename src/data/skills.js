/**
 * Skills.
 *
 * Levels are deliberately qualitative — "Comfortable", "Working knowledge",
 * "Currently learning" — instead of percentage bars. Percentage proficiency is
 * unverifiable in an interview and recruiters know it, so the honest signal is
 * the one that survives being asked about out loud.
 */

export const levels = {
  comfortable: {
    label: 'Comfortable',
    short: 'Comfortable',
    description: 'Used regularly in my own builds without needing to look much up.',
    weight: 3,
  },
  working: {
    label: 'Working knowledge',
    short: 'Working',
    description: 'Used in real project work; still checking documentation for the edges.',
    weight: 2,
  },
  learning: {
    label: 'Currently learning',
    short: 'Learning',
    description: 'Actively studying and practising, not yet claiming production experience.',
    weight: 1,
  },
}

export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: 'monitor',
    blurb: 'Where most of my time goes — layout, components and interaction.',
    skills: [
      { name: 'HTML5', mark: 'H5', level: 'comfortable', color: '#e34f26', note: 'Semantic structure and accessible markup' },
      { name: 'CSS3', mark: 'CS', level: 'comfortable', color: '#2965f1', note: 'Flexbox, grid, transitions and responsive layout' },
      { name: 'JavaScript', mark: 'JS', level: 'comfortable', color: '#f7df1e', note: 'ES6+, array methods, async/await, DOM' },
      { name: 'React.js', mark: 'Re', level: 'comfortable', color: '#61dafb', note: 'Hooks, component composition, routing' },
      { name: 'Tailwind CSS', mark: 'TW', level: 'comfortable', color: '#38bdf8', note: 'Utility-first styling and design tokens' },
      { name: 'Bootstrap', mark: 'Bs', level: 'working', color: '#7952b3', note: 'Grid system and component library' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: 'server',
    blurb: 'The half I am actively building out, project by project.',
    skills: [
      { name: 'Node.js', mark: 'No', level: 'working', color: '#68a063', note: 'Modules, file structure, npm tooling' },
      { name: 'Express.js', mark: 'Ex', level: 'working', color: '#a1a1aa', note: 'Routing, middleware, error handling' },
      { name: 'REST APIs', mark: 'API', level: 'working', color: '#22d3ee', note: 'Designing endpoints and consuming them from React' },
      { name: 'JWT Authentication', mark: 'JWT', level: 'learning', color: '#f472b6', note: 'Token-based auth flows and protected routes' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    icon: 'database',
    blurb: 'Modelling data so the frontend stays simple.',
    skills: [
      { name: 'MongoDB', mark: 'Mg', level: 'working', color: '#4db33d', note: 'Collections, documents, queries' },
      { name: 'Mongoose', mark: 'Ms', level: 'working', color: '#b91c1c', note: 'Schemas, models and validation' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Technologies',
    icon: 'wrench',
    blurb: 'The daily workflow: write, review, build, ship.',
    skills: [
      { name: 'Git', mark: 'Git', level: 'working', color: '#f05032', note: 'Branching, commits, merge conflicts' },
      { name: 'GitHub', mark: 'GH', level: 'working', color: '#a78bfa', note: 'Remotes, pull requests, repository hygiene' },
      { name: 'VS Code', mark: 'VS', level: 'comfortable', color: '#007acc', note: 'Daily editor, extensions, debugging' },
      { name: 'Vite', mark: 'Vi', level: 'working', color: '#a855f7', note: 'Dev server, build config, environment variables' },
      { name: 'Cursor', mark: 'Cu', level: 'working', color: '#22d3ee', note: 'AI-assisted development and refactoring' },
      { name: 'GSAP', mark: 'Gs', level: 'learning', color: '#88ce02', note: 'Timelines and scroll-triggered motion' },
    ],
  },
]

/** Shown on the home page as a compact strip and on the skills page. */
export const learningNow = [
  { name: 'Node.js & Express', detail: 'Structuring APIs the way real teams do — routes, controllers, middleware.' },
  { name: 'MongoDB & Mongoose', detail: 'Schema design, relationships and query performance.' },
  { name: 'Authentication', detail: 'JWT flows, protected routes and sensible session handling.' },
  { name: 'GSAP animation', detail: 'Timelines that support a page instead of competing with it.' },
  { name: 'AI-assisted workflows', detail: 'Using AI tools to move faster without shipping code I cannot explain.' },
]

/** Small credibility strip under the hero. */
export const techStrip = [
  'React.js',
  'JavaScript',
  'Tailwind CSS',
  'Node.js',
  'Express.js',
  'MongoDB',
  'REST APIs',
  'Git',
  'Vite',
  'GSAP',
]
