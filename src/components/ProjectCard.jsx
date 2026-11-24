import { Link } from 'react-router-dom'
import { ArrowUpRight, Circle } from 'lucide-react'
import ProjectCover from './ProjectCover'

export default function ProjectCard({ project, index = 0, featured = false }) {
  const hasRepo = Boolean(project.repoUrl)
  const hasDemo = Boolean(project.demoUrl)

  return (
    <article className={`group glass lift edge-light relative overflow-hidden rounded-3xl ${featured ? '' : ''}`}>
      <Link
        to={`/projects/${project.slug}`}
        className="block focus-visible:outline-none"
        aria-label={`${project.title} — read the case study`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <ProjectCover variant={project.cover} title={project.title} />
          </div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(5,6,12,.72), rgba(5,6,12,.05) 55%, transparent)' }}
          />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.12em]"
              style={{
                color: '#e9e4ff',
                background: 'rgba(9,11,22,.62)',
                border: '1px solid rgba(255,255,255,.16)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: project.demoUrl ? '#34d399' : '#a78bfa' }}
              />
              {project.status}
            </span>
          </div>

          <span className="absolute right-4 top-4 font-mono text-[0.66rem] uppercase tracking-[0.14em]" style={{ color: 'rgba(255,255,255,.55)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className={`relative ${featured ? 'p-6 md:p-7' : 'p-5 md:p-6'}`}>
          <div className="flex items-start justify-between gap-4">
            <h3
              className={`font-display font-semibold ${featured ? 'text-xl md:text-2xl' : 'text-lg'} ${featured ? 'min-h-[4rem]' : 'min-h-[3.5rem]'}`}
            >
              {project.title}
            </h3>
            <span
              className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              aria-hidden="true"
            >
              <ArrowUpRight size={15} />
            </span>
          </div>

          <p
            className="mt-2.5 text-sm leading-relaxed"
            style={{
              color: 'var(--text-muted)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.9em',
            }}
          >
            {project.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
            {project.tech.length > 4 ? <span className="chip">+{project.tech.length - 4}</span> : null}
          </div>

          <div
            className="mt-5 flex items-center justify-between border-t pt-4 text-[0.72rem]"
            style={{ borderColor: 'var(--border)', color: 'var(--text-dim)' }}
          >
            <span className="inline-flex items-center gap-3 font-mono uppercase tracking-[0.1em]">
              <span className="inline-flex items-center gap-1.5" title={hasRepo ? 'Repository available' : 'Repository link not added yet'}>
                <Circle size={7} fill={hasRepo ? '#34d399' : 'transparent'} stroke={hasRepo ? '#34d399' : 'currentColor'} />
                Repo
              </span>
              <span className="inline-flex items-center gap-1.5" title={hasDemo ? 'Live demo available' : 'Not deployed yet'}>
                <Circle size={7} fill={hasDemo ? '#34d399' : 'transparent'} stroke={hasDemo ? '#34d399' : 'currentColor'} />
                Live
              </span>
            </span>
            <span className="font-medium" style={{ color: 'var(--text-muted)' }}>
              View details →
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
