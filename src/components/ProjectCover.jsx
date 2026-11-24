import { useId } from 'react'

/**
 * Project cover art.
 *
 * These are deliberate abstract compositions, not screenshots — a screenshot
 * I don't have would be a fabrication. Each variant hints at what the project
 * does, and you can drop a real screenshot in later by replacing the component
 * usage with an <img>.
 */

const accents = {
  furniture: '#f59e0b',
  'mini-shop': '#22d3ee',
  dashboard: '#8b5cf6',
  attendance: '#34d399',
  portfolio: '#60a5fa',
  default: '#a78bfa',
}

function Glyph({ variant }) {
  switch (variant) {
    case 'furniture':
      return (
        <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="34" y="12" width="92" height="58" rx="14" />
          <rect x="24" y="56" width="112" height="32" rx="12" />
          <rect x="14" y="42" width="16" height="40" rx="8" />
          <rect x="130" y="42" width="16" height="40" rx="8" />
          <path d="M42 90v12M118 90v12" />
        </g>
      )
    case 'mini-shop':
      return (
        <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M44 44h72l8 60H36z" />
          <path d="M64 46V34a16 16 0 0 1 32 0v12" />
          <path d="M68 74h24" />
        </g>
      )
    case 'dashboard':
      return (
        <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M28 104h104" />
          <rect x="40" y="64" width="15" height="30" rx="6" />
          <rect x="68" y="42" width="15" height="52" rx="6" />
          <rect x="96" y="54" width="15" height="40" rx="6" />
          <path d="M42 26h34" />
        </g>
      )
    case 'attendance':
      return (
        <g strokeWidth="2.5">
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 6 }).map((__, col) => {
              const filled = (row * 6 + col) % 5 !== 0
              return (
                <rect
                  key={`${row}-${col}`}
                  x={28 + col * 18}
                  y={26 + row * 18}
                  width="13"
                  height="13"
                  rx="4"
                  fill={filled ? 'currentColor' : 'none'}
                  opacity={filled ? 0.9 - row * 0.12 : 0.45}
                />
              )
            })
          )}
          <path d="M26 104h108" strokeLinecap="round" />
        </g>
      )
    case 'portfolio':
      return (
        <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="24" y="18" width="112" height="84" rx="10" />
          <path d="M24 40h112" />
          <circle cx="38" cy="29" r="2.4" fill="currentColor" stroke="none" />
          <circle cx="48" cy="29" r="2.4" fill="currentColor" stroke="none" />
          <path d="M56 86V58c0-2 2.4-3 3.8-1.4L80 80l20-23.4c1.4-1.6 3.8-.6 3.8 1.4V86" />
        </g>
      )
    default:
      return (
        <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M80 20 132 48 80 76 28 48z" />
          <path d="M28 76l52 28 52-28" />
          <path d="M28 100l52 28 52-28" opacity="0.5" />
        </g>
      )
  }
}

export default function ProjectCover({ variant = 'default', title = '', className = '' }) {
  const uid = useId().replace(/[:]/g, '')
  const accent = accents[variant] || accents.default

  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label={`${title || 'Project'} cover illustration`}
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d1330" />
          <stop offset="52%" stopColor="#080b18" />
          <stop offset="100%" stopColor="#05060c" />
        </linearGradient>
        <radialGradient id={`glow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`panel-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={`fade-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#05060c" stopOpacity="0" />
          <stop offset="100%" stopColor="#05060c" stopOpacity="0.75" />
        </linearGradient>
        <pattern id={`dots-${uid}`} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill="#ffffff" opacity="0.09" />
        </pattern>
      </defs>

      <rect width="640" height="400" fill={`url(#bg-${uid})`} />
      <rect width="640" height="400" fill={`url(#dots-${uid})`} />
      <circle cx="470" cy="60" r="240" fill={`url(#glow-${uid})`} opacity="0.85" />
      <circle cx="120" cy="360" r="180" fill={`url(#glow-${uid})`} opacity="0.4" />

      {/* Depth panels */}
      <g transform="rotate(-7 320 200)">
        <rect x="126" y="92" width="420" height="256" rx="24" fill="#ffffff" opacity="0.03" stroke="#ffffff" strokeOpacity="0.06" />
      </g>
      <g transform="rotate(5 320 200)">
        <rect x="104" y="74" width="432" height="262" rx="24" fill="#ffffff" opacity="0.04" stroke="#ffffff" strokeOpacity="0.08" />
      </g>

      {/* Main panel */}
      <rect x="88" y="58" width="464" height="284" rx="26" fill={`url(#panel-${uid})`} stroke="#ffffff" strokeOpacity="0.14" />
      <rect x="88" y="58" width="464" height="44" rx="26" fill="#ffffff" opacity="0.045" />
      <rect x="88" y="92" width="464" height="1" fill="#ffffff" opacity="0.1" />
      <circle cx="114" cy="80" r="4.5" fill={accent} opacity="0.9" />
      <circle cx="131" cy="80" r="4.5" fill="#ffffff" opacity="0.18" />
      <circle cx="148" cy="80" r="4.5" fill="#ffffff" opacity="0.18" />
      <rect x="392" y="72" width="140" height="16" rx="8" fill="#ffffff" opacity="0.08" />

      {/* Accent light behind the glyph */}
      <circle cx="320" cy="198" r="104" fill={accent} opacity="0.13" />
      <circle cx="320" cy="198" r="64" fill={accent} opacity="0.1" />

      {/* Glyph */}
      <g
        transform="translate(216 118) scale(1.32)"
        style={{ color: accent }}
        stroke={accent}
        opacity="0.95"
      >
        <Glyph variant={variant} />
      </g>

      <rect x="88" y="240" width="464" height="102" fill={`url(#fade-${uid})`} opacity="0.55" />
    </svg>
  )
}
