import { useEffect, useRef, useState } from 'react'

/**
 * Types and deletes a rotating list of words.
 * Falls back to a static first word when the visitor prefers reduced motion.
 */
export default function useTypedText(words, { typeSpeed = 78, deleteSpeed = 38, holdTime = 1500 } = {}) {
  const safeWords = words?.length ? words : ['']
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const reduceMotion = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotion.current = query.matches
    if (query.matches) {
      setText(safeWords[0])
      return
    }
    const onChange = (event) => {
      reduceMotion.current = event.matches
      if (event.matches) setText(safeWords[0])
    }
    query.addEventListener?.('change', onChange)
    return () => query.removeEventListener?.('change', onChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (reduceMotion.current) return undefined

    const current = safeWords[index % safeWords.length]
    let timer

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), holdTime)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((value) => (value + 1) % safeWords.length)
    } else {
      const next = deleting ? current.slice(0, Math.max(0, text.length - 1)) : current.slice(0, text.length + 1)
      timer = setTimeout(() => setText(next), deleting ? deleteSpeed : typeSpeed)
    }

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, deleting, index, safeWords.join('|'), typeSpeed, deleteSpeed, holdTime])

  return { text, index }
}
