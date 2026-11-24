import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Compass, Home, Search } from 'lucide-react'
import Seo from '../components/Seo'
import { navLinks } from '../data/site'

export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <>
      <Seo path="/404" noindex />

      <section className="relative flex min-h-[78vh] items-center overflow-hidden pb-20 pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="grid-lines" />
          <div
            className="orb animate-float"
            style={{ width: 520, height: 520, top: '-15%', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, var(--glow) 0%, transparent 68%)', opacity: 0.85 }}
          />
        </div>

        <div className="container-x relative text-center">
          <span className="eyebrow justify-center">Error 404</span>

          <p
            aria-hidden="true"
            className="gradient-text mx-auto mt-4 font-display font-extrabold leading-none"
            style={{ fontSize: 'clamp(5.5rem, 20vw, 12rem)', letterSpacing: '-0.06em' }}
          >
            404
          </p>

          <h1 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
            This page took a wrong turn
          </h1>
          <p className="lede mx-auto mt-3 max-w-md">
            The URL <span className="font-mono text-[0.85em]" style={{ color: 'var(--text)' }}>{pathname}</span> does
            not exist on this site. Nothing is broken on your end — the link simply points somewhere I have not built.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/" className="btn btn-primary">
              <Home size={15} />
              Back home
            </Link>
            <Link to="/projects" className="btn btn-ghost">
              <Compass size={15} />
              Browse projects
            </Link>
            <Link to="/contact" className="btn btn-quiet group">
              Report a broken link
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mx-auto mt-14 max-w-2xl">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em]" style={{ color: 'var(--text-dim)' }}>
              <Search size={11} className="mr-1.5 inline" />
              Try one of these instead
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="tag-btn">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <p className="mt-12 inline-flex items-center gap-2 text-[0.75rem]" style={{ color: 'var(--text-dim)' }}>
            <ArrowLeft size={12} />
            Or press the browser back button — nothing here breaks your history.
          </p>
        </div>
      </section>
    </>
  )
}
