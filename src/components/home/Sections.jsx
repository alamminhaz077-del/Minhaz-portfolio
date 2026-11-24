import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Code2,
  Database,
  GraduationCap,
  Mail,
  Server,
  Sparkles,
  Wrench,
} from 'lucide-react'
import SectionHeading from '../SectionHeading'
import Reveal from '../Reveal'
import ProjectCard from '../ProjectCard'
import { projects } from '../../data/projects'
import { learningNow, skillGroups } from '../../data/skills'
import { education, internship } from '../../data/journey'
import { profile, socials } from '../../data/site'

const groupIcons = { monitor: Code2, server: Server, database: Database, wrench: Wrench }

export function FeaturedWork() {
  const featured = projects.slice(0, 3)

  return (
    <section className="section" aria-labelledby="featured-work">
      <div className="container-x">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <span id="featured-work">
              Projects that taught me <span className="gradient-text">the most</span>
            </span>
          }
          description="Frontend builds, full-stack experiments and the site you are reading. Each one links to a page with the full breakdown."
          action={
            <Link to="/projects" className="btn btn-ghost group">
              All projects
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          }
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 90} className="h-full">
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SkillsSnapshot() {
  return (
    <section className="section relative" aria-labelledby="skills-snapshot">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--border-strong), transparent)' }}
      />
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Toolkit"
              title={
                <span id="skills-snapshot">
                  The stack I <span className="gradient-text">actually use</span>
                </span>
              }
              description="No percentage bars. Each skill is labelled by how I actually work with it today, so the page survives being asked about in an interview."
            />

            <Reveal delay={120} className="mt-8">
              <div className="glass p-5">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: 'color-mix(in oklab, var(--purple) 16%, transparent)', color: 'var(--purple-soft)' }}
                  >
                    <BookOpen size={15} />
                  </span>
                  <h3 className="font-display text-sm font-semibold">Learning right now</h3>
                </div>
                <ul className="mt-4 space-y-3">
                  {learningNow.slice(0, 3).map((item) => (
                    <li key={item.name} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--purple)' }} />
                      <span>
                        <span className="block text-sm font-medium">{item.name}</span>
                        <span className="block text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          {item.detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link to="/skills" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--purple-soft)' }}>
                  Full skills breakdown
                  <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="grid items-start gap-4 sm:grid-cols-2">
            {skillGroups.map((group, index) => {
              const Icon = groupIcons[group.icon] || Code2
              return (
                <Reveal key={group.id} delay={index * 80}>
                  <div className="glass lift h-full p-5">
                    <div className="flex items-center justify-between">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{
                          background: 'color-mix(in oklab, var(--purple) 14%, transparent)',
                          color: 'var(--purple-soft)',
                          border: '1px solid color-mix(in oklab, var(--purple) 24%, transparent)',
                        }}
                      >
                        <Icon size={16} />
                      </span>
                      <span className="font-mono text-[0.65rem]" style={{ color: 'var(--text-dim)' }}>
                        {String(group.skills.length).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[0.95rem] font-semibold">{group.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {group.skills.slice(0, 4).map((skill) => (
                        <span key={skill.name} className="chip">
                          {skill.name}
                        </span>
                      ))}
                      {group.skills.length > 4 ? <span className="chip">+{group.skills.length - 4}</span> : null}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutSnapshot() {
  const facts = [
    { icon: GraduationCap, label: 'Education', value: education.shortName, meta: education.institution },
    { icon: Briefcase, label: 'Currently', value: internship.role, meta: `${internship.organisation} · ${internship.period}` },
    { icon: Sparkles, label: 'Focus', value: 'Frontend + MERN', meta: 'React, Node, MongoDB' },
  ]

  return (
    <section className="section" aria-labelledby="about-snapshot">
      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="About me"
              title={
                <span id="about-snapshot">
                  A developer who reads the <span className="gradient-text">source</span>, not just the tutorial
                </span>
              }
            />
            <Reveal delay={100}>
              <p className="lede mt-6">{profile.aboutPreview}</p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                I am looking for a first full-time role where I can keep that habit going — shipping features,
                taking review feedback seriously, and getting better faster than I would on my own.
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-7">
              <Link to="/about" className="btn btn-ghost group">
                Read the full story
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-3">
            {facts.map((fact, index) => (
              <Reveal key={fact.label} delay={index * 90}>
                <div className="glass lift flex items-start gap-4 p-5">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: 'color-mix(in oklab, var(--purple) 14%, transparent)',
                      color: 'var(--purple-soft)',
                      border: '1px solid color-mix(in oklab, var(--purple) 22%, transparent)',
                    }}
                  >
                    <fact.icon size={17} />
                  </span>
                  <div className="min-w-0">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em]" style={{ color: 'var(--text-dim)' }}>
                      {fact.label}
                    </span>
                    <p className="mt-1 font-display text-[0.98rem] font-semibold">{fact.value}</p>
                    <p className="mt-0.5 truncate text-xs" style={{ color: 'var(--text-muted)' }}>
                      {fact.meta}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function CtaBand() {
  return (
    <section className="pb-8 pt-4" aria-labelledby="cta-heading">
      <div className="container-x">
        <Reveal>
          <div
            className="glass-strong relative overflow-hidden rounded-[2rem] px-6 py-12 md:px-14 md:py-16"
            style={{ boxShadow: '0 50px 120px -60px var(--glow)' }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(600px 240px at 12% 0%, color-mix(in oklab, var(--purple) 26%, transparent), transparent 70%), radial-gradient(500px 240px at 88% 100%, color-mix(in oklab, var(--blue) 20%, transparent), transparent 70%)',
              }}
            />
            <div className="grid-lines opacity-60" aria-hidden="true" />

            <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <span className="eyebrow">Next step</span>
                <h2 id="cta-heading" className="display-2 mt-4">
                  Let’s build something <span className="gradient-text">worth using</span>
                </h2>
                <p className="lede mt-4 max-w-lg">
                  I am available for junior frontend, React and MERN stack roles. If you have a project or an
                  opening, I would like to hear about it.
                </p>
              </div>

              <div className="flex flex-col gap-3 md:items-end">
                <Link to="/contact" className="btn btn-primary w-full md:w-auto">
                  <Mail size={16} />
                  Start a conversation
                </Link>
                <a href={`mailto:${profile.email}`} className="btn btn-ghost w-full md:w-auto">
                  {profile.email}
                  <ArrowUpRight size={15} />
                </a>
                <div className="mt-1 flex items-center gap-2 md:justify-end">
                  <a href={socials.github.url} target="_blank" rel="noreferrer noopener" className="icon-btn" aria-label="GitHub profile">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.4-3.88-1.4-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.78 1.05.78 2.12v3.14c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
                    </svg>
                  </a>
                  <a href={socials.linkedin.url} target="_blank" rel="noreferrer noopener" className="icon-btn" aria-label="LinkedIn profile">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
