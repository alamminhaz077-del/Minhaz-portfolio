import { useMemo, useRef, useState } from 'react'
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { availabilityNote, profile, socials } from '../data/site'
import { GithubIcon, LinkedinIcon } from '../components/Brand'

/**
 * ── Contact delivery ────────────────────────────────────────────────────────
 * There are two honest modes:
 *
 *  1. VITE_CONTACT_ENDPOINT set (Formspree / Web3Forms / your own API):
 *     the form POSTs JSON and reports exactly what the endpoint reported.
 *
 *  2. No endpoint (default): the form validates the message and opens the
 *     visitor's own email client pre-filled via `mailto:`. Nothing is sent from
 *     the page, and the UI says so — there is no fake success message.
 *
 * See .env.example and README.md for setup.
 */
const ENDPOINT = (import.meta.env.VITE_CONTACT_ENDPOINT || '').trim()

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

const emptyForm = { name: '', email: '', subject: '', message: '', company: '' }

const validate = (values) => {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please tell me your name.'
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.subject.trim().length < 3) errors.subject = 'A short subject helps me reply faster.'
  if (values.message.trim().length < 15) errors.message = 'A little more detail, please — at least 15 characters.'
  return errors
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const [serverError, setServerError] = useState('')
  const [copied, setCopied] = useState(false)
  const formRef = useRef(null)

  const mailtoHref = useMemo(() => {
    const subject = values.subject.trim() || 'Portfolio enquiry'
    const body = `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`
    return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [values])

  const update = (field) => (event) => {
    const { value } = event.target
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
    if (status !== 'idle') setStatus('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (values.company) return // honeypot caught a bot

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0]
      const node = formRef.current?.querySelector(`[name="${firstField}"]`)
      node?.focus()
      return
    }

    if (!ENDPOINT) {
      // Honest fallback: hand the message to the visitor's email client.
      window.location.href = mailtoHref
      setStatus('mailto')
      return
    }

    setStatus('sending')
    setServerError('')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error(`The form service responded with ${response.status}.`)
      }

      setStatus('sent')
      setValues(emptyForm)
    } catch (error) {
      setStatus('error')
      setServerError(error.message || 'Something went wrong while sending.')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const channels = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      action: 'Write to me',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phoneHref}`,
      action: 'Call',
    },
    {
      icon: GithubIcon,
      label: 'GitHub',
      value: socials.github.handle,
      href: socials.github.url,
      action: 'View code',
      external: true,
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: 'minhaz-alam',
      href: socials.linkedin.url,
      action: 'Connect',
      external: true,
    },
  ]

  return (
    <>
      <Seo path="/contact" />

      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let’s work <span className="gradient-text">together</span>
          </>
        }
        description="I am looking for a first full-time role as a frontend, React or MERN stack developer — and I am always happy to talk about a project. Email is the fastest way to reach me."
        meta={
          <>
            <span className="chip chip-brand">
              <Clock size={12} />
              Replies within a day
            </span>
            <span className="chip">
              <MapPin size={12} />
              {profile.location}
            </span>
            <span className="chip">Open to remote &amp; hybrid</span>
          </>
        }
      />

      <section className="pb-20 md:pb-28">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Form */}
            <Reveal>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="glass-strong rounded-[1.75rem] p-6 md:p-8"
                aria-label="Contact form"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-lg font-semibold">Send a message</h2>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em]" style={{ color: 'var(--text-dim)' }}>
                    {ENDPOINT ? 'Direct delivery' : 'Opens your mail app'}
                  </span>
                </div>
                <p className="mt-2 text-[0.82rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {ENDPOINT
                    ? 'Messages are delivered straight to my inbox.'
                    : 'This form does not send anything by itself. It opens your email app with the message filled in, so you can read it once before sending.'}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="field"
                      placeholder="Your name"
                      value={values.name}
                      onChange={update('name')}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      required
                    />
                    {errors.name ? (
                      <p id="name-error" className="mt-1.5 flex items-center gap-1.5 text-[0.72rem]" style={{ color: '#f87171' }}>
                        <AlertCircle size={12} />
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="field-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="field"
                      placeholder="you@company.com"
                      value={values.email}
                      onChange={update('email')}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      required
                    />
                    {errors.email ? (
                      <p id="email-error" className="mt-1.5 flex items-center gap-1.5 text-[0.72rem]" style={{ color: '#f87171' }}>
                        <AlertCircle size={12} />
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="field-label" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="field"
                    placeholder="Frontend role at …"
                    value={values.subject}
                    onChange={update('subject')}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    required
                  />
                  {errors.subject ? (
                    <p id="subject-error" className="mt-1.5 flex items-center gap-1.5 text-[0.72rem]" style={{ color: '#f87171' }}>
                      <AlertCircle size={12} />
                      {errors.subject}
                    </p>
                  ) : null}
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between">
                    <label className="field-label" htmlFor="message">
                      Message
                    </label>
                    <span className="font-mono text-[0.62rem]" style={{ color: 'var(--text-dim)' }}>
                      {values.message.length}/1500
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    maxLength={1500}
                    className="field resize-y"
                    placeholder="A little about the role or project, and what you would like to know."
                    value={values.message}
                    onChange={update('message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    required
                  />
                  {errors.message ? (
                    <p id="message-error" className="mt-1.5 flex items-center gap-1.5 text-[0.72rem]" style={{ color: '#f87171' }}>
                      <AlertCircle size={12} />
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                {/* Honeypot — hidden from people, attractive to bots */}
                <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={update('company')} />
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send message
                      </>
                    )}
                  </button>
                  <a href={`mailto:${profile.email}`} className="btn btn-quiet">
                    or email me directly
                    <ArrowUpRight size={14} />
                  </a>
                </div>

                {/* Status — only real outcomes are reported */}
                <div aria-live="polite" className="mt-4">
                  {status === 'sent' ? (
                    <div className="flex items-start gap-2.5 rounded-xl p-3.5 text-[0.8rem]" style={{ background: 'rgba(52,211,153,.1)', border: '1px solid rgba(52,211,153,.32)', color: '#6ee7b7' }}>
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                      <span>Message delivered. I will reply to the address you provided.</span>
                    </div>
                  ) : null}

                  {status === 'mailto' ? (
                    <div className="flex items-start gap-2.5 rounded-xl p-3.5 text-[0.8rem]" style={{ background: 'color-mix(in oklab, var(--purple) 10%, transparent)', border: '1px solid color-mix(in oklab, var(--purple) 30%, transparent)', color: 'var(--text-muted)' }}>
                      <Mail size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--purple-soft)' }} />
                      <span>
                        Your email app should be open with the message ready — press send there to reach me. Nothing
                        was transmitted from this page.{' '}
                        <a href={mailtoHref} className="link-underline font-medium">
                          Open it again
                        </a>{' '}
                        or copy the address below.
                      </span>
                    </div>
                  ) : null}

                  {status === 'error' ? (
                    <div className="flex items-start gap-2.5 rounded-xl p-3.5 text-[0.8rem]" style={{ background: 'rgba(248,113,113,.1)', border: '1px solid rgba(248,113,113,.32)', color: '#fca5a5' }}>
                      <AlertCircle size={15} className="mt-0.5 shrink-0" />
                      <span>
                        {serverError} Your message was not sent. Please use{' '}
                        <a href={`mailto:${profile.email}`} className="link-underline font-medium">
                          {profile.email}
                        </a>{' '}
                        instead.
                      </span>
                    </div>
                  ) : null}
                </div>

                <p className="mt-5 flex items-start gap-2 text-[0.7rem] leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                  <ShieldCheck size={13} className="mt-0.5 shrink-0" />
                  Your details are used only to reply to this message. No newsletter, no tracking pixels, no third-party
                  analytics on this page.
                </p>
              </form>
            </Reveal>

            {/* Details */}
            <div className="space-y-4">
              <Reveal delay={80}>
                <div className="glass-strong p-6">
                  <h2 className="font-display text-lg font-semibold">Direct channels</h2>
                  <p className="mt-1.5 text-[0.82rem]" style={{ color: 'var(--text-muted)' }}>
                    Pick whichever is easiest — all of them reach me.
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {channels.map((channel) => (
                      <li key={channel.label}>
                        <a
                          href={channel.href}
                          {...(channel.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                          className="group flex items-center gap-3.5 rounded-xl p-3 transition-colors"
                          style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
                        >
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                            style={{ background: 'color-mix(in oklab, var(--purple) 13%, transparent)', color: 'var(--purple-soft)' }}
                          >
                            <channel.icon size={17} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-mono text-[0.58rem] uppercase tracking-[0.16em]" style={{ color: 'var(--text-dim)' }}>
                              {channel.label}
                            </span>
                            <span className="mt-0.5 block truncate text-[0.85rem] font-medium">{channel.value}</span>
                          </span>
                          <span className="shrink-0 text-[0.7rem] opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'var(--purple-soft)' }}>
                            {channel.action}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="mt-4 inline-flex items-center gap-2 text-[0.78rem] transition-colors hover:text-[var(--text)]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {copied ? <Check size={13} style={{ color: '#34d399' }} /> : <Copy size={13} />}
                    {copied ? 'Email address copied' : 'Copy email address'}
                  </button>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="glass p-6">
                  <h2 className="font-mono text-[0.64rem] uppercase tracking-[0.18em]" style={{ color: 'var(--text-dim)' }}>
                    What I am looking for
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {availabilityNote.lookingFor.map((role) => (
                      <span key={role} className="chip chip-brand">
                        {role}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-[0.8rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {availabilityNote.based}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[0.75rem]" style={{ color: 'var(--text-dim)' }}>
                    <Clock size={12} />
                    Usually replies within one working day.
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div
                  className="rounded-2xl p-5 text-[0.78rem] leading-relaxed"
                  style={{
                    background: 'color-mix(in oklab, var(--purple) 8%, transparent)',
                    border: '1px solid color-mix(in oklab, var(--purple) 24%, transparent)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <p className="font-medium" style={{ color: 'var(--text)' }}>
                    A note on this form
                  </p>
                  <p className="mt-1.5">
                    It never shows a &ldquo;message sent&rdquo; confirmation it cannot back up. If the site is
                    configured with a form endpoint, you get a real delivery confirmation; otherwise it hands the
                    message to your own email client.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
