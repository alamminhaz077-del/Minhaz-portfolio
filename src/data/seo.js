import { siteUrl } from './site.js'
import { getProjectBySlug, projects } from './projects.js'

/**
 * Per-page metadata. Used twice:
 *  1. in the browser by `<Seo />`, which updates the document head on navigation;
 *  2. at build time by `scripts/prerender-meta.mjs`, which writes a real HTML
 *     file per route so crawlers and link previews see the right tags.
 *
 * Keep this file free of JSX and browser APIs — the build script imports it.
 */

const brand = 'Minhaz Alam'

export const defaultOgImage = '/og-image.png'

export const seoByPath = {
  '/': {
    title: `${brand} — Full Stack & MERN Stack Developer`,
    description:
      'Portfolio of Minhaz Alam, a Full Stack and MERN Stack developer in Delhi NCR building responsive React interfaces with Node.js, Express and MongoDB.',
  },
  '/about': {
    title: `About ${brand} — Developer, learner, problem solver`,
    description:
      'The story behind the code: Minhaz Alam on his BCA background, the move from HTML and CSS into React, learning the MERN backend, and where he wants to go next.',
  },
  '/projects': {
    title: `Projects — ${brand} | React & MERN builds`,
    description:
      'Selected projects by Minhaz Alam: a furniture e-commerce storefront, a MERN mini shop, an admin dashboard, an attendance system and this portfolio itself.',
  },
  '/skills': {
    title: `Skills — ${brand} | React, Node & MongoDB`,
    description:
      'An honest breakdown of Minhaz Alam’s stack: frontend with HTML, CSS, JavaScript and React; backend with Node, Express and REST APIs; MongoDB, Git and Vite.',
  },
  '/experience': {
    title: `Experience — ${brand} | Internship & BCA`,
    description:
      'Minhaz Alam’s Web Development Internship at KodeToCareer in Noida, his BCA at Maharshi Dayanand University, and the learning that connects them.',
  },
  '/contact': {
    title: `Contact ${brand} — Hire a React developer`,
    description:
      'Get in touch with Minhaz Alam about frontend, React, JavaScript or MERN stack opportunities. Email, phone and LinkedIn, plus a direct message form.',
  },
  '/404': {
    title: `Page not found — ${brand}`,
    description: 'This page does not exist. Head back to the portfolio home page.',
    noindex: true,
  },
}

export const getSeoForPath = (pathname) => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  if (seoByPath[clean]) return { ...seoByPath[clean], path: clean }

  const projectMatch = clean.match(/^\/projects\/([^/]+)$/)
  if (projectMatch) {
    const project = getProjectBySlug(projectMatch[1])
    if (project) {
      return {
        title: `${project.title} — ${brand}`,
        description: project.summary,
        path: clean,
      }
    }
  }

  return { ...seoByPath['/404'], path: clean }
}

/** Every route that should get a static HTML file at build time. */
export const staticRoutes = [
  ...Object.keys(seoByPath).filter((path) => path !== '/404'),
  ...projects.map((project) => `/projects/${project.slug}`),
]

export const absoluteUrl = (path = '/') => `${siteUrl.replace(/\/$/, '')}${path === '/' ? '/' : path}`
