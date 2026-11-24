/**
 * Project catalogue.
 *
 * ── How to add a project ────────────────────────────────────────────────────
 * Copy any object below and edit it. `slug` becomes the detail page URL
 * (`/projects/your-slug`), so keep it lowercase and unique.
 *
 * ── Link honesty ────────────────────────────────────────────────────────────
 * `repoUrl` and `demoUrl` are `null` until a real, working link exists. When a
 * value is null the UI shows a clearly disabled "not published yet" button
 * instead of a dead link or a fake deployment claim. Never put a placeholder
 * URL in here — put the real one, or leave it null.
 *
 * ── Copy honesty ────────────────────────────────────────────────────────────
 * The bullet lists describe what each build contains. Please read them once and
 * delete anything that does not match the actual project before you apply.
 */

export const projectFilters = [
  { id: 'all', label: 'All projects' },
  { id: 'react', label: 'React' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'tailwind', label: 'Tailwind CSS' },
  { id: 'mern', label: 'MERN' },
  { id: 'html-css', label: 'HTML & CSS' },
]

export const projects = [
  {
    slug: 'furniture-ecommerce',
    title: 'Furniture E-Commerce Website',
    tagline: 'A furniture storefront with a browsable catalogue and a working cart.',
    summary:
      'An e-commerce front end for furniture shopping: category browsing, product cards and a cart flow, built with reusable React components and Tailwind CSS.',
    overview: [
      'This project started as a way to practise turning a static layout into a real shopping interface. The catalogue is data-driven, so adding a product is a matter of extending one array rather than duplicating markup.',
      'The interesting part was the cart. Quantity changes, running totals and empty states all have to stay in sync across the page, which pushed me towards keeping cart state in one place instead of scattering it through components.',
      'Most of the work went into spacing, type hierarchy and making the grid behave on small screens — the parts of a storefront that quietly decide whether it feels trustworthy.',
    ],
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
    filters: ['react', 'javascript', 'tailwind', 'html-css'],
    features: [
      'Product catalogue with category grouping',
      'Reusable product card and section components',
      'Add-to-cart and quantity handling with a running total',
      'Responsive layout from mobile through to wide desktop',
      'Empty and loading states for the catalogue and cart',
    ],
    cover: 'furniture',
    status: 'Personal project',
    year: '2026',
    repoUrl: null,
    demoUrl: null,
  },
  {
    slug: 'mini-ecommerce',
    title: 'Mini E-Commerce Website',
    tagline: 'A compact full-stack shop built on the MERN stack.',
    summary:
      'A smaller commerce application covering the core shopping flows, with a React front end talking to an Express and MongoDB API over REST.',
    overview: [
      'The goal here was the other half of the story: instead of hard-coded product data, the interface reads from an API I wrote myself.',
      'The Express layer exposes REST endpoints for reading and managing products, with MongoDB and Mongoose handling persistence. On the client, React renders the catalogue and the cart while a small service layer keeps fetch logic out of components.',
      'Building both sides changed how I design components — knowing what the API returns makes it much easier to decide what the UI should own and what it should simply display.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    filters: ['mern', 'react', 'javascript'],
    features: [
      'REST API for product listing and management',
      'Mongoose models for product data',
      'React storefront with cart state',
      'Create, read, update and delete flows for products',
      'Environment-based configuration for the API URL',
    ],
    cover: 'mini-shop',
    status: 'Personal project',
    year: '2026',
    repoUrl: null,
    demoUrl: null,
  },
  {
    slug: 'admin-dashboard',
    title: 'Admin Dashboard',
    tagline: 'A control panel for reviewing and managing application data.',
    summary:
      'An administrative interface with a sidebar layout, data tables and forms for managing records, wired to a Node and Express backend.',
    overview: [
      'Dashboards are where design discipline matters most: a lot of information, almost no space, and no room for decoration that gets in the way.',
      'This build uses a fixed sidebar with a content area that scales from mobile to desktop, data tables for scanning records, and forms for editing them. Status is communicated with badges and colour rather than modal confirmations wherever possible.',
      'It was also my first serious pass at connecting a form-driven UI to REST endpoints, including validation, optimistic UI updates and error states.',
    ],
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    filters: ['react', 'mern', 'tailwind'],
    features: [
      'Responsive sidebar and content layout',
      'Data tables with searchable record lists',
      'Create and edit forms wired to REST endpoints',
      'Status badges and empty states',
      'Reusable table, modal and form primitives',
    ],
    cover: 'dashboard',
    status: 'Personal project',
    year: '2026',
    repoUrl: null,
    demoUrl: null,
  },
  {
    slug: 'attendance-system',
    title: 'Employee Attendance Management System',
    tagline: 'Daily attendance records with a reviewable monthly view.',
    summary:
      'An attendance tool for marking daily presence and reviewing records by employee and by month, built to practise relational-style data modelling in a web app.',
    overview: [
      'Attendance looks like a simple checkbox until you need history: who was present, on which day, and how does that add up over a month.',
      'The app keeps the marking flow fast — one action per employee per day — and moves the complexity into the review view, where records are grouped by date and summarised per person.',
      'This project taught me the most about date handling, edge cases and keeping a table readable when the data is dense.',
    ],
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'REST APIs'],
    filters: ['react', 'javascript', 'tailwind'],
    features: [
      'Daily attendance marking per employee',
      'Monthly review grouped by date and by employee',
      'Record editing with confirmation states',
      'Responsive tables that stay usable on mobile',
      'Reusable summary and status components',
    ],
    cover: 'attendance',
    status: 'Personal project',
    year: '2026',
    repoUrl: null,
    demoUrl: null,
  },
  {
    slug: 'developer-portfolio',
    title: 'Personal Developer Portfolio',
    tagline: 'This site — six pages, one design system, GSAP motion.',
    summary:
      'A six-page portfolio built with React, Vite, Tailwind CSS and GSAP, with dark and light themes, project filtering, dynamic project routes and per-page SEO metadata.',
    overview: [
      'The brief I set myself was simple: build something a recruiter can move through in two minutes without hitting a broken link or a dead button.',
      'Every page shares one design system — a token layer for colour and surfaces, a small set of components, and motion that stays out of the way. Routes are real URLs, so a shared link opens the right page directly.',
      'Project content lives in a single data file, which means adding a project is an object, not a refactor.',
    ],
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'React Router', 'GSAP'],
    filters: ['react', 'javascript', 'tailwind'],
    features: [
      'Six pages plus dynamic project detail routes',
      'Dark and light themes with no flash on load',
      'GSAP hero motion and scroll reveals',
      'Project filtering by technology',
      'Per-page titles, descriptions and Open Graph tags',
      'Custom 404 and accessible keyboard navigation',
    ],
    cover: 'portfolio',
    status: 'Live project',
    year: '2026',
    repoUrl: 'https://github.com/alamminhaz077-del/Minhaz-portfolio',
    demoUrl: null,
  },
]

export const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug)

export const getNextProject = (slug) => {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return null
  return projects[(index + 1) % projects.length]
}
