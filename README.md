# Minhaz Alam — Developer Portfolio

A six-page personal portfolio for **Minhaz Alam**, a Full Stack / MERN Stack developer based in Delhi NCR.

Built with React and Vite, styled with Tailwind CSS, routed with React Router, and deployed as a static site.
Every page is a real, working route with its own URL, metadata and content — not a single long scroller.

- **Live site:** _add your Netlify URL here after the first deploy_
- **Repository:** <https://github.com/alamminhaz077-del/Minhaz-portfolio>
- **Resume:** [`public/resume/Minhaz-Alam-Resume.pdf`](public/resume/Minhaz-Alam-Resume.pdf)

---

## Table of contents

1. [Pages](#pages)
2. [Features](#features)
3. [Tech stack](#tech-stack)
4. [Project structure](#project-structure)
5. [Getting started](#getting-started)
6. [Scripts](#scripts)
7. [Editing content](#editing-content)
8. [Images and the resume](#images-and-the-resume)
9. [Contact form setup](#contact-form-setup)
10. [SEO and metadata](#seo-and-metadata)
11. [Deployment on Netlify](#deployment-on-netlify)
12. [Accessibility and performance](#accessibility-and-performance)
13. [Content honesty notes](#content-honesty-notes)

---

## Pages

| Route | Page | What is on it |
| --- | --- | --- |
| `/` | Home | Hero with rotating role text, photo, resume download, featured projects, skill snapshot, about preview, contact CTA |
| `/about` | About | Full biography, why web development, journey timeline, career goals, learning approach |
| `/projects` | Projects | All projects with technology filtering, link-status indicators |
| `/projects/:slug` | Project detail | Overview, feature list, stack, link status, next-project navigation (5 dynamic routes) |
| `/skills` | Skills | Four categories, 18 skills, qualitative level labels, "currently learning" |
| `/experience` | Experience | KodeToCareer internship, BCA education, combined timeline, certifications, technical training |
| `/contact` | Contact | Validated message form, direct channels, availability |
| any unknown path | 404 | Custom not-found page with real navigation |

---

## Features

**Real routing.** Nine URLs resolve directly — refresh, share or paste any of them. At build time every
route is also written as its own `index.html` with the correct `<title>` and Open Graph tags, so crawlers
and link previews do not depend on JavaScript.

**Dark and light mode.** Both are first-class, built on a single token layer in `src/index.css`. The theme
is applied before first paint (no flash) and remembered in `localStorage`.

**Working contact form.** Validates on the client, then either posts to a configured endpoint or opens the
visitor's email client pre-filled. It never claims a message was sent when it wasn't. See
[Contact form setup](#contact-form-setup).

**Project system driven by data.** Adding a project is one object in `src/data/projects.js`. The card, the
filter chips and the detail route are generated from it.

**Honest link states.** Projects without a public repository or deployment show a disabled, clearly-labelled
button. There are no placeholder URLs and no invented "live" claims anywhere in the data.

**Accessibility.** Semantic landmarks, one `<h1>` per page, skip link, visible focus rings, labelled form
fields with `aria-invalid` and error messages, `aria-live` status regions, keyboard-operable menu, and a
`prefers-reduced-motion` path that disables animation.

**Performance.** Static output, no backend, no analytics, one CSS file, WebP portrait with a JPEG fallback,
lazy-loaded routes are not split (the app is small enough), and no blocking third-party scripts.

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 + a small CSS token/component layer |
| Routing | React Router 7 |
| Animation | GSAP (page transitions), CSS keyframes (hero, reveals) |
| Icons | lucide-react + two inline brand SVGs |
| Fonts | Sora, Inter, JetBrains Mono (Google Fonts) |
| Hosting | Netlify (static) |

No UI kit, no CSS-in-JS runtime, no state management library — there is no state that needs one.

---

## Project structure

```
.
├── public/
│   ├── profile/               # portrait (jpg + webp)
│   ├── resume/                # Minhaz-Alam-Resume.pdf  ← replace this file
│   ├── images/projects/       # real screenshots go here (see the README inside)
│   ├── favicon.svg
│   ├── icon-192.png, icon-512.png, apple-touch-icon.png
│   ├── og-image.png           # 1200×630 social card
│   ├── site.webmanifest
│   ├── robots.txt
│   └── _redirects             # SPA fallback for Netlify
├── scripts/
│   ├── prerender-meta.mjs     # per-route HTML + sitemap + robots at build time
│   ├── check-content.mjs      # data integrity checks (npm run check)
│   ├── verify.mjs             # headless-browser test of every page (npm run verify)
│   ├── shots.mjs              # visual review screenshots
│   └── build-assets.py        # regenerates portrait, OG image and icons
├── src/
│   ├── components/
│   │   ├── home/              # hero + home page sections
│   │   ├── Brand.jsx          # logo mark, GitHub/LinkedIn icons
│   │   ├── Footer.jsx, Navbar.jsx, PageHeader.jsx
│   │   ├── ProjectCard.jsx, ProjectCover.jsx
│   │   ├── Reveal.jsx         # IntersectionObserver scroll reveal
│   │   ├── Seo.jsx            # document head per route
│   │   ├── PageTransition.jsx, BootLoader.jsx, ScrollControls.jsx
│   │   └── SectionHeading.jsx
│   ├── context/ThemeContext.jsx
│   ├── data/                  # ← all editable content lives here
│   │   ├── site.js            # name, contact, socials, nav
│   │   ├── projects.js        # project catalogue
│   │   ├── skills.js          # skills + levels
│   │   ├── journey.js         # internship, education, timeline, certifications
│   │   └── seo.js             # per-route titles and descriptions
│   ├── hooks/useTypedText.js
│   ├── pages/                 # Home, About, Projects, ProjectDetail, Skills, Experience, Contact, NotFound
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              # design tokens + component classes
├── netlify.toml
├── index.html
└── vite.config.js
```

---

## Getting started

Requires **Node.js 18 or newer** (tested on Node 24) and npm.

```bash
git clone https://github.com/alamminhaz077-del/Minhaz-portfolio.git
cd Minhaz-portfolio

npm install
npm run dev          # http://localhost:5173
```

Production build:

```bash
npm run build        # writes dist/ and prerenders every route
npm run preview      # serves dist/ at http://localhost:4173
```

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build, then prerenders meta tags per route and regenerates `sitemap.xml` + `robots.txt` |
| `npm run preview` | Serves the built `dist/` locally |
| `npm run check` | Validates content data: unique slugs, required fields, valid filter ids, no placeholder URLs, real asset files, unique page titles |
| `npm run verify` | Headless Chrome test of all pages: HTTP status, title, single `<h1>`, decoded images, no horizontal overflow, console errors, plus theme toggle, project filter, form validation, mobile menu and internal link resolution. Needs `npm run preview` running. |
| `npm run shots` | Writes review screenshots to `.zwork/derived/shots/` |
| `python scripts/build-assets.py` | Regenerates the portrait crops, OG image and app icons from the source photo |

`verify` and `shots` use `puppeteer-core` against your installed Chrome or Edge — no browser download.

---

## Editing content

Almost everything lives in `src/data/`. No component edits are needed for normal updates.

### Name, contact details, social links

`src/data/site.js` → `profile` and `socials`. `siteUrl` is used for canonical URLs and the sitemap — set it
to your real domain once deployed.

### Adding a project

Append an object to the `projects` array in `src/data/projects.js`:

```js
{
  slug: 'my-new-project',          // becomes /projects/my-new-project
  title: 'My New Project',
  tagline: 'One sentence for the detail page header.',
  summary: 'Two lines shown on the card.',
  overview: ['Paragraph one.', 'Paragraph two.'],
  tech: ['React.js', 'Node.js', 'MongoDB'],
  filters: ['react', 'mern'],      // must match ids in projectFilters
  features: ['Feature one', 'Feature two', 'Feature three'],
  cover: 'dashboard',              // furniture | mini-shop | dashboard | attendance | portfolio | default
  status: 'Personal project',
  year: '2026',
  repoUrl: null,                   // null = disabled "not published" button
  demoUrl: null,
}
```

Set `repoUrl` / `demoUrl` only to a real, working URL. `null` renders an honest disabled state. Run
`npm run check` afterwards to catch mistakes.

### Skills

`src/data/skills.js`. Each skill takes `level: 'comfortable' | 'working' | 'learning'` — deliberately no
percentages, so nothing on the page can be contradicted in an interview.

### Experience and education

`src/data/journey.js`:

- `internship` — role, organisation, location, dates, responsibilities, stack.
- `education` — degree and institution. `period` is intentionally `''`; fill it in to publish the years.
- `certifications` — empty array. Add `{ title, issuer, year, credentialId, url }` entries when you have them.
- `journeyTimeline`, `careerGoals`, `selfStudy` — About page narrative.

### Page titles and descriptions

`src/data/seo.js`. One entry per route; project detail pages generate theirs from the project data. The same
file feeds both the runtime `<Seo />` component and the build-time prerenderer.

---

## Images and the resume

### Replace the profile photo

Put your new photo somewhere convenient and regenerate the optimised versions:

```python
# scripts/build-assets.py — change SOURCE at the top
SOURCE = Path(r"C:\path\to\your\photo.jpg")
```

```bash
python scripts/build-assets.py
```

That writes `public/profile/minhaz-alam.jpg` (800×1000), `public/profile/minhaz-alam.webp`, `og-image.png`
and the app icons. Crop the source so the face sits in the upper third — the script crops to 4:5 from the top.

If you prefer to do it by hand: replace both `public/profile/minhaz-alam.jpg` and `.webp`, keep the 4:5
ratio, and update the `width`/`height` attributes in `src/components/home/Hero.jsx` if the ratio changes.

### Replace the resume

Overwrite `public/resume/Minhaz-Alam-Resume.pdf` with the same file name. Every download button points at
`profile.resumePath` in `src/data/site.js`; change that value if you rename the file.

### Project screenshots

`ProjectCover` draws abstract cover art on purpose — inventing a screenshot of a project would be a
fabrication. To use a real screenshot:

1. Save it as `public/images/projects/<slug>.webp` (1600×1000 or 16:10).
2. In `src/components/ProjectCard.jsx`, replace `<ProjectCover … />` with an `<img>`:

```jsx
<img
  src={`/images/projects/${project.slug}.webp`}
  alt={`${project.title} interface screenshot`}
  width="1600" height="1000" loading="lazy" decoding="async"
  className="h-full w-full object-cover"
/>
```

3. Do the same in `src/pages/ProjectDetail.jsx` for the large hero image.

---

## Contact form setup

Out of the box the form uses a **mailto fallback**: it validates the message and opens the visitor's email
app pre-filled with the subject and body. Nothing is sent by the page, and the UI says so — there is no
fake "message sent" toast.

To receive messages directly:

1. Create a form endpoint — [Formspree](https://formspree.io), [Web3Forms](https://web3forms.com),
   [Basin](https://usebasin.com) or your own API all work. You need a URL that accepts
   `POST` with a JSON body.
2. Add it to `.env` (copy `.env.example`):

```bash
VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

3. Restart `npm run dev`, or set the same variable in **Netlify → Site settings → Environment variables**
   and redeploy.

The form sends `{ name, email, subject, message }`. On success it shows a delivery confirmation; on failure it
shows the real error and falls back to the email address. There is also a hidden honeypot field for bots.

---

## SEO and metadata

- Every route has a unique `<title>`, meta description, canonical URL, and Open Graph / Twitter tags.
- `scripts/prerender-meta.mjs` runs after `vite build` and writes `dist/<route>/index.html` with that route's
  tags already in the markup, plus `sitemap.xml`, `robots.txt` and a `404.html`.
- Structured data (`Person`) is embedded in `index.html`.
- **After deploying**, set `siteUrl` in `src/data/site.js` to your real domain and rebuild, then update the
  `robots.txt` sitemap line if your domain differs.
- Open Graph previews use `/og-image.png`. Regenerate it with `scripts/build-assets.py` if your title changes.

---

## Deployment on Netlify

The repository is already configured — `netlify.toml` sets the build command, publish directory, redirects,
cache headers and security headers.

**One-time setup (needs your Netlify login):**

1. Go to <https://app.netlify.com/start> → **Import from Git** → GitHub.
2. Authorise Netlify for the `Minhaz-portfolio` repository.
3. Confirm the detected settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 20 (already in `netlify.toml`)
4. Add `VITE_CONTACT_ENDPOINT` under **Site configuration → Environment variables** if you configured one.
5. **Deploy site.**

**After the first deploy**

- Copy the URL Netlify gives you, set `siteUrl` in `src/data/site.js` to it, commit and push.
- Optional: **Domain management → Add a custom domain**, then update `siteUrl` again.

**Continuous deployment**

Every push to `main` triggers a rebuild and publish automatically. Nothing else to configure.

**Why refreshes on nested routes work:** the build writes a real `index.html` for every route, and
`public/_redirects` plus the `netlify.toml` rule send unknown paths to the app instead of a 404.

---

## Accessibility and performance

- Colour contrast is checked against both themes for body copy and interactive elements.
- All interactive elements are reachable by keyboard; focus is visible everywhere.
- Motion respects `prefers-reduced-motion`; the hero entrance is CSS-based so content is visible even if
  JavaScript animation never runs.
- Images declare intrinsic `width`/`height` to prevent layout shift; the portrait is `fetchpriority="high"`,
  everything else defers.
- No third-party analytics, trackers or embeds.

---

## Content honesty notes

This portfolio was built to survive a recruiter reading it closely, so a few things are deliberately empty
or disabled rather than invented:

- **Certifications** — no certifications are listed because none have been provided. Add real ones in
  `src/data/journey.js`.
- **Graduation year** — omitted rather than guessed. Fill `education.period` to publish it.
- **Project repositories and demos** — shown as disabled buttons until real URLs exist.
- **Internship title** — "Web Development Intern" at KodeToCareer, matching the offer letter
  (KTC-OFF-2026-0147, 7 October 2026) and the resume. Update `internship.role` if your official title differs.
- **Project feature bullets** — written from the resume descriptions. Read them once and remove anything
  that does not match the actual build.
- **Working hours / response time** — the "replies within a day" line is a promise, not a measurement.
  Remove it from `src/data/site.js` if you cannot keep it.

---

## License

Personal project. The code is free to learn from; the content, photograph and resume belong to Minhaz Alam
and should not be reused as someone else's portfolio.
