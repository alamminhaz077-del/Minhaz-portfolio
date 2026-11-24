import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Compass,
  GraduationCap,
  MapPin,
  Sparkles,
  Target,
} from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { careerGoals, education, internship, journeyTimeline, selfStudy } from '../data/journey'
import { profile } from '../data/site'

export default function About() {
  const facts = [
    { icon: MapPin, label: 'Based in', value: profile.location },
    { icon: GraduationCap, label: 'Education', value: `${education.shortName} · ${education.institution}` },
    { icon: Briefcase, label: 'Currently', value: `${internship.role} at ${internship.organisation}` },
    { icon: Compass, label: 'Looking for', value: 'Frontend / React / MERN roles' },
  ]

  return (
    <>
      <Seo path="/about" />

      <PageHeader
        eyebrow="About me"
        title={
          <>
            I build interfaces, then I try to understand <span className="gradient-text">why they work</span>.
          </>
        }
        description="A BCA graduate from Delhi NCR who moved from static HTML into component-driven React, and is now building out the backend half of the stack. This page is the long version — how I got here, what I am working on, and where I want to go."
      />

      <section className="section pt-0">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <Reveal>
                <h2 className="display-3">The short version</h2>
                <div className="mt-5 space-y-4 text-[0.97rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  <p>
                    My name is Minhaz Alam. I am a web developer based in Delhi NCR with a Bachelor of Computer
                    Applications from Maharshi Dayanand University. Most of my work is frontend: React components,
                    Tailwind layouts, and the small interaction details that decide whether an interface feels
                    considered or thrown together.
                  </p>
                  <p>
                    I did not start with a plan to become a developer. I started by being annoyed that I could not
                    make a page look the way I had imagined it. That annoyance turned into evenings of reading
                    documentation, rebuilding layouts I liked, and slowly learning that the interesting part is not
                    the pixels — it is the structure underneath them.
                  </p>
                  <p>
                    Today I am a Web Development Intern at KodeToCareer in Noida, working on real web and SaaS
                    projects with the product and technology team. Outside of that I build full-stack projects on the
                    MERN stack, because a frontend that invents its own data only teaches you half the job.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100} className="mt-8">
                <div className="glass p-5 md:p-6">
                  <div className="flex items-center gap-2">
                    <Sparkles size={15} style={{ color: 'var(--purple-soft)' }} />
                    <h3 className="font-display text-sm font-semibold">What I care about in code</h3>
                  </div>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {[
                      'Components that are obvious to reuse',
                      'Spacing and type that hold up on a phone',
                      'Buttons that actually do something',
                      'Code the next developer can read',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: 'var(--purple)' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <Reveal delay={120}>
                <div className="glass-strong edge-light overflow-hidden p-6">
                  <span className="font-mono text-[0.64rem] uppercase tracking-[0.18em]" style={{ color: 'var(--text-dim)' }}>
                    Quick facts
                  </span>
                  <ul className="mt-5 space-y-4">
                    {facts.map((fact) => (
                      <li key={fact.label} className="flex items-start gap-3">
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: 'color-mix(in oklab, var(--purple) 13%, transparent)', color: 'var(--purple-soft)' }}
                        >
                          <fact.icon size={15} />
                        </span>
                        <div className="min-w-0">
                          <span className="block font-mono text-[0.6rem] uppercase tracking-[0.14em]" style={{ color: 'var(--text-dim)' }}>
                            {fact.label}
                          </span>
                          <span className="mt-0.5 block text-[0.86rem] leading-snug">{fact.value}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t pt-5" style={{ borderColor: 'var(--border)' }}>
                    <a href={profile.resumePath} download className="btn btn-primary w-full">
                      Download resume
                    </a>
                    <Link to="/contact" className="btn btn-ghost mt-2.5 w-full">
                      Get in touch
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section relative" aria-labelledby="journey-heading">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--border-strong), transparent)' }}
        />
        <div className="container-x">
          <SectionHeading
            eyebrow="My journey"
            title={<span id="journey-heading">From curiosity to <span className="gradient-text">committed practice</span></span>}
            description="Six stages, honestly labelled. The dates that matter are on the experience page; these are the turning points."
          />

          <div className="mt-12 grid gap-x-12 gap-y-2 lg:grid-cols-2">
            {journeyTimeline.map((entry, index) => (
              <Reveal key={entry.step} delay={(index % 2) * 90}>
                <div className="relative flex gap-5 py-5">
                  <div className="flex flex-col items-center">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-[0.7rem] font-semibold"
                      style={{
                        background: 'color-mix(in oklab, var(--purple) 16%, transparent)',
                        border: '1px solid color-mix(in oklab, var(--purple) 38%, transparent)',
                        color: 'var(--purple-soft)',
                      }}
                    >
                      {entry.step}
                    </span>
                    <span
                      className="mt-2 w-px flex-1"
                      style={{ background: 'linear-gradient(180deg, color-mix(in oklab, var(--purple) 40%, transparent), transparent)' }}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="pb-2">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em]" style={{ color: 'var(--text-dim)' }}>
                      {entry.label}
                    </span>
                    <h3 className="mt-1.5 font-display text-lg font-semibold">{entry.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {entry.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="section" aria-labelledby="goals-heading">
        <div className="container-x">
          <SectionHeading
            eyebrow="Direction"
            title={<span id="goals-heading">What I am working <span className="gradient-text">towards</span></span>}
            description="Three things, in order. No five-year plan that pretends to know more than it does."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {careerGoals.map((goal, index) => (
              <Reveal key={goal.title} delay={index * 90}>
                <div className="glass lift h-full p-6">
                  <span className="font-mono text-[0.65rem]" style={{ color: 'var(--text-dim)' }}>
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 font-display text-base font-semibold">{goal.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {goal.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How I learn */}
      <section className="section pt-0" aria-labelledby="learning-heading">
        <div className="container-x">
          <SectionHeading
            eyebrow="Continuous learning"
            title={<span id="learning-heading">How I actually <span className="gradient-text">learn</span></span>}
            description="Documentation first, then a build that forces the concept to stick. Tutorials are a starting point, not the finish line."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {selfStudy.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="glass h-full p-5">
                  <div className="flex items-center gap-2">
                    <BookOpen size={15} style={{ color: 'var(--purple-soft)' }} />
                    <h3 className="font-display text-sm font-semibold">{item.title}</h3>
                  </div>
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
            <div
              className="glass-strong flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center md:p-8"
              style={{ boxShadow: '0 40px 100px -60px var(--glow)' }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: 'color-mix(in oklab, var(--purple) 16%, transparent)', color: 'var(--purple-soft)' }}
                >
                  <Target size={18} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold">See the work, not just the words</h3>
                  <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                    Projects, stack and experience are all documented page by page.
                  </p>
                </div>
              </div>
              <div className="flex w-full gap-2.5 sm:w-auto">
                <Link to="/projects" className="btn btn-primary group flex-1 sm:flex-none">
                  Projects
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link to="/experience" className="btn btn-ghost flex-1 sm:flex-none">
                  Experience
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
