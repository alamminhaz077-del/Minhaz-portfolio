export default function PageHeader({ eyebrow, title, description, children, meta }) {
  return (
    <section className="relative overflow-hidden pb-10 pt-28 md:pb-14 md:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines opacity-80" />
        <div
          className="orb animate-float"
          style={{
            width: 420,
            height: 420,
            top: -180,
            left: '12%',
            background: 'radial-gradient(circle, var(--glow) 0%, transparent 68%)',
            opacity: 0.9,
          }}
        />
      </div>

      <div className="container-x relative">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1
          className="font-display font-bold"
          style={{ fontSize: 'clamp(2rem, 4.6vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.035em', marginTop: '1.1rem' }}
        >
          {title}
        </h1>
        {description ? (
          <p className="lede mt-5 max-w-2xl">{description}</p>
        ) : null}
        {meta ? <div className="mt-6 flex flex-wrap items-center gap-2.5">{meta}</div> : null}
        {children}
      </div>
    </section>
  )
}
