import type { Metadata, Viewport } from 'next'
import { Header } from '@/components/Interactive'
import { Footer } from '@/components/Portfolio'
import { site } from '@/lib/site'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Luka Karanfilovski — Brand & Visual Designer', template: '%s — By Karanfilovski' },
  description: 'Independent brand and visual designer based in Skopje. Selected work in identity, packaging, art direction, campaigns and digital communication.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Luka Karanfilovski — Brand & Visual Designer', description: 'Considered identities, packaging, campaigns and digital communication. Explore selected case studies.', url: site.url, siteName: site.brand, type: 'website', locale: 'en_GB', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.ico', apple: '/apple-icon.png' },
}
export const viewport: Viewport = { themeColor: '#f5f3ee', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Person', name: site.name, url: site.url, jobTitle: 'Brand & Visual Designer', address: { '@type': 'PostalAddress', addressLocality: 'Skopje', addressCountry: 'MK' }, sameAs: [site.linkedin, site.instagram], knowsAbout: ['Brand design', 'Packaging', 'Visual communication', 'Art direction', 'Campaign design'] }
  return <html lang="en" data-scroll-behavior="smooth"><body><a className="skip-link" href="#main">Skip to content</a><div id="top" /><Header /><main id="main">{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
