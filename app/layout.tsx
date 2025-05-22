import { Metadata } from 'next'
import './global.css'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Zentomorrow',
    template: '%s | Zentomorrow',
  },
  description: 'Zentomorrow is a platform for creating and sharing AI-generated content.',
  openGraph: {
    title: 'Zentomorrow',
    description: 'Zentomorrow is a platform for creating and sharing AI-generated content.',
    url: baseUrl,
    siteName: 'Zentomorrow',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  )
}
