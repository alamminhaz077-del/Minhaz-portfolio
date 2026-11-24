import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { absoluteUrl, defaultOgImage, getSeoForPath } from '../data/seo'

/**
 * Keeps <head> in sync with the current route: title, description, canonical,
 * Open Graph and Twitter tags. The same values are baked into static HTML at
 * build time by scripts/prerender-meta.mjs, so crawlers that don't execute
 * JavaScript still read the right metadata.
 */
export default function Seo({ title, description, path, image = defaultOgImage, noindex = false }) {
  const { pathname } = useLocation()
  const resolvedPath = path ?? pathname
  const fallback = getSeoForPath(resolvedPath)
  const finalTitle = title ?? fallback.title
  const finalDescription = description ?? fallback.description
  const url = absoluteUrl(resolvedPath)
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image)
  const shouldNoindex = noindex || fallback.noindex

  useEffect(() => {
    document.title = finalTitle

    const upsert = (selector, create) => {
      let element = document.head.querySelector(selector)
      if (!element) {
        element = create()
        document.head.appendChild(element)
      }
      return element
    }

    const setMeta = (attr, key, content) => {
      if (content === undefined || content === null) return
      const element = upsert(`meta[${attr}="${key}"]`, () => {
        const meta = document.createElement('meta')
        meta.setAttribute(attr, key)
        document.head.appendChild(meta)
        return meta
      })
      element.setAttribute('content', content)
    }

    setMeta('name', 'description', finalDescription)
    setMeta('name', 'robots', shouldNoindex ? 'noindex, follow' : 'index, follow')
    setMeta('property', 'og:title', finalTitle)
    setMeta('property', 'og:description', finalDescription)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', 'Minhaz Alam — Developer Portfolio')
    setMeta('property', 'og:image', imageUrl)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', finalTitle)
    setMeta('name', 'twitter:description', finalDescription)
    setMeta('name', 'twitter:image', imageUrl)

    const canonical = upsert('link[rel="canonical"]', () => {
      const link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
      return link
    })
    canonical.setAttribute('href', url)
  }, [finalTitle, finalDescription, url, imageUrl, shouldNoindex])

  return null
}
