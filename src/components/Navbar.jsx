import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Moon, Sun, X, ArrowUpRight } from 'lucide-react'
import { navLinks, profile, socials } from '../data/site'
import { useTheme } from '../context/ThemeContext'
import { BrandMark, GithubIcon, LinkedinIcon } from './Brand'

const isActive = (pathname, to) => {
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`)
}

export default function Navbar() {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300"
        style={
          scrolled || open
            ? {
                backgroundColor: 'color-mix(in oklab, var(--bg) 82%, transparent)',
                borderBottom: '1px solid var(--border)',
                backdropFilter: 'blur(18px) saturate(160%)',
                WebkitBackdropFilter: 'blur(18px) saturate(160%)',
              }
            : { borderBottom: '1px solid transparent' }
        }
      >
        <nav className="container-x flex h-[72px] items-center justify-between gap-4" aria-label="Main navigation">
          <Link
            to="/"
            className="group flex items-center gap-2.5 rounded-lg"
            aria-label={`${profile.name} — home`}
          >
            <BrandMark size={34} />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[0.95rem] font-semibold tracking-tight">
                {profile.name}
              </span>
              <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em]" style={{ color: 'var(--text-dim)' }}>
                {profile.titleSecondary}
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="nav-link"
                  data-active={isActive(pathname, link.to) ? 'true' : 'false'}
                  aria-current={isActive(pathname, link.to) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="icon-btn"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <Link to="/contact" className="btn btn-primary hidden h-10 px-4 text-[0.82rem] sm:inline-flex">
              Hire me
              <ArrowUpRight size={15} />
            </Link>

            <button
              type="button"
              className="icon-btn lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-30 lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundColor: 'color-mix(in oklab, var(--bg) 92%, transparent)',
            backdropFilter: 'blur(20px)',
            opacity: open ? 1 : 0,
          }}
          onClick={() => setOpen(false)}
        />
        <div
          className="absolute inset-x-0 top-[72px] px-5 pb-8 pt-6 transition-all duration-400"
          style={{
            transform: open ? 'translateY(0)' : 'translateY(-12px)',
            opacity: open ? 1 : 0,
          }}
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <li
                key={link.to}
                style={{
                  transitionDelay: `${open ? index * 40 + 60 : 0}ms`,
                  transform: open ? 'none' : 'translateY(-8px)',
                  opacity: open ? 1 : 0,
                  transition: 'transform .4s cubic-bezier(.2,.8,.2,1), opacity .4s ease',
                }}
              >
                <Link
                  to={link.to}
                  className="flex items-center justify-between rounded-xl px-3 py-3.5 font-display text-lg font-medium"
                  style={{
                    color: isActive(pathname, link.to) ? 'var(--text)' : 'var(--text-muted)',
                    background: isActive(pathname, link.to) ? 'var(--surface)' : 'transparent',
                  }}
                >
                  {link.label}
                  <span className="font-mono text-[0.65rem]" style={{ color: 'var(--text-dim)' }}>
                    0{index + 1}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-2">
            <Link to="/contact" className="btn btn-primary flex-1">
              Hire me
            </Link>
            <a href={socials.github.url} target="_blank" rel="noreferrer noopener" className="icon-btn h-11 w-11" aria-label="GitHub profile">
              <GithubIcon size={18} />
            </a>
            <a href={socials.linkedin.url} target="_blank" rel="noreferrer noopener" className="icon-btn h-11 w-11" aria-label="LinkedIn profile">
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
