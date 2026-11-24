import { useEffect, useState } from 'react'
import { BrandMark } from './Brand'
import { profile } from '../data/site'

/**
 * First-paint overlay. It waits for the real `load` event (fonts and the
 * critical bundle) rather than pretending to be busy for a fixed duration, and
 * it always releases after 1.8s so a slow third-party request can never trap
 * the visitor behind a spinner.
 */
export default function BootLoader() {
  const [phase, setPhase] = useState('visible')

  useEffect(() => {
    const startedAt = performance.now()
    let releaseTimer

    const release = () => {
      const remaining = Math.max(0, 420 - (performance.now() - startedAt))
      releaseTimer = setTimeout(() => setPhase('leaving'), remaining)
    }

    if (document.readyState === 'complete') release()
    else window.addEventListener('load', release, { once: true })

    const hardStop = setTimeout(() => setPhase('leaving'), 1800)
    const unmount = setTimeout(() => setPhase('gone'), 2600)

    return () => {
      window.removeEventListener('load', release)
      clearTimeout(releaseTimer)
      clearTimeout(hardStop)
      clearTimeout(unmount)
    }
  }, [])

  if (phase === 'gone') return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5"
      style={{
        backgroundColor: 'var(--bg)',
        opacity: phase === 'visible' ? 1 : 0,
        transition: 'opacity .6s ease',
        pointerEvents: phase === 'visible' ? 'auto' : 'none',
      }}
    >
      <div className="animate-fade-up flex flex-col items-center gap-4">
        <BrandMark size={52} />
        <p className="font-display text-sm font-semibold tracking-tight">{profile.name}</p>
      </div>
      <div className="h-[2px] w-40 overflow-hidden rounded-full" style={{ background: 'var(--border)' }}>
        <div
          className="h-full w-full origin-left rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--purple), var(--blue))',
            animation: 'loader-bar 1.1s cubic-bezier(.4,0,.2,1) forwards',
          }}
        />
      </div>
      <style>{`@keyframes loader-bar{from{transform:scaleX(.05)}to{transform:scaleX(1)}}`}</style>
    </div>
  )
}
