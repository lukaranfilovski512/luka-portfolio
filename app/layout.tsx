import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bykaranfilovski.com/'),
  title: 'Luka Karanfilovski — Creative Lead & Marketing Strategist',
  description:
    'Portfolio of Luka Karanfilovski, a graphic designer, brand designer and marketing creative from Skopje, North Macedonia, specializing in branding, social media design, packaging, advertising visuals, print materials and product-focused campaigns.',
  keywords: [
    'Luka Karanfilovski',
    'By Karanfilovski',
    'Creative Lead',
    'Marketing Strategist',
    'Graphic Designer',
    'Brand Designer',
    'Social Media Design',
    'Packaging Design',
    'Advertising Visuals',
    'Print Design',
    'Skopje North Macedonia',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Luka Karanfilovski — Creative Lead & Marketing Strategist',
    description:
      'Portfolio of Luka Karanfilovski, a graphic designer, brand designer and marketing creative from Skopje, North Macedonia.',
    type: 'website',
    url: 'https://www.bykaranfilovski.com/',
    siteName: 'By Karanfilovski',
    images: [
      {
        url: '/luka-hero.jpg',
        width: 1200,
        height: 1600,
        alt: 'Luka Karanfilovski — By Karanfilovski portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luka Karanfilovski — Creative Lead & Marketing Strategist',
    description:
      'Branding, social media design, packaging, advertising visuals, print materials and product-focused campaigns.',
    images: ['/luka-hero.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo-red-mark.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#050507',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
