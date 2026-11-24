import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Info, Layers } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import { projectFilters, projects } from '../data/projects'

export default function Projects() {
  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    if (active === 'all') return projects
    return projects.filter((project) => project.filters.includes(active))
  }, [active])

  const activeLabel = projectFilters.find((filter) => filter.id === active)?.label ?? 'All projects'

  return (
    <>
      <Seo path="/projects" />

      <PageHeader
        eyebrow="Projects"
        title={
          <>
            Things I have built, and what each one <span className="gradient-text">taught me</span>
          </>
        }
        description="Five projects, from a furniture storefront to a full MERN build. Every card opens a detail page with the stack, the feature list and the honest status of its links."
        meta={
          <>
            <span className="chip chip-brand">
              <Layers size={12} />
              {projects.length} projects
            </span>
            <span className="chip">{projectFilters.length - 1} technologies</span>
          </>
        }
      />

      <section className="pb-20 md:pb-28">
        <div className="container-x">
          {/* Filters */}
          <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between" style={{ borderColor: 'var(--border)' }}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
              {projectFilters.map((filter) => {
                const count =
                  filter.id === 'all'
                    ? projects.length
                    : projects.filter((project) => project.filters.includes(filter.id)).length
                return (
                  <button
                    key={filter.id}
                    type="button"
                    className="tag-btn"
                    data-active={active === filter.id}
                    aria-pressed={active === filter.id}
                    onClick={() => setActive(filter.id)}
                  >
                    {filter.label}
                    <span className="font-mono text-[0.66rem] opacity-70">{count}</span>
                  </button>
                )
              })}
            </div>

            <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em]" style={{ color: 'var(--text-dim)' }} aria-live="polite">
              Showing {filtered.length} of {projects.length} · {activeLabel}
            </p>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, index) => (
                <Reveal key={`${active}-${project.slug}`} delay={index * 70} className="h-full">
                  <ProjectCard project={project} index={projects.indexOf(project)} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="glass mt-8 flex flex-col items-center gap-3 p-12 text-center">
              <p className="font-display text-base font-semibold">Nothing in this category yet</p>
              <p className="max-w-sm text-sm" style={{ color: 'var(--text-muted)' }}>
                Try another technology, or view everything.
              </p>
              <button type="button" className="btn btn-ghost mt-2" onClick={() => setActive('all')}>
                Show all projects
              </button>
            </div>
          )}

          {/* Link honesty note */}
          <Reveal className="mt-10">
            <div
              className="flex items-start gap-3 rounded-2xl p-4 text-[0.8rem] leading-relaxed"
              style={{
                background: 'color-mix(in oklab, var(--purple) 8%, transparent)',
                border: '1px solid color-mix(in oklab, var(--purple) 22%, transparent)',
                color: 'var(--text-muted)',
              }}
            >
              <Info size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--purple-soft)' }} />
              <p>
                Repository and live-demo links appear only where they genuinely exist. Where a project is not
                published yet, you will see a disabled button instead of a link that leads nowhere — and no project
                here claims to be deployed unless it is.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <div className="glass-strong flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center md:p-8">
              <div>
                <h2 className="font-display text-lg font-semibold">Curious how one of these was built?</h2>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                  Open a project for the full breakdown, or get in touch and ask.
                </p>
              </div>
              <Link to="/contact" className="btn btn-primary group">
                Ask me about it
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
