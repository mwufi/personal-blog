import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Caveat_Brush } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const caveatBrush = Caveat_Brush({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-caveat-brush',
})

const cx = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'h-full',
        caveatBrush.variable
      )}
    >
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <div className="flex w-full">
          <div className="fixed inset-0 flex justify-center sm:px-8">
            <div className="flex w-full max-w-7xl lg:px-8">
              <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20"></div>
            </div>
          </div>
          <div className="relative flex w-full flex-col">
            <Header />
            <div className="flex-none" style={{ height: 'var(--content-offset)' }}></div>
            <main className="flex-auto">
              {children}
            </main>
            <Footer />
            <Analytics />
            <SpeedInsights />
          </div>
        </div>
      </body>
    </html>
  )
}
