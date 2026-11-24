import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Download, Mail, MapPin, Sparkles } from 'lucide-react'
import { profile, socials } from '../../data/site'
import { techStrip } from '../../data/skills'
import useTypedText from '../../hooks/useTypedText'
import { GithubIcon, LinkedinIcon } from '../Brand'

/**
 * The entrance animation is plain CSS (`hero-in` + a per-element delay) rather
 * than a JS tween. Content must never depend on an animation library finishing:
 * if the animation is skipped, interrupted or unsupported, every element has
 * already reached its final state on its own.
 */
const drop = (delay) => ({ animationDelay: `${delay}ms` })

export default function Hero() {
  const { text } = useTypedText(profile.roles)

  return (
    <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      {/* Ambience */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines" />
        <div
          className="orb animate-float"
          style={{
            width: 460,
            height: 460,
            top: -140,
            right: -80,
            background: 'radial-gradient(circle, var(--glow) 0%, transparent 68%)',
          }}
        />
        <div
          className="orb"
          style={{
            width: 380,
            height: 380,
            bottom: -160,
            left: -120,
            background: 'radial-gradient(circle, var(--glow-blue) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--border-strong), transparent)' }}
        />
      </div>

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Copy */}
          <div className="relative z-10">
            <div className="hero-in flex flex-wrap items-center gap-2.5" style={drop(40)}>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.71rem] font-medium"
                style={{
                  background: 'color-mix(in oklab, var(--purple) 12%, transparent)',
                  border: '1px solid color-mix(in oklab, var(--purple) 30%, transparent)',
                  color: 'var(--text)',
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#34d399' }} />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: '#34d399' }} />
                </span>
                {profile.availability}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[0.71rem]" style={{ color: 'var(--text-dim)' }}>
                <MapPin size={12} />
                {profile.location}
              </span>
            </div>

            <h1 className="display-1 mt-6">
              <span className="block overflow-hidden py-[0.06em]">
                <span className="hero-in block" style={drop(120)}>
                  Minhaz
                </span>
              </span>
              <span className="block overflow-hidden py-[0.06em]">
                <span className="hero-in gradient-text block" style={drop(200)}>
                  Alam
                </span>
              </span>
            </h1>

            <div className="hero-in mt-5 flex min-h-[1.9rem] items-center gap-2.5 font-mono text-sm md:text-base" style={drop(300)}>
              <span className="inline-block h-3.5 w-[2px]" style={{ background: 'var(--purple)' }} aria-hidden="true" />
              <span aria-live="polite" style={{ color: 'var(--text-muted)' }}>
                {text}
                <span className="animate-caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px]" style={{ background: 'var(--purple-soft)' }} aria-hidden="true" />
              </span>
            </div>

            <p className="hero-in lede mt-6 max-w-xl" style={drop(380)}>
              {profile.intro}
            </p>

            <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={drop(460)}>
              <a href={profile.resumePath} download className="btn btn-primary">
                <Download size={16} />
                Download resume
              </a>
              <Link to="/contact" className="btn btn-ghost">
                Hire me
                <ArrowUpRight size={16} />
              </Link>
              <Link to="/projects" className="btn btn-quiet group">
                View projects
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="hero-in mt-8 flex items-center gap-2.5" style={drop(540)}>
              <a href={socials.github.url} target="_blank" rel="noreferrer noopener" className="icon-btn" aria-label="GitHub profile" title="GitHub">
                <GithubIcon size={17} />
              </a>
              <a href={socials.linkedin.url} target="_blank" rel="noreferrer noopener" className="icon-btn" aria-label="LinkedIn profile" title="LinkedIn">
                <LinkedinIcon size={17} />
              </a>
              <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Send an email" title={profile.email}>
                <Mail size={17} />
              </a>
              <span className="ml-2 hidden text-xs sm:inline" style={{ color: 'var(--text-dim)' }}>
                Replies within a day
              </span>
            </div>
          </div>

          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-[430px] lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] opacity-70 blur-2xl"
              style={{ background: 'radial-gradient(60% 60% at 60% 30%, var(--glow), transparent 70%)' }}
            />
            <div
              className="glass-strong hero-in relative z-10 overflow-hidden rounded-[2rem] p-2"
              style={{ ...drop(220), boxShadow: '0 40px 90px -50px var(--glow), var(--shadow-card)' }}
            >
              <div className="relative overflow-hidden rounded-[1.6rem]">
                <picture>
                  <source srcSet="/profile/minhaz-alam.webp" type="image/webp" />
                  <img
                    src="/profile/minhaz-alam.jpg"
                    alt="Minhaz Alam, full stack developer, at a desk in an office"
                    width="800"
                    height="1000"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                </picture>
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(5,6,12,.62) 0%, rgba(5,6,12,.05) 40%, transparent 60%)' }}
                />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="font-display text-sm font-semibold text-white">Minhaz Alam</span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/65">
                      {profile.title} · {profile.titleSecondary}
                    </span>
                  </div>
                  <span
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/85"
                    style={{ background: 'rgba(8,10,20,.55)', border: '1px solid rgba(255,255,255,.18)', backdropFilter: 'blur(8px)' }}
                  >
                    <Sparkles size={10} />
                    Open to work
                  </span>
                </div>
              </div>
            </div>

            {/* Floating details — above the frame, and clear of the caption */}
            <div
              className="hero-in absolute -left-5 top-16 z-20 hidden items-center gap-2.5 rounded-2xl px-3.5 py-2.5 sm:flex"
              style={{
                ...drop(520),
                background: 'linear-gradient(150deg, #12172a 0%, #0b0f1c 100%)',
                border: '1px solid var(--border-strong)',
                boxShadow: '0 18px 40px -24px rgba(0,0,0,.95)',
                color: '#f3f5fb',
              }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'color-mix(in oklab, #61dafb 18%, transparent)', color: '#61dafb' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="2.2" fill="currentColor" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="currentColor" strokeWidth="1.1" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="currentColor" strokeWidth="1.1" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="currentColor" strokeWidth="1.1" transform="rotate(120 12 12)" />
                </svg>
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[0.7rem] font-semibold">React.js</span>
                <span className="font-mono text-[0.6rem]" style={{ color: 'rgba(255,255,255,.62)' }}>
                  Component-driven UI
                </span>
              </span>
            </div>

            <div
              className="hero-in absolute -bottom-9 -right-4 z-20 hidden items-center gap-2.5 rounded-2xl px-3.5 py-2.5 md:flex"
              style={{
                ...drop(600),
                background: 'linear-gradient(150deg, #12172a 0%, #0b0f1c 100%)',
                border: '1px solid var(--border-strong)',
                boxShadow: '0 18px 40px -24px rgba(0,0,0,.95)',
                color: '#f3f5fb',
              }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'color-mix(in oklab, #34d399 18%, transparent)', color: '#34d399' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[0.7rem] font-semibold">KodeToCareer</span>
                <span className="font-mono text-[0.6rem]" style={{ color: 'rgba(255,255,255,.62)' }}>
                  Intern · since Oct 2026
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Stats + tech strip */}
        <div className="mt-16 md:mt-20">
          <div className="glass hero-in flex flex-col divide-y rounded-2xl sm:flex-row sm:divide-x sm:divide-y-0" style={drop(620)}>
            {profile.stats.map((stat) => (
              <div key={stat.label} className="flex flex-1 flex-col gap-1 px-6 py-5" style={{ borderColor: 'var(--border)' }}>
                <span className="font-display text-2xl font-semibold tracking-tight">{stat.value}</span>
                <span className="text-[0.78rem] font-medium">{stat.label}</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em]" style={{ color: 'var(--text-dim)' }}>
                  {stat.hint}
                </span>
              </div>
            ))}
          </div>

          <div className="marquee-mask mt-10 overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-3">
              {[...techStrip, ...techStrip].map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className="whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em]"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-dim)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
