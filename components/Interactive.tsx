'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Visual } from '@/lib/projects'
import { site } from '@/lib/site'

export function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M3 12h17m-7-7 7 7-7 7'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export function Header() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [open])
  const close = () => { dialog.current?.close(); setOpen(false) }
  return <>
    <header className="site-header">
      <Link href="/" className="brand" aria-label="By Karanfilovski — home"><Image src="/horizontal-logo.png" alt="By Karanfilovski" width={2048} height={537} priority /></Link>
      <span className="header-edition">Independent design practice <span>Est. 2020</span></span>
      <nav className="desktop-nav" aria-label="Main navigation"><Link href="/#work">Work</Link><Link href="/#marks">Marks</Link><Link href="/about">About</Link><Link href="/contact" className="nav-contact">Let’s talk <Arrow diagonal /></Link></nav>
      <button className="mobile-menu-trigger" aria-haspopup="dialog" aria-expanded={open} onClick={() => { dialog.current?.showModal(); setOpen(true) }}>Menu <span aria-hidden="true">☰</span></button>
    </header>
    <dialog ref={dialog} className="menu-dialog" aria-label="Navigation" onClose={() => setOpen(false)}>
      <div className="menu-top"><span>By Karanfilovski</span><button onClick={close} aria-label="Close menu">Close <span aria-hidden="true">×</span></button></div>
      <nav aria-label="Mobile navigation"><Link onClick={close} href="/#work">Selected work <Arrow /></Link><Link onClick={close} href="/#marks">Selected marks <Arrow /></Link><Link onClick={close} href="/about">About Luka <Arrow /></Link><Link onClick={close} href="/contact">Get in touch <Arrow /></Link></nav>
      <a className="menu-email" href={`mailto:${site.email}`}>{site.email}</a>
    </dialog>
  </>
}

export function Gallery({ images, layout = 'two' }: { images: Visual[]; layout?: string }) {
  const [active, setActive] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (active === null) return
    dialog.current?.showModal()
    const before = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = before }
  }, [active === null]) // Open once; changing the active image keeps the dialog open.
  const close = () => { dialog.current?.close(); setActive(null) }
  const step = (direction: number) => setActive(index => index === null ? 0 : (index + direction + images.length) % images.length)
  const current = active === null ? null : images[active]
  return <>
    <div className={`gallery gallery--${layout}`}>
      {images.map((image, index) => <figure key={image.src}>
        <a className="gallery-image" href={image.src} onClick={event => { event.preventDefault(); setActive(index) }} aria-label={`Enlarge: ${image.alt}`}>
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} quality={90} sizes={layout === 'wide' ? '(max-width: 1500px) 94vw, 1440px' : layout === 'three' ? '(max-width: 650px) 94vw, (max-width: 1000px) 46vw, 31vw' : '(max-width: 650px) 94vw, 46vw'} />
          <span className="image-zoom" aria-hidden="true">↗</span>
        </a>
        <figcaption><span>{image.caption || image.alt}</span>{image.source && <a href={image.source} target="_blank" rel="noreferrer">View post ↗</a>}</figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} className="lightbox" aria-label="Image viewer" onClose={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) close() }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); step(1) } if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1) } }}>
      <div className="lightbox-controls"><span>{active !== null ? String(active + 1).padStart(2, '0') : '01'} / {String(images.length).padStart(2, '0')}</span><button onClick={close} aria-label="Close image viewer">Close <span aria-hidden="true">×</span></button></div>
      {current && <div className="lightbox-body"><img src={current.src} alt={current.alt} /><p>{current.caption || current.alt}</p></div>}
      {images.length > 1 && <div className="lightbox-navigation"><button onClick={() => step(-1)} aria-label="Previous image">← Previous</button><button onClick={() => step(1)} aria-label="Next image">Next →</button></div>}
    </dialog>
  </>
}

export function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current) }, [])
  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      if (timeout.current) clearTimeout(timeout.current)
      timeout.current = setTimeout(() => setCopied(false), 2200)
    } catch { window.location.href = `mailto:${site.email}` }
  }
  return <button className="text-button" onClick={copy} aria-live="polite">{copied ? 'Email copied ✓' : 'Copy email ↗'}</button>
}

export function InquiryForm() {
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = `${data.get('type')} enquiry — ${data.get('name')}`
    const body = `Hi Luka,\n\n${data.get('message')}\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company') || '—'}\nProject: ${data.get('type')}\n`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  return <form className="inquiry-form" onSubmit={prepare}>
    <div className="form-row"><label>Your name<input name="name" autoComplete="name" required placeholder="Full name" maxLength={120} /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label></div>
    <div className="form-row"><label>Company (optional)<input name="company" autoComplete="organization" placeholder="Company or organisation" maxLength={150} /></label><label>What do you have in mind?<select name="type" defaultValue="Design project"><option>Design project</option><option>Brand identity</option><option>Packaging</option><option>Campaign & content</option><option>Digital & website</option><option>Role or collaboration</option></select></label></div>
    <label>A little about it<textarea name="message" required rows={5} maxLength={5000} placeholder="The idea, the challenge, the timing. A few lines are a good start." /></label>
    <div className="form-submit"><button className="button button--dark" type="submit">Prepare email <Arrow diagonal /></button><p>This opens a draft in your email app.<br />You can review it before sending.</p></div>
  </form>
}
