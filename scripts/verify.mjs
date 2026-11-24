/**
 * Browser verification for the built site.
 *
 * Requires `npm run preview` (or any static server) on VERIFY_BASE.
 * Uses the locally installed Chrome through puppeteer-core — no browser
 * download needed.
 *
 * What it checks, per route:
 *   • no console errors / uncaught exceptions
 *   • <title> matches the SEO table
 *   • exactly one <h1>
 *   • every <img> actually decoded
 *   • no horizontal overflow at the current viewport
 *   • every internal link resolves over HTTP
 * Plus a few real interactions: theme toggle, project filter, contact
 * validation, mobile menu, and the 404 route.
 *
 * Usage: node scripts/verify.mjs
 */

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

import { getSeoForPath } from '../src/data/seo.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(here, '..', '..', '.zwork', 'derived', 'verify')
const BASE = process.env.VERIFY_BASE || 'http://localhost:4173'

const CHROME_CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const results = []
const record = (name, ok, detail = '') => {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}

const autoScroll = (page) =>
  page.evaluate(async () => {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    const step = Math.round(window.innerHeight * 0.75)
    let y = 0
    const max = document.body.scrollHeight
    while (y < max) {
      window.scrollTo(0, y)
      await wait(110)
      y += step
    }
    window.scrollTo(0, document.body.scrollHeight)
    await wait(500)
    window.scrollTo(0, 0)
    await wait(600)
  })

const collectErrors = (page, bucket) => {
  page.on('console', (message) => {
    if (message.type() === 'error') bucket.push(`console: ${message.text()}`)
  })
  page.on('pageerror', (error) => bucket.push(`pageerror: ${error.message}`))
  page.on('requestfailed', (request) => {
    const url = request.url()
    if (url.startsWith('http://localhost') || url.startsWith('http://127.0.0.1')) {
      bucket.push(`requestfailed: ${url} (${request.failure()?.errorText})`)
    }
  })
}

const main = async () => {
  await mkdir(OUT_DIR, { recursive: true })

  const executablePath = CHROME_CANDIDATES.find((p) => p)
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-color-profile=srgb', '--font-render-hinting=none'],
  })

  const routes = [
    { route: '/', shot: 'home', expectH1: 'Minhaz' },
    { route: '/about', shot: 'about', expectH1: 'build interfaces' },
    { route: '/projects', shot: 'projects', expectH1: 'Things I have built' },
    { route: '/skills', shot: 'skills', expectH1: 'honest map' },
    { route: '/experience', shot: 'experience', expectH1: 'work so far' },
    { route: '/contact', shot: 'contact', expectH1: 'work' },
    { route: '/projects/furniture-ecommerce', shot: 'project-detail', expectH1: 'Furniture E-Commerce Website' },
    { route: '/this-page-does-not-exist', shot: 'not-found', expectH1: 'wrong turn' },
  ]

  const internalLinks = new Set()

  for (const viewport of [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 },
  ]) {
    const page = await browser.newPage()
    await page.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1 })
    const errors = []
    collectErrors(page, errors)

    for (const item of routes) {
      // Mobile: only the pages that stress layout most, to keep review focused.
      if (viewport.name === 'mobile' && !['/', '/projects', '/contact', '/skills'].includes(item.route)) continue

      errors.length = 0
      const response = await page.goto(`${BASE}${item.route}`, { waitUntil: 'networkidle2', timeout: 45000 })
      const status = response?.status()
      record(`${viewport.name} ${item.route} — HTTP`, status === 200 || status === 304, `${status}`)

      await page.evaluate(() => document.fonts?.ready)
      await sleep(1400)
      await autoScroll(page)

      const facts = await page.evaluate(() => {
        const h1s = [...document.querySelectorAll('h1')]
        const images = [...document.images].map((img) => ({ src: img.currentSrc || img.src, ok: img.complete && img.naturalWidth > 0 }))
        const docWidth = document.documentElement.scrollWidth
        return {
          title: document.title,
          h1Count: h1s.length,
          h1: (h1s[0]?.innerText || '').replace(/\s+/g, ' ').trim(),
          brokenImages: images.filter((img) => !img.ok).map((img) => img.src),
          overflow: docWidth - window.innerWidth,
          links: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')),
          bodyBg: getComputedStyle(document.body).backgroundColor,
        }
      })

      const expected = getSeoForPath(item.route)
      record(`${viewport.name} ${item.route} — title`, facts.title === expected.title, facts.title)
      record(`${viewport.name} ${item.route} — single h1`, facts.h1Count === 1, `${facts.h1Count}: ${facts.h1.slice(0, 60)}`)
      if (item.expectH1) {
        record(`${viewport.name} ${item.route} — h1 content`, facts.h1.includes(item.expectH1), facts.h1.slice(0, 70))
      }
      record(`${viewport.name} ${item.route} — images`, facts.brokenImages.length === 0, facts.brokenImages.join(', '))
      record(`${viewport.name} ${item.route} — no h-overflow`, facts.overflow <= 1, `${facts.overflow}px`)
      record(`${viewport.name} ${item.route} — console clean`, errors.length === 0, errors.join(' | ').slice(0, 300))

      facts.links.forEach((href) => internalLinks.add(href.split('#')[0].split('?')[0] || '/'))

      await page.screenshot({
        path: path.join(OUT_DIR, `${viewport.name}-${item.shot}.png`),
        fullPage: true,
      })
    }

    await page.close()
  }

  /* ── Interactions ─────────────────────────────────────────────────────── */
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  const errors = []
  collectErrors(page, errors)

  // Theme toggle
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle2' })
  await sleep(1200)
  const themeBefore = await page.evaluate(() => document.documentElement.className)
  await page.click('button[aria-label^="Switch to"]')
  await sleep(700)
  const themeAfter = await page.evaluate(() => ({
    className: document.documentElement.className,
    stored: localStorage.getItem('mz-theme'),
    bodyBg: getComputedStyle(document.body).backgroundColor,
  }))
  record('interaction: theme toggles to light', themeBefore.includes('dark') && themeAfter.className.includes('light'), `${themeBefore} → ${themeAfter.className}`)
  record('interaction: theme persists', themeAfter.stored === 'light', String(themeAfter.stored))
  record('interaction: light body background applied', themeAfter.bodyBg !== 'rgb(5, 6, 10)', themeAfter.bodyBg)

  await page.reload({ waitUntil: 'networkidle2' })
  await sleep(1000)
  const persisted = await page.evaluate(() => document.documentElement.className)
  record('interaction: theme survives reload', persisted.includes('light'), persisted)

  await autoScroll(page)
  await page.screenshot({ path: path.join(OUT_DIR, 'desktop-home-light.png'), fullPage: true })

  // back to dark for the remaining checks
  await page.evaluate(() => {
    localStorage.setItem('mz-theme', 'dark')
  })
  await page.reload({ waitUntil: 'networkidle2' })
  await sleep(900)

  // Project filtering
  await page.goto(`${BASE}/projects`, { waitUntil: 'networkidle2' })
  await sleep(1200)
  const allCount = await page.$$eval('article', (nodes) => nodes.length)
  record('interaction: all projects render', allCount === 5, `${allCount} cards`)

  const mernButton = await page.$$('button.tag-btn')
  let clicked = false
  for (const button of mernButton) {
    const label = await button.evaluate((node) => node.textContent.trim())
    if (label.startsWith('MERN')) {
      await button.click()
      clicked = true
      break
    }
  }
  await sleep(800)
  const mernCount = await page.$$eval('article', (nodes) => nodes.length)
  record('interaction: MERN filter works', clicked && mernCount === 2, `${mernCount} cards`)

  const activeState = await page.$$eval('button.tag-btn', (nodes) =>
    nodes.filter((node) => node.getAttribute('aria-pressed') === 'true').map((node) => node.textContent.trim())
  )
  record('interaction: active filter is marked', activeState.length === 1 && activeState[0].startsWith('MERN'), activeState.join(','))

  await page.screenshot({ path: path.join(OUT_DIR, 'desktop-projects-filtered.png'), fullPage: true })

  // Project detail links
  await page.goto(`${BASE}/projects/furniture-ecommerce`, { waitUntil: 'networkidle2' })
  await sleep(1000)
  const detail = await page.evaluate(() => ({
    disabledLinks: [...document.querySelectorAll('[aria-disabled="true"]')].map((node) => node.textContent.trim()),
    badAnchors: [...document.querySelectorAll('a[href="#"], a[href=""]')].length,
  }))
  record('interaction: unbuilt links are disabled, not dead', detail.disabledLinks.length >= 1 && detail.badAnchors === 0, detail.disabledLinks.join(' | '))

  // Contact validation
  await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle2' })
  await sleep(1100)
  await page.click('button[type="submit"]')
  await sleep(500)
  const invalidCount = await page.$$eval('[aria-invalid="true"]', (nodes) => nodes.length)
  record('interaction: empty form shows validation', invalidCount === 4, `${invalidCount} invalid fields`)

  await page.type('#name', 'Recruiter Test')
  await page.type('#email', 'hiring@example.org')
  await page.type('#subject', 'Frontend role')
  await page.type('#message', 'We are hiring a React developer in Noida and would like to talk.')
  await sleep(300)
  const filled = await page.evaluate(() => ({
    stillInvalid: document.querySelectorAll('[aria-invalid="true"]').length,
  }))
  record('interaction: typing clears errors', filled.stillInvalid === 0, `${filled.stillInvalid} remaining`)

  // Submitting without an endpoint must hand over to the mail client and say so
  // honestly — no fabricated "message sent" state.
  await page.click('button[type="submit"]')
  await sleep(900)
  const submitted = await page.evaluate(() => {
    const live = document.querySelector('[aria-live="polite"]')
    const mailtos = [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute('href'))
    return {
      statusText: (live?.innerText || '').replace(/\s+/g, ' ').trim(),
      mailto: mailtos.find((href) => href.includes('subject=')) || '',
      stillOnContact: location.pathname === '/contact',
    }
  })
  record('interaction: no fake success message', !/delivered/i.test(submitted.statusText), submitted.statusText.slice(0, 80))
  record(
    'interaction: mailto fallback is pre-filled and honest',
    submitted.mailto.includes('hiring%40example.org') && /email app/i.test(submitted.statusText),
    (submitted.mailto || submitted.statusText).slice(0, 100)
  )

  await page.screenshot({ path: path.join(OUT_DIR, 'desktop-contact-filled.png'), fullPage: true })

  // Mobile menu
  const mobile = await browser.newPage()
  await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
  await mobile.goto(`${BASE}/`, { waitUntil: 'networkidle2' })
  await sleep(1300)
  await mobile.click('button[aria-label="Open menu"]')
  await sleep(600)
  const menuState = await mobile.evaluate(() => {
    const panel = document.getElementById('mobile-menu')
    const nav = panel?.querySelectorAll('a')?.length || 0
    return { visible: panel?.getAttribute('aria-hidden') === 'false', links: nav, overflow: document.body.style.overflow }
  })
  record('interaction: mobile menu opens', menuState.visible && menuState.links >= 6, `${menuState.links} links`)
  record('interaction: mobile menu locks scroll', menuState.overflow === 'hidden', menuState.overflow)

  await mobile.screenshot({ path: path.join(OUT_DIR, 'mobile-menu-open.png') })

  await mobile.click('button[aria-label="Close menu"]')
  await sleep(400)
  const closed = await mobile.evaluate(() => document.getElementById('mobile-menu')?.getAttribute('aria-hidden'))
  record('interaction: mobile menu closes', closed === 'true', String(closed))

  await mobile.goto(`${BASE}/contact`, { waitUntil: 'networkidle2' })
  await sleep(1200)
  await autoScroll(mobile)
  await mobile.screenshot({ path: path.join(OUT_DIR, 'mobile-contact-scrolled.png'), fullPage: true })

  /* ── Internal link resolution ─────────────────────────────────────────── */
  const uniqueLinks = [...internalLinks].filter(Boolean).sort()
  const broken = []
  for (const href of uniqueLinks) {
    const response = await fetch(`${BASE}${href}`, { method: 'GET' })
    if (!response.ok) broken.push(`${href} → ${response.status}`)
  }
  record('links: internal targets resolve', broken.length === 0, `${uniqueLinks.length} checked${broken.length ? ` · ${broken.join(', ')}` : ''}`)

  await browser.close()

  const failed = results.filter((result) => !result.ok)
  await writeFile(
    path.join(OUT_DIR, 'report.json'),
    JSON.stringify({ base: BASE, ranAt: new Date().toISOString(), total: results.length, failed: failed.length, results }, null, 2),
    'utf8'
  )

  console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
  if (failed.length) {
    console.log('\nFailures:')
    failed.forEach((failure) => console.log(`  - ${failure.name}: ${failure.detail}`))
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
