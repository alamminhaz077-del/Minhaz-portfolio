import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Code2, Database, Info, Server, Sparkles, Wrench } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { learningNow, levels, skillGroups } from '../data/skills'

const groupIcons = { monitor: Code2, server: Server, database: Database, wrench: Wrench }

const levelStyle = {
  comfortable: { color: '#34d399', border: 'rgba(52,211,153,.35)', background: 'rgba(52,211,153,.12)' },
  working: { color: '#a78bfa', border: 'rgba(167,139,250,.35)', background: 'rgba(167,139,250,.12)' },
  learning: { color: '#fbbf24', border: 'rgba(251,191,36,.35)', background: 'rgba(251,191,36,.12)' },
}

function SkillTile({ skill, index }) {
  const meta = levels[skill.level]
  const style = levelStyle[skill.level]

  return (
    <Reveal delay={(index % 3) * 60}>
      <div className="glass lift group flex h-full items-start gap-3.5 p-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-[0.78rem] font-semibold transition-transform duration-300 group-hover:scale-105"
          style={{
            color: skill.color,
            background: 'linear-gradient(160deg, rgba(10,13,26,.96), rgba(10,13,26,.72))',
            border: `1px solid ${skill.color}44`,
            boxShadow: `0 10px 24px -18px ${skill.color}`,
          }}
          aria-hidden="true"
        >
          {skill.mark}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-[0.92rem] font-semibold leading-tight">{skill.name}</h3>
            <span
              className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em]"
              style={{ color: style.color, background: style.background, border: `1px solid ${style.border}` }}
              title={meta.description}
            >
              {meta.short}
            </span>
          </div>
          <p className="mt-1.5 text-[0.78rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {skill.note}
          </p>
        </div>
      </div>
    </Reveal>
  )
}

export default function Skills() {
  const total = skillGroups.reduce((count, group) => count + group.skills.length, 0)

  return (
    <>
      <Seo path="/skills" />

      <PageHeader
        eyebrow="Technical skills"
        title={
          <>
            An honest map of what I can <span className="gradient-text">actually do</span>
          </>
        }
        description="Every skill below is labelled by how I work with it today — no percentage bars, because a number that says 87% means nothing in an interview. What you see is what I will stand behind."
        meta={
          <>
            <span className="chip chip-brand">
              <Sparkles size={12} />
              {total} skills · 4 categories
            </span>
            <span className="chip">Continuously updated</span>
          </>
        }
      />

      <section className="pb-16">
        <div className="container-x">
          {/* Legend */}
          <Reveal>
            <div className="glass grid gap-4 p-5 sm:grid-cols-3">
              {Object.entries(levels).map(([key, meta]) => {
                const style = levelStyle[key]
                return (
                  <div key={key} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em]"
                      style={{ color: style.color, background: style.background, border: `1px solid ${style.border}` }}
                    >
                      {meta.short}
                    </span>
                    <p className="text-[0.78rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {meta.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </Reveal>

          {/* Groups */}
          {skillGroups.map((group, groupIndex) => {
            const Icon = groupIcons[group.icon] || Code2
            return (
              <div key={group.id} className="mt-14" id={group.id}>
                <Reveal>
                  <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-5" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-start gap-3">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          background: 'color-mix(in oklab, var(--purple) 14%, transparent)',
                          border: '1px solid color-mix(in oklab, var(--purple) 26%, transparent)',
                          color: 'var(--purple-soft)',
                        }}
                      >
                        <Icon size={18} />
                      </span>
                      <div>
                        <h2 className="font-display text-xl font-semibold tracking-tight">{group.title}</h2>
                        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                          {group.blurb}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em]" style={{ color: 'var(--text-dim)' }}>
                      {String(group.skills.length).padStart(2, '0')} skills
                    </span>
                  </div>
                </Reveal>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.skills.map((skill, index) => (
                    <SkillTile key={skill.name} skill={skill} index={index + groupIndex} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Learning now */}
      <section className="section relative" aria-labelledby="learning-now">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--border-strong), transparent)' }}
        />
        <div className="container-x">
          <SectionHeading
            eyebrow="In progress"
            title={<span id="learning-now">Currently <span className="gradient-text">learning</span></span>}
            description="The gap between where I am and where I want to be is not a secret. This is what I am actively closing."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {learningNow.map((item, index) => (
              <Reveal key={item.name} delay={index * 70}>
                <div className="glass lift flex h-full items-start gap-4 p-5">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: 'rgba(251,191,36,.12)', border: '1px solid rgba(251,191,36,.3)', color: '#fbbf24' }}
                  >
                    <BookOpen size={15} />
                  </span>
                  <div>
                    <h3 className="font-display text-[0.95rem] font-semibold">{item.name}</h3>
                    <p className="mt-1 text-[0.82rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <div className="flex items-start gap-3 rounded-2xl p-4 text-[0.8rem] leading-relaxed" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <Info size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--purple-soft)' }} />
              <p>
                Nothing on this page is marked &ldquo;expert&rdquo;. The strongest label used is
                &ldquo;comfortable&rdquo;, which means I can build with it unaided — not that I have mastered it.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <div className="glass-strong flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center md:p-8">
              <div>
                <h2 className="font-display text-lg font-semibold">Want to see the skills in context?</h2>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                  Projects show how the stack fits together in practice.
                </p>
              </div>
              <Link to="/projects" className="btn btn-primary group">
                Browse projects
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
