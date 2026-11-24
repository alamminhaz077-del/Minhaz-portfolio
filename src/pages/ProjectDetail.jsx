import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Circle,
  ExternalLink,
  Info,
  Layers,
  Lock,
} from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import ProjectCover from '../components/ProjectCover'
import NotFound from './NotFound'
import { getNextProject, getProjectBySlug } from '../data/projects'
import { GithubIcon } from '../components/Brand'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <NotFound />

  const next = getNextProject(slug)

  return (
    <>
      <Seo path={`/projects/${project.slug}`} />

      <article className="pt-28 md:pt-36">
        <div className="container-x">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-medium transition-colors hover:text-[var(--text)]"
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={14} />
            All projects
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip chip-brand">{project.status}</span>
                <span className="chip">{project.year}</span>
                {project.demoUrl ? (
                  <span className="chip" style={{ color: '#34d399' }}>
                    <Circle size={7} fill="currentColor" stroke="none" />
                    Live
                  </span>
                ) : (
                  <span className="chip">Not deployed</span>
                )}
              </div>

              <h1
                className="mt-5 font-display font-bold"
                style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.1rem)', lineHeight: 1.06, letterSpacing: '-0.035em' }}
              >
                {project.title}
              </h1>
              <p className="lede mt-4 max-w-xl">{project.tagline}</p>
            </div>

            <div className="flex flex-wrap gap-2.5 lg:justify-end">
              {project.repoUrl ? (
                <a href={project.repoUrl} target="_blank" rel="noreferrer noopener" className="btn btn-ghost">
                  <GithubIcon size={16} />
                  Repository
                </a>
              ) : (
                <span
                  className="btn btn-ghost cursor-not-allowed"
                  aria-disabled="true"
                  title="Repository link has not been added yet"
                  style={{ opacity: 0.6, borderStyle: 'dashed' }}
                >
                  <GithubIcon size={16} />
                  Repo not published
                </span>
              )}

              {project.demoUrl ? (
                <a href={project.demoUrl} target="_blank" rel="noreferrer noopener" className="btn btn-primary">
                  <ExternalLink size={15} />
                  Live demo
                </a>
              ) : (
                <span
                  className="btn btn-ghost cursor-not-allowed"
                  aria-disabled="true"
                  title="This project is not deployed yet"
                  style={{ opacity: 0.6, borderStyle: 'dashed' }}
                >
                  <Lock size={15} />
                  Demo coming soon
                </span>
              )}
            </div>
          </div>

          <Reveal className="mt-10">
            <div className="glass-strong overflow-hidden rounded-[1.75rem] p-2">
              <div className="overflow-hidden rounded-[1.4rem]">
                <ProjectCover variant={project.cover} title={project.title} className="aspect-[16/9] w-full" />
              </div>
            </div>
            <p className="mt-3 text-center font-mono text-[0.62rem] uppercase tracking-[0.14em]" style={{ color: 'var(--text-dim)' }}>
              Cover illustration · add a real screenshot in <span style={{ color: 'var(--text-muted)' }}>public/images/projects/</span>
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 pb-16 lg:grid-cols-[1.5fr_0.5fr] lg:gap-16">
            <div>
              <h2 className="display-3">Overview</h2>
              <div className="mt-4 space-y-4 text-[0.95rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {project.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <h2 className="display-3 mt-12">Key features</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="glass flex items-start gap-3 p-4">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: 'color-mix(in oklab, #34d399 18%, transparent)', color: '#34d399' }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-[0.85rem] leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-start gap-3 rounded-2xl p-4 text-[0.8rem] leading-relaxed" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <Info size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--purple-soft)' }} />
                <p>
                  This page describes the build as it stands today. Where a link is missing it is because the
                  repository or deployment does not exist yet — nothing here is linked to a placeholder URL.
                </p>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="glass p-5">
                <h2 className="font-mono text-[0.64rem] uppercase tracking-[0.18em]" style={{ color: 'var(--text-dim)' }}>
                  Stack
                </h2>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="my-5 h-px w-full" style={{ background: 'var(--border)' }} />

                <dl className="space-y-3 text-[0.82rem]">
                  <div className="flex items-center justify-between gap-3">
                    <dt style={{ color: 'var(--text-dim)' }}>Status</dt>
                    <dd className="font-medium">{project.status}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt style={{ color: 'var(--text-dim)' }}>Year</dt>
                    <dd className="font-medium">{project.year}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt style={{ color: 'var(--text-dim)' }}>Type</dt>
                    <dd className="font-medium">Solo build</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt style={{ color: 'var(--text-dim)' }}>Repository</dt>
                    <dd className="font-medium">{project.repoUrl ? 'Public' : 'Not published'}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-col gap-2">
                  <a href={`mailto:alamminhaz077@gmail.com?subject=${encodeURIComponent(`Question about ${project.title}`)}`} className="btn btn-ghost w-full text-[0.82rem]">
                    Ask about this build
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {next ? (
                <Link
                  to={`/projects/${next.slug}`}
                  className="glass lift mt-4 flex items-center gap-3 p-4"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: 'color-mix(in oklab, var(--purple) 14%, transparent)', color: 'var(--purple-soft)' }}
                  >
                    <Layers size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[0.58rem] uppercase tracking-[0.16em]" style={{ color: 'var(--text-dim)' }}>
                      Next project
                    </span>
                    <span className="mt-0.5 block truncate text-[0.85rem] font-medium">{next.title}</span>
                  </span>
                  <ArrowRight size={15} className="ml-auto shrink-0" style={{ color: 'var(--text-dim)' }} />
                </Link>
              ) : null}
            </aside>
          </div>
        </div>
      </article>
    </>
  )
}
