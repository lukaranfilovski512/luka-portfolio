import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Arrow, Gallery } from '@/components/Interactive'
import { ContactBand, Showcase, WebsiteOverview } from '@/components/Portfolio'
import { getProject, projects } from '@/lib/projects'
import { site } from '@/lib/site'

export const dynamicParams = false
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return { title: 'Project not found' }
  return { title: `${project.title} — Case Study`, description: project.introduction, alternates: { canonical: `/work/${project.slug}` }, openGraph: { title: `${project.title} — By Karanfilovski`, description: project.introduction, url: `${site.url}/work/${project.slug}`, images: [{ url: `/work/${project.slug}/opengraph-image`, width: 1200, height: 630 }] } }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)
  if (!project) notFound()
  const next = getProject(project.next)!
  return <>
    <header className="case-header wrap"><Link className="back-link" href="/#work">← Selected work</Link><div className="case-eyebrow"><span>{project.number} / {project.category}</span><span>{project.period}</span></div><h1>{project.title}</h1><div className="case-lead"><h2>{project.headline}</h2><p>{project.introduction}</p></div></header>
    <div className="case-hero wrap"><Showcase slug={project.slug} large priority /></div>
    <nav className="case-nav wrap" aria-label="Case study chapters"><a href="#overview">Overview</a><a href="#direction">Direction</a><a href={`#${project.sections[0].id}`}>Applications</a>{project.slug === 'metalurg-2025' && <a href="#website">Website</a>}<a href="#outcome">Outcome</a></nav>
    <section className="case-overview wrap" id="overview"><div className="case-label"><span className="eyebrow">The project</span><h2>Purpose, before<br />the pixels.</h2></div><div className="case-summary"><p className="large-copy">{project.summary}</p><p>{project.challenge}</p><div className="case-facts"><div><span className="small-label">My contribution</span><p>{project.role}</p></div><div><span className="small-label">Scope</span><ul>{project.scope.map(item => <li key={item}>{item}</li>)}</ul></div><div><span className="small-label">Project context</span><p>{project.period}<br />{project.category}</p></div></div></div></section>
    <section className="case-direction wrap" id="direction"><div className="direction-heading"><div className="eyebrow">The design direction</div><h2>{project.directionTitle}</h2><p>{project.direction}</p></div><div className="decisions-grid">{project.decisions.map((decision,index) => <div key={decision.title}><span className="decision-number">0{index+1}</span><h3>{decision.title}</h3><p>{decision.text}</p></div>)}</div></section>
    {project.sections.map((section,index) => <div key={section.id}>
      <section className={`case-gallery-section${section.tone ? ` tone-${section.tone}` : ''}`} id={section.id}><div className="wrap"><div className="gallery-section-heading"><div><div className="eyebrow">{section.eyebrow}</div><h2>{section.title}</h2></div><p>{section.text}</p></div><Gallery images={section.images} layout={section.layout} /></div></section>
      {project.slug === 'metalurg-2025' && index === 1 && <div className="wrap"><WebsiteOverview /></div>}
    </div>)}
    <section className="outcome-section wrap" id="outcome"><div className="eyebrow">The outcome</div><div className="outcome-heading"><h2>{project.outcome.title}</h2><p>{project.outcome.text}</p></div>{project.outcome.metrics && <div className={`metrics-grid metrics-grid--${project.outcome.metrics.length}`}>{project.outcome.metrics.map(metric => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>}{project.outcome.note && <p className="metric-note">{project.outcome.note}</p>}<div className="case-credits"><span className="small-label">Credits & context</span><p>{project.credits}</p>{project.slug === 'metalurg-2025' && <a href={site.clubInstagram} className="underlined-link" target="_blank" rel="noreferrer">Explore the club on Instagram <Arrow diagonal /></a>}</div></section>
    <section className="next-project wrap"><div className="eyebrow">Next case study / {next.number}</div><Link href={`/work/${next.slug}`}><span>{next.title}</span><Arrow diagonal /></Link></section>
    <ContactBand />
  </>
}
