import type { Metadata } from 'next'
import Image from 'next/image'
import { Arrow } from '@/components/Interactive'
import { ContactBand } from '@/components/Portfolio'
import { experience } from '@/lib/site'

export const metadata: Metadata = { title: 'About Luka', description: 'Meet Luka Karanfilovski, an independent brand and visual designer based in Skopje. Experience, approach and selected areas of practice.', alternates: { canonical: '/about' } }

export default function AboutPage() {
  return <>
    <header className="page-heading wrap"><div className="eyebrow">About the practice</div><h1>A curious mind.<br />A considered eye.</h1><p>I’m Luka Karanfilovski, a brand and visual designer based in Skopje, North Macedonia.</p></header>
    <section className="about-intro wrap"><div className="about-portrait"><Image unoptimized src="/luka-hero.jpg" alt="Portrait of Luka Karanfilovski" width={2048} height={849} sizes="(max-width: 750px) 94vw, 45vw" priority /></div><div className="about-story"><span className="small-label">Independent since 2020</span><h2>I like the idea that<br />connects the parts.</h2><p>My work moves between brand identities, packaging, campaign visuals and digital communication. The common thread is a clear idea, carried carefully from the bigger picture to the individual detail.</p><p>I combine graphic design with marketing thinking, shaping how a product, a message or an organisation is presented across different contexts.</p><p>Recent work spans food packaging, fashion, automotive and energy communication, retail campaigns and the developing digital presence of FC Metalurg 2025.</p><a className="button button--dark" href="/Luka_Karanfilovski_Profile.pdf" download>Download profile <Arrow diagonal /></a></div></section>
    <section className="practice-section wrap"><div className="eyebrow">Areas of practice</div><div className="practice-grid"><div><span>01</span><h3>Identity & packaging</h3><p>Marks, wordmarks, visual identities, product ranges and label design.</p></div><div><span>02</span><h3>Campaign & content</h3><p>Art direction, campaign concepts, product imagery and commercial communication.</p></div><div><span>03</span><h3>Digital experiences</h3><p>Website design, digital presentation and connected brand touchpoints.</p></div></div></section>
    <section className="experience-section wrap"><div className="section-heading-main"><div><div className="eyebrow">Selected experience</div><h2>Built through<br />real work.</h2></div><p>A combination of independent practice, brand-side creative work and design-team experience.</p></div><div className="experience-list">{experience.map(item => <article key={item.company}><span>{item.period}</span><div><h3>{item.company}</h3><h4>{item.role}</h4></div><p>{item.detail}</p></article>)}</div></section>
    <section className="education-section wrap"><div className="eyebrow">Education</div><div><h2>Academy for Design<br />Graphic Design</h2><p>Skala School by Djolev and the Arts<br />Skopje · 2023—2024</p><a href="/skala-graphic-design-diploma.jpg" target="_blank" rel="noreferrer" className="underlined-link">View certificate <Arrow diagonal /></a></div></section>
    <ContactBand />
  </>
}
