import Reveal from './Reveal'

/**
 * Consistent section header: mono eyebrow, display title, optional description
 * and an optional action node on the right.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className = '',
  as = 'h2',
}) {
  const centered = align === 'center'
  const Title = as

  return (
    <div
      className={`flex flex-col gap-5 ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'} ${className}`}
    >
      <Reveal className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <Title className="display-2 mt-4">
          {title}
        </Title>
        {description ? (
          <p className="lede mt-4 max-w-xl" style={{ marginInline: centered ? 'auto' : undefined }}>
            {description}
          </p>
        ) : null}
      </Reveal>

      {action ? (
        <Reveal delay={120} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  )
}
