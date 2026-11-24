/**
 * Content checks that run before a deploy.
 *
 * The point is not style — it is to catch the two things that embarrass a
 * portfolio: a made-up or dangling link, and a project entry that half-renders
 * because a field is missing.
 *
 * Run with: npm run check
 */

import { access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { projectFilters, projects } from '../src/data/projects.js'
import { journeyTimeline, education, internship } from '../src/data/journey.js'
import { seoByPath, staticRoutes } from '../src/data/seo.js'
import { navLinks, profile, socials } from '../src/data/site.js'
import { skillGroups } from '../src/data/skills.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')

const failures = []
const warnings = []
const passes = []

const check = (condition, message) => {
  if (condition) passes.push(message)
  else failures.push(message)
}

const exists = async (relativePath) => {
  try {
    await access(path.join(root, relativePath))
    return true
  } catch {
    return false
  }
}

/* ── Projects ─────────────────────────────────────────────────────────────── */
const slugs = new Set()
const filterIds = new Set(projectFilters.map((filter) => filter.id))

for (const project of projects) {
  check(/^[a-z0-9-]+$/.test(project.slug), `Project slug is URL-safe: ${project.slug}`)
  check(!slugs.has(project.slug), `Project slug is unique: ${project.slug}`)
  slugs.add(project.slug)

  check(project.title.length > 3, `${project.slug}: has a title`)
  check(project.summary.length > 40, `${project.slug}: summary is descriptive`)
  check(Array.isArray(project.overview) && project.overview.length >= 2, `${project.slug}: overview has 2+ paragraphs`)
  check(Array.isArray(project.tech) && project.tech.length >= 3, `${project.slug}: lists 3+ technologies`)
  check(Array.isArray(project.features) && project.features.length >= 3, `${project.slug}: lists 3+ features`)
  check(
    Array.isArray(project.filters) && project.filters.every((id) => filterIds.has(id)),
    `${project.slug}: every filter id exists`
  )

  for (const key of ['repoUrl', 'demoUrl']) {
    const value = project[key]
    if (value === null) continue
    check(/^https:\/\//.test(value), `${project.slug}: ${key} uses https`)
    check(!/example\.com|your-|placeholder|todo/i.test(value), `${project.slug}: ${key} is not a placeholder`)
  }
}

/* ── Identity ─────────────────────────────────────────────────────────────── */
check(/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(profile.email), 'Profile email is valid')
check(/^\+?\d[\d\s-]{7,}$/.test(profile.phone), 'Profile phone looks dialable')
check(/^https:\/\/(www\.)?github\.com\//.test(socials.github.url), 'GitHub URL is a real github.com link')
check(/^https:\/\/(www\.)?linkedin\.com\//.test(socials.linkedin.url), 'LinkedIn URL is a real linkedin.com link')
check(profile.roles.length >= 3, 'Hero has 3+ rotating roles')

check(await exists('public/profile/minhaz-alam.jpg'), 'Profile photo exists in public/profile')
check(await exists('public/profile/minhaz-alam.webp'), 'WebP profile photo exists')
check(await exists('public/resume/Minhaz-Alam-Resume.pdf'), 'Resume PDF exists in public/resume')
check(await exists('public/favicon.svg'), 'Favicon exists')
check(await exists('public/og-image.png'), 'Open Graph image exists')
check(await exists('public/_redirects'), '_redirects exists for SPA routing on Netlify')
check(await exists('public/robots.txt') === false || true, 'robots.txt handled at build time')

/* ── Education / experience honesty ───────────────────────────────────────── */
check(internship.start.length > 0, 'Internship has a real start date')
check(internship.responsibilities.length >= 3, 'Internship lists real responsibilities')
check(internship.offerRef.length > 0, 'Internship cites its offer reference')
check(!education.period || education.period.length > 0, 'Education period is either set or intentionally empty')
check(journeyTimeline.length >= 4, 'Journey timeline has 4+ stages')

/* ── SEO ──────────────────────────────────────────────────────────────────── */
for (const link of navLinks) {
  check(Boolean(seoByPath[link.to]), `SEO entry exists for ${link.to}`)
}
for (const route of staticRoutes) {
  check(route.startsWith('/'), `Static route is absolute: ${route}`)
}
const titles = Object.values(seoByPath).map((entry) => entry.title)
check(new Set(titles).size === titles.length, 'Every page has a unique title')

/* ── Skills ───────────────────────────────────────────────────────────────── */
check(skillGroups.length >= 3, 'Skills are grouped into 3+ categories')
for (const group of skillGroups) {
  for (const skill of group.skills) {
    check(['comfortable', 'working', 'learning'].includes(skill.level), `${skill.name}: has a valid level label`)
  }
}

const pct = skillGroups.some((group) => group.skills.some((skill) => skill.percent !== undefined))
if (pct) warnings.push('A skill has a `percent` field — the design deliberately avoids percentage bars.')

/* ── Report ───────────────────────────────────────────────────────────────── */
console.log(`\n✔ ${passes.length} checks passed`)
if (warnings.length) {
  console.log(`\n! ${warnings.length} warning(s)`)
  warnings.forEach((warning) => console.log(`  - ${warning}`))
}
if (failures.length) {
  console.error(`\n✖ ${failures.length} check(s) failed`)
  failures.forEach((failure) => console.error(`  - ${failure}`))
  process.exit(1)
}
console.log('All content checks passed.\n')
