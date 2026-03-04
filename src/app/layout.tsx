import type { Metadata } from 'next'
import { SITE_NAME, SITE_DOMAIN } from '@/lib/constants'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE_DOMAIN}`),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dinnartec',
    creator: '@dinnartec',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  other: {
    'theme-color': '#000000',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Archivo:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
