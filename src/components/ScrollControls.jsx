import { useEffect, useState } from 'react'

/** Thin gradient bar at the very top that tracks reading progress. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      setProgress(value)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        transform: `scaleX(${progress})`,
        background: 'linear-gradient(90deg, var(--purple), var(--blue))',
        opacity: progress > 0.01 ? 1 : 0,
        transition: 'opacity .3s ease',
      }}
    />
  )
}

/** Floating back-to-top control. */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
      }}
      aria-label="Back to top"
      className="fixed bottom-6 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 md:bottom-8 md:right-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
        pointerEvents: visible ? 'auto' : 'none',
        background: 'color-mix(in oklab, var(--surface-solid) 78%, transparent)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 14px 34px -18px var(--glow)',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
