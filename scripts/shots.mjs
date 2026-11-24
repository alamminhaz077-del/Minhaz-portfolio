/**
 * Visual review captures.
 *
 * Uses viewport screenshots after scrolling to a section, not element
 * screenshots: element captures in headless Chrome re-render with a clip and
 * silently drop absolutely positioned children, which produces phantom bugs.
 *
 * Usage: node scripts/shots.mjs
 */

import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const here = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(here, '..', '..', '.zwork', 'derived', 'shots')
const BASE = process.env.VERIFY_BASE || 'http://localhost:4173'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const forceReveal = (page) =>
  page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.dataset.visible = 'true'
      el.style.transitionDelay = '0ms'
    })
  })

const scrollTo = async (page, selector, offset = 88) => {
  const ok = await page.evaluate(
    (sel, off) => {
      const el = document.querySelector(sel)
      if (!el) return false
      const top = el.getBoundingClientRect().top + window.scrollY - off
      window.scrollTo({ top: Math.max(0, top), behavior: 'instant' })
      return true
    },
    selector,
    offset
  )
  if (!ok) console.log(`  (selector not found: ${selector})`)
  await sleep(700)
  return ok
}

const main = async () => {
  await mkdir(OUT, { recursive: true })
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--force-color-profile=srgb', '--font-render-hinting=none'],
  })

  const shot = async (page, name) => {
    await page.screenshot({ path: path.join(OUT, `${name}.png`) })
    console.log(`shot ${name}`)
  }

  const desktop = await browser.newPage()
  await desktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })

  await desktop.goto(`${BASE}/`, { waitUntil: 'networkidle2' })
  await desktop.evaluate(() => document.fonts?.ready)
  await sleep(2200)
  await shot(desktop, '01-hero')

  await forceReveal(desktop)
  await scrollTo(desktop, 'main section:nth-of-type(2)')
  await shot(desktop, '02-featured')

  await scrollTo(desktop, 'main section:nth-of-type(2) article:nth-of-type(2)')
  await shot(desktop, '03-card')

  await scrollTo(desktop, 'main section:nth-of-type(3)')
  await shot(desktop, '04-skills-snapshot')

  await scrollTo(desktop, 'main section:nth-of-type(4)')
  await shot(desktop, '05-about-snapshot')

  await scrollTo(desktop, 'main section:nth-of-type(5)')
  await shot(desktop, '06-cta')

  await desktop.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await sleep(700)
  await shot(desktop, '07-footer')

  await desktop.goto(`${BASE}/projects`, { waitUntil: 'networkidle2' })
  await sleep(1200)
  await forceReveal(desktop)
  await shot(desktop, '10-projects-top')
  await scrollTo(desktop, 'main section:nth-of-type(2)')
  await shot(desktop, '11-projects-grid')

  await desktop.goto(`${BASE}/skills`, { waitUntil: 'networkidle2' })
  await sleep(1200)
  await forceReveal(desktop)
  await shot(desktop, '12-skills-top')
  await scrollTo(desktop, '#frontend')
  await shot(desktop, '13-skills-frontend')

  await desktop.goto(`${BASE}/experience`, { waitUntil: 'networkidle2' })
  await sleep(1200)
  await forceReveal(desktop)
  await shot(desktop, '14-experience-top')
  await scrollTo(desktop, '#internship-heading')
  await shot(desktop, '15-internship')

  await desktop.goto(`${BASE}/contact`, { waitUntil: 'networkidle2' })
  await sleep(1200)
  await forceReveal(desktop)
  await shot(desktop, '16-contact-top')
  await scrollTo(desktop, 'form')
  await shot(desktop, '17-contact-form')

  await desktop.goto(`${BASE}/about`, { waitUntil: 'networkidle2' })
  await sleep(1200)
  await forceReveal(desktop)
  await shot(desktop, '18-about-top')
  await scrollTo(desktop, '#journey-heading')
  await shot(desktop, '19-about-timeline')

  await desktop.goto(`${BASE}/projects/furniture-ecommerce`, { waitUntil: 'networkidle2' })
  await sleep(1200)
  await forceReveal(desktop)
  await shot(desktop, '20-project-detail')

  await desktop.goto(`${BASE}/nope`, { waitUntil: 'networkidle2' })
  await sleep(1000)
  await shot(desktop, '21-not-found')

  // Light mode
  await desktop.evaluateOnNewDocument(() => localStorage.setItem('mz-theme', 'light'))
  await desktop.goto(`${BASE}/`, { waitUntil: 'networkidle2' })
  await sleep(2200)
  await shot(desktop, '30-light-hero')
  await forceReveal(desktop)
  await scrollTo(desktop, 'main section:nth-of-type(2)')
  await shot(desktop, '31-light-featured')
  await scrollTo(desktop, 'main section:nth-of-type(4)')
  await shot(desktop, '32-light-about')

  await desktop.goto(`${BASE}/skills`, { waitUntil: 'networkidle2' })
  await sleep(1200)
  await forceReveal(desktop)
  await shot(desktop, '33-light-skills')

  await desktop.evaluateOnNewDocument(() => localStorage.setItem('mz-theme', 'dark'))
  await desktop.close()

  // Mobile
  const mobile = await browser.newPage()
  await mobile.evaluateOnNewDocument(() => localStorage.setItem('mz-theme', 'dark'))
  await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 })
  await mobile.goto(`${BASE}/`, { waitUntil: 'networkidle2' })
  await sleep(2200)
  await shot(mobile, '40-mobile-hero')

  await forceReveal(mobile)
  await scrollTo(mobile, 'main section:nth-of-type(2)', 60)
  await shot(mobile, '41-mobile-featured')

  await mobile.goto(`${BASE}/projects`, { waitUntil: 'networkidle2' })
  await sleep(1400)
  await forceReveal(mobile)
  await shot(mobile, '42-mobile-projects')
  await scrollTo(mobile, 'main section:nth-of-type(2)', 60)
  await shot(mobile, '43-mobile-projects-grid')

  await mobile.goto(`${BASE}/contact`, { waitUntil: 'networkidle2' })
  await sleep(1400)
  await forceReveal(mobile)
  await scrollTo(mobile, 'form', 60)
  await shot(mobile, '44-mobile-contact')

  await mobile.goto(`${BASE}/`, { waitUntil: 'networkidle2' })
  await sleep(1500)
  await mobile.click('button[aria-label="Open menu"]')
  await sleep(700)
  await shot(mobile, '45-mobile-menu')

  await mobile.close()
  await browser.close()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
