import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { navLinks, profile, socials } from '../data/site'
import { BrandMark, GithubIcon, LinkedinIcon } from './Brand'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-8 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 300px at 50% 120%, color-mix(in oklab, var(--purple) 18%, transparent), transparent 70%)',
        }}
      />
      <div className="hairline" />

      <div className="container-x relative py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3" aria-label={`${profile.name} — home`}>
              <BrandMark size={40} />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-base font-semibold">{profile.name}</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em]" style={{ color: 'var(--text-dim)' }}>
                  {profile.title}
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Building responsive interfaces with React and Tailwind, and learning the backend properly —
              one project at a time.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              <a
                href={socials.github.url}
                target="_blank"
                rel="noreferrer noopener"
                className="icon-btn"
                aria-label={`${profile.name} on GitHub`}
              >
                <GithubIcon size={17} />
              </a>
              <a
                href={socials.linkedin.url}
                target="_blank"
                rel="noreferrer noopener"
                className="icon-btn"
                aria-label={`${profile.name} on LinkedIn`}
              >
                <LinkedinIcon size={17} />
              </a>
              <a href={`mailto:${profile.email}`} className="icon-btn" aria-label={`Email ${profile.name}`}>
                <Mail size={17} />
              </a>
            </div>
          </div>

          <nav className="md:col-span-2" aria-label="Footer navigation">
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.18em]" style={{ color: 'var(--text-dim)' }}>
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors hover:text-[var(--text)]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.18em]" style={{ color: 'var(--text-dim)' }}>
              Elsewhere
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={socials.github.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--text)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  GitHub <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href={socials.linkedin.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--text)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  LinkedIn <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href={profile.resumePath}
                  download
                  className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--text)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Resume <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.18em]" style={{ color: 'var(--text-dim)' }}>
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-start gap-2 transition-colors hover:text-[var(--text)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Mail size={15} className="mt-0.5 shrink-0" />
                  <span className="break-all">{profile.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phoneHref}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--text)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Phone size={15} className="shrink-0" />
                  {profile.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <MapPin size={15} className="shrink-0" />
                {profile.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--border)', color: 'var(--text-dim)' }}>
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono">
            Built with React, Vite, Tailwind CSS &amp; GSAP
          </p>
        </div>
      </div>
    </footer>
  )
}
