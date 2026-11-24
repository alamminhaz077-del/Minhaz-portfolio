/**
 * Post-build step: real HTML per route.
 *
 * A single-page app only ships one index.html, so every URL shares one <title>
 * and crawlers that don't run JavaScript see the same page everywhere. This
 * script writes a copy of the built shell into `dist/<route>/index.html` with
 * that route's title, description, canonical and Open Graph tags already in the
 * markup. The React app still boots normally and takes over from there.
 *
 * It also regenerates sitemap.xml and robots.txt from the same route list, so
 * they can never drift out of sync with the app.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defaultOgImage, getSeoForPath, staticRoutes } from '../src/data/seo.js'
import { siteUrl } from '../src/data/site.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(here, '..', 'dist')
const shellPath = path.join(distDir, 'index.html')

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const buildMetaBlock = (meta) => {
  const url = `${siteUrl.replace(/\/$/, '')}${meta.path === '/' ? '/' : meta.path}`
  const image = `${siteUrl.replace(/\/$/, '')}${defaultOgImage}`
  const robots = meta.noindex ? 'noindex, follow' : 'index, follow'

  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Minhaz Alam — Developer Portfolio" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
  ].join('\n    ')
}

const shell = await readFile(shellPath, 'utf8')

const swapMeta = (html, meta) =>
  html.replace(/<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/, `<!-- SEO_START -->\n    ${buildMetaBlock(meta)}\n    <!-- SEO_END -->`)

/** Inject the route's own <div id="root"> content? No — the shell is reused as-is; React renders on boot. */
const routes = staticRoutes
let written = 0

for (const route of routes) {
  const meta = getSeoForPath(route)
  const html = swapMeta(shell, meta)

  if (route === '/') {
    await writeFile(shellPath, html, 'utf8')
  } else {
    const targetDir = path.join(distDir, route.replace(/^\//, ''))
    await mkdir(targetDir, { recursive: true })
    await writeFile(path.join(targetDir, 'index.html'), html, 'utf8')
  }
  written += 1
}

// 404 page for hosts that support it (Netlify honours this file automatically).
const notFound = getSeoForPath('/404')
await writeFile(path.join(distDir, '404.html'), swapMeta(shell, notFound), 'utf8')

// Sitemap
const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const loc = `${siteUrl.replace(/\/$/, '')}${route === '/' ? '/' : route}`
    const priority = route === '/' ? '1.0' : route.startsWith('/projects/') ? '0.7' : '0.8'
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  })
  .join('\n')}
</urlset>
`
await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8')

// robots.txt
await writeFile(
  path.join(distDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml\n`,
  'utf8'
)

console.log(`[prerender] wrote ${written} route shells + 404.html, sitemap.xml, robots.txt`)
