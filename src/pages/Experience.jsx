import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  Clock,
  GraduationCap,
  Info,
  MapPin,
  Sparkles,
} from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import {
  certifications,
  education,
  experienceFacts,
  internship,
  selfStudy,
} from '../data/journey'

export default function Experience() {
  return (
    <>
      <Seo path="/experience" />

      <PageHeader
        eyebrow="Experience & education"
        title={
          <>
            The work so far — <span className="gradient-text">and the groundwork</span> behind it
          </>
        }
        description="A full-time web development internship in Noida, a BCA from Maharshi Dayanand University, and the self-directed learning that fills the space between them. Only real dates and real responsibilities are listed."
        meta={
          <>
            <span className="chip chip-brand">
              <Briefcase size={12} />
              {internship.role}
            </span>
            <span className="chip">
              <GraduationCap size={12} />
              {education.shortName}
            </span>
            <span className="chip">
              <MapPin size={12} />
              {internship.location}
            </span>
          </>
        }
      />

      {/* Facts */}
      <section className="pb-14">
        <div className="container-x">
          <Reveal>
            <div
              className="glass grid divide-y overflow-hidden rounded-2xl sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
              style={{ borderColor: 'var(--border)' }}
            >
              {experienceFacts.map((fact) => (
                <div key={fact.label} className="px-5 py-4" style={{ borderColor: 'var(--border)' }}>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em]" style={{ color: 'var(--text-dim)' }}>
                    {fact.label}
                  </span>
                  <p className="mt-1.5 font-display text-[0.9rem] font-semibold leading-snug">{fact.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Internship */}
      <section className="pb-16" aria-labelledby="internship-heading">
        <div className="container-x">
          <Reveal>
            <div className="glass-strong edge-light relative overflow-hidden rounded-[1.75rem] p-6 md:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full"
                style={{ background: 'radial-gradient(circle, var(--glow) 0%, transparent 68%)', filter: 'blur(30px)' }}
              />

              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                    style={{
                      background: 'linear-gradient(150deg, rgba(139,92,246,.22), rgba(56,189,248,.12))',
                      border: '1px solid color-mix(in oklab, var(--purple) 34%, transparent)',
                      color: 'var(--purple-soft)',
                    }}
                  >
                    <Briefcase size={20} />
                  </span>
                  <div>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em]" style={{ color: 'var(--text-dim)' }}>
                      Work experience
                    </span>
                    <h2 id="internship-heading" className="mt-1.5 font-display text-xl font-semibold md:text-2xl">
                      {internship.role}
                    </h2>
                    <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                      {internship.organisation} · {internship.location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="chip chip-brand">
                    <Calendar size={11} />
                    {internship.period}
                  </span>
                  <span className="chip">{internship.employment}</span>
                  <span className="chip">{internship.workMode}</span>
                </div>
              </div>

              <p className="relative mt-6 max-w-3xl text-[0.95rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {internship.summary}
              </p>

              <div className="relative mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
                <div>
                  <h3 className="font-mono text-[0.64rem] uppercase tracking-[0.18em]" style={{ color: 'var(--text-dim)' }}>
                    Responsibilities
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {internship.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ background: 'color-mix(in oklab, var(--purple) 18%, transparent)', color: 'var(--purple-soft)' }}
                        >
                          <Check size={11} strokeWidth={3} />
                        </span>
                        <span className="text-[0.86rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-mono text-[0.64rem] uppercase tracking-[0.18em]" style={{ color: 'var(--text-dim)' }}>
                      Stack
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {internship.stack.map((tech) => (
                        <span key={tech} className="chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-mono text-[0.64rem] uppercase tracking-[0.18em]" style={{ color: 'var(--text-dim)' }}>
                      What the internship is teaching me
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {internship.learning.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[0.82rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          <BookOpen size={13} className="mt-0.5 shrink-0" style={{ color: 'var(--purple-soft)' }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em]" style={{ color: 'var(--text-dim)' }}>
                    Offer ref · {internship.offerRef}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Education */}
      <section className="pb-16" aria-labelledby="education-heading">
        <div className="container-x">
          <Reveal>
            <div className="glass-strong rounded-[1.75rem] p-6 md:p-9">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                    style={{
                      background: 'linear-gradient(150deg, rgba(56,189,248,.2), rgba(139,92,246,.1))',
                      border: '1px solid color-mix(in oklab, var(--blue) 30%, transparent)',
                      color: 'var(--blue)',
                    }}
                  >
                    <GraduationCap size={20} />
                  </span>
                  <div>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em]" style={{ color: 'var(--text-dim)' }}>
                      Education
                    </span>
                    <h2 id="education-heading" className="mt-1.5 font-display text-xl font-semibold md:text-2xl">
                      {education.degree}
                    </h2>
                    <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                      {education.institution} · {education.location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="chip chip-brand">{education.status}</span>
                  {education.period ? <span className="chip">{education.period}</span> : null}
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-[0.95rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {education.summary}
              </p>

              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {education.highlights.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 rounded-xl px-3.5 py-2.5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <Check size={13} className="mt-0.5 shrink-0" style={{ color: '#34d399' }} strokeWidth={3} />
                    <span className="text-[0.82rem] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {!education.period ? (
                <p className="mt-5 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.1em]" style={{ color: 'var(--text-dim)' }}>
                  <Info size={12} />
                  Graduation years intentionally not listed — add them in src/data/journey.js
                </p>
              ) : null}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="section relative" aria-labelledby="timeline-heading">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--border-strong), transparent)' }}
        />
        <div className="container-x">
          <SectionHeading
            eyebrow="Timeline"
            title={<span id="timeline-heading">Internship and <span className="gradient-text">education</span>, in order</span>}
            description="A single rail for the two things that shaped this portfolio. Older history can be appended in the same data file."
          />

          <div className="mt-12 max-w-3xl">
            {[internship, education].map((entry, index) => {
              const isInternship = index === 0
              const Icon = isInternship ? Briefcase : GraduationCap
              const title = isInternship ? `${entry.role} · ${entry.organisation}` : entry.degree
              const period = isInternship ? entry.period : entry.period || 'Duration not published'
              const place = isInternship ? `${entry.location} · ${entry.workMode}` : `${entry.institution} · ${entry.location}`

              return (
                <Reveal key={title} delay={index * 90}>
                  <div className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: 'color-mix(in oklab, var(--purple) 16%, transparent)',
                          border: '1px solid color-mix(in oklab, var(--purple) 38%, transparent)',
                          color: 'var(--purple-soft)',
                        }}
                      >
                        <Icon size={17} />
                      </span>
                      {index === 0 ? (
                        <span
                          className="w-px flex-1"
                          style={{ background: 'linear-gradient(180deg, color-mix(in oklab, var(--purple) 40%, transparent), var(--border))' }}
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>

                    <div className="pb-10">
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em]" style={{ color: 'var(--text-dim)' }}>
                        {period}
                      </span>
                      <h3 className="mt-1.5 font-display text-base font-semibold md:text-lg">{title}</h3>
                      <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                        {place}
                      </p>
                      <p className="mt-2.5 max-w-xl text-[0.85rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {isInternship
                          ? 'Full-time internship contributing to real web and SaaS projects with the product and technology team.'
                          : entry.summary}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="pb-16" aria-labelledby="certifications-heading">
        <div className="container-x">
          <Reveal>
            <div className="glass rounded-[1.5rem] p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: 'color-mix(in oklab, var(--purple) 14%, transparent)', color: 'var(--purple-soft)' }}
                  >
                    <Award size={18} />
                  </span>
                  <div>
                    <h2 id="certifications-heading" className="font-display text-lg font-semibold">
                      Certifications
                    </h2>
                    <p className="mt-1 max-w-xl text-sm" style={{ color: 'var(--text-muted)' }}>
                      None listed yet. This section stays empty by design rather than padded with courses that were
                      started and never finished — it will be filled as certifications are completed.
                    </p>
                  </div>
                </div>
                <span className="chip" style={{ color: 'var(--text-dim)' }}>
                  <Clock size={11} />
                  In progress
                </span>
              </div>

              {certifications.length > 0 ? (
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {certifications.map((cert) => (
                    <li key={cert.title} className="glass p-4">
                      <p className="font-display text-sm font-semibold">{cert.title}</p>
                      <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                        {cert.issuer} {cert.year ? `· ${cert.year}` : ''}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Training / self study */}
      <section className="section pt-0" aria-labelledby="training-heading">
        <div className="container-x">
          <SectionHeading
            eyebrow="Technical training"
            title={<span id="training-heading">Learning done <span className="gradient-text">deliberately</span></span>}
            description="Structured self-study alongside the internship — each area applied in a build rather than left as a certificate."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {selfStudy.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="glass lift h-full p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.65rem]" style={{ color: 'var(--text-dim)' }}>
                      0{index + 1}
                    </span>
                    <Sparkles size={14} style={{ color: 'var(--purple-soft)' }} />
                  </div>
                  <h3 className="mt-3 font-display text-[0.95rem] font-semibold">{item.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.topics.map((topic) => (
                      <span key={topic} className="chip">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {item.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <div className="glass-strong flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center md:p-8">
              <div>
                <h2 className="font-display text-lg font-semibold">Hiring for a junior role?</h2>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                  My resume has the same details in a single page — or just email me.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
                <Link to="/contact" className="btn btn-primary group">
                  Contact me
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a href="/resume/Minhaz-Alam-Resume.pdf" download className="btn btn-ghost">
                  Resume PDF
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
