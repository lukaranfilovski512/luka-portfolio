import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luka Karanfilovski — Brand, Campaign & Digital Design',
  description:
    'Luka Karanfilovski is a multidisciplinary creative designer helping businesses build premium visual identities through branding, social media design, marketing campaigns, and modern UI/UX.',
  generator: 'v0.app',
  keywords: [
    'Luka Karanfilovski',
    'graphic designer',
    'branding',
    'visual identity',
    'social media design',
    'marketing campaigns',
    'UI/UX design',
    'Skopje designer',
  ],
  openGraph: {
    title: 'Luka Karanfilovski — Brand, Campaign & Digital Design',
    description:
      'Premium branding, social media, marketing campaigns and UI/UX design for businesses that want a stronger visual presence.',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#0a0c10',
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
