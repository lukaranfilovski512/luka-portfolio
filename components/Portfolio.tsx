import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/Interactive'
import { club, img, type Project, type Visual } from '@/lib/projects'
import { site } from '@/lib/site'

function Picture({ image, className = '', priority = false }: { image: Visual; className?: string; priority?: boolean }) {
  return <div className={`showcase-image ${className}`}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 650px) 68vw, (max-width: 1000px) 42vw, 32vw" quality={90} priority={priority} /></div>
}

export function Showcase({ slug, large = false, priority = false }: { slug: string; large?: boolean; priority?: boolean }) {
  return <div className={`showcase showcase--${slug}${large ? ' showcase--large' : ''}`}>
    {slug === 'metalurg-2025' && <>
      <div className="showcase-meta"><span>FC METALURG 2025</span><span>SPORT / CONTENT / DIGITAL</span></div>
      <Picture image={club('Dfe4RLjMhal','Metalurg full-time result post with real match photography')} className="metalurg-left" />
      <Picture image={club('DfkOkR5spL9','Metalurg team-bus creative composition')} className="metalurg-centre" priority={priority} />
      <Picture image={club('DfwsT6bsDGj','Metalurg starting lineup graphic on navy and white fabric')} className="metalurg-right" />
      <div className="showcase-bottom"><span>СоНашСтилДоВрвот</span><span>2026</span></div>
    </>}
    {slug === 'orevce' && <><Picture image={img('orevce',6,'Orevce family of colour-coded cheese packaging')} className="orevce-family" /><span className="showcase-caption">OREVCE / A FAMILY OF FOUR</span></>}
    {slug === 'battery-evolution' && <><div className="showcase-meta"><span>BATTERY EVOLUTION</span><span>VISUAL COMMUNICATION</span></div><Picture image={img('solar-energy',4,'Solar Energy MK battery product visual')} className="battery-left" /><Picture image={img('battery-evolution',23,'Battery Evolution distribution-network communication')} className="battery-centre" /><Picture image={img('exide',8,'EXIDE battery promotional visual')} className="battery-right" /></>}
    {slug === 'mono-alex' && <><Picture image={img('mono-alex',1,'Mono Alex red fashion campaign visual')} className="mono-left" /><Picture image={img('mono-alex',6,'Mono Alex suede-shoe product composition')} className="mono-right" /><span className="showcase-caption">MONO ALEX / A CONSIDERED VISUAL WORLD</span></>}
    {slug === 'merkur' && <><Picture image={img('merkur',11,'Merkur summer paddleboard campaign')} className="merkur-left" /><Picture image={img('merkur',5,'Merkur green and yellow retail campaign')} className="merkur-right" /></>}
    {slug === 'mowo' && <><Picture image={img('mowo',7,'MoWo iPhone trade-in campaign')} className="mowo-left" /><Picture image={img('mowo',12,'MoWo phone campaign in a travel setting')} className="mowo-right" /></>}
  </div>
}

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return <article className={`project-card${featured ? ' project-card--featured' : ''}`}>
    <Link href={`/work/${project.slug}`} className="project-card-link" aria-label={`View ${project.title} case study`}>
      <div className="project-card-visual"><Showcase slug={project.slug} large={featured} priority={featured} /><span className="card-arrow" aria-hidden="true"><Arrow diagonal /></span></div>
      <div className="project-card-info"><div><div className="project-card-kicker"><span>{project.number}</span><span>{project.category}</span></div><h3>{project.title}</h3><p>{project.cardDescription}</p></div><span className="project-card-cta">View case <Arrow diagonal /></span></div>
    </Link>
  </article>
}

export function SectionTitle({ number, label, title, text }: { number: string; label: string; title: string; text?: string }) {
  return <div className="section-heading"><div className="eyebrow"><span>{number}</span><span>{label}</span></div><div className="section-heading-main"><h2>{title}</h2>{text && <p>{text}</p>}</div></div>
}

export function ContactBand() {
  return <section className="contact-band"><div className="eyebrow"><span>A conversation is a good place to start.</span></div><Link href="/contact" className="contact-band-link"><span>Have something<br />in mind?</span><Arrow diagonal /></Link><div className="contact-band-bottom"><span>Brand identities, packaging, campaigns & digital.</span><span>Let’s make it considered.</span></div></section>
}

export function Footer() {
  return <footer className="site-footer"><div><Link href="/" className="footer-brand">By Karanfilovski</Link><p>Independent design practice.<br />Skopje, North Macedonia.</p></div><div className="footer-links"><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={site.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={`mailto:${site.email}`}>Email ↗</a></div><span className="footer-copyright">© {new Date().getFullYear()} Luka Karanfilovski</span><a className="back-top" href="#top">Back to top ↑</a></footer>
}

export function WebsiteOverview() {
  const photo = club('DfcX4Z8DM9O','Metalurg youth team photograph')
  return <section className="website-section" id="website"><div className="website-intro"><div className="eyebrow">An owned digital home</div><h2>One place to<br />follow the club.</h2><p>The live club website brings together news, fixtures, results, standings, Metalurg TV and galleries, with room to evolve alongside the club.</p><a href={site.clubWebsite} className="underlined-link" target="_blank" rel="noreferrer">Visit FC Metalurg 2025 <Arrow diagonal /></a></div><div className="website-preview"><div className="browser-chrome"><span>● ● ●</span><span>fcmetalurg2025.com</span><span>↗</span></div><div className="club-preview-nav"><strong>METALURG 2025</strong><span>Вести &nbsp; Натпревари &nbsp; Metalurg TV</span></div><div className="club-preview-story"><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 900px) 90vw, 50vw" /><div><span>КЛУБОТ</span><h3>Градиме иднина.<br />СоНашСтилДоВрвот.</h3><p>Вести, натпревари и заедницата на ФК Металург 2025.</p></div></div><div className="club-preview-modules"><div><span>НАТПРЕВАРИ</span><strong>Распоред и резултати</strong></div><div><span>METALURG TV</span><strong>Поблиску до тимот</strong></div><div><span>ГАЛЕРИИ</span><strong>Моменти од теренот</strong></div></div><p className="website-preview-caption">Website overview · The live site is an ongoing club platform.</p></div></section>
}
