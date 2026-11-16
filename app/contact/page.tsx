import type { Metadata } from 'next'
import { Arrow, CopyEmail, InquiryForm } from '@/components/Interactive'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Get in touch', description: 'Contact Luka Karanfilovski for brand identities, packaging, campaigns, digital projects, design roles and collaborations.', alternates: { canonical: '/contact' } }

export default function ContactPage() {
  return <div className="contact-page wrap"><header className="page-heading"><div className="eyebrow">Good work starts with a conversation.</div><h1>Let’s make<br />something matter.</h1><p>A new identity, a product launch, a campaign or a role worth talking about. I’d like to hear what you have in mind.</p></header><div className="contact-layout"><section className="contact-details" aria-label="Direct contact"><span className="small-label">Write directly</span><a className="contact-email" href={`mailto:${site.email}`}>luka.karanfilovski512<br />@gmail.com <Arrow diagonal /></a><CopyEmail /><div className="contact-other"><div><span className="small-label">Based in</span><p>{site.location}</p></div><div><span className="small-label">Call</span><a href={`tel:${site.phoneHref}`}>{site.phone}</a></div><div><span className="small-label">Elsewhere</span><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={site.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></div></div></section><section className="contact-form-section"><h2>A few details to get started.</h2><InquiryForm /></section></div></div>
}
