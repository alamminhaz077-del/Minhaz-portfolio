import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

/**
 * A short, single-tween page transition.
 *
 * GSAP is used for motion that is purely decorative, and the tween is paired
 * with a hard safety clear: if the animation never completes (killed tween,
 * throttled frame loop, reduced motion), the page is made visible anyway.
 * The content is never allowed to depend on a tween finishing.
 */
export default function PageTransition({ children }) {
  const { pathname } = useLocation()
  const ref = useRef(null)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      gsap.set(node, { clearProps: 'all' })
      return undefined
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        node,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'opacity,transform' }
      )
    }, node)

    const safety = setTimeout(() => {
      gsap.set(node, { clearProps: 'opacity,transform' })
    }, 1600)

    return () => {
      clearTimeout(safety)
      context.revert()
    }
  }, [pathname])

  return (
    <div ref={ref} id="page-content">
      {children}
    </div>
  )
}
