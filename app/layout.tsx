import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/smooth-scroll'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-body',
  display: 'swap',
})

const SITE_URL = 'https://epicoin.ai'
const SITE_TITLE = '$POT Luck Community (PLC) | EpiCoin Ecosystem'
const SITE_DESC =
  'A transparent, community-driven Solana meme coin combining 3% SOL reflection rewards with charitable donations to St. Jude Children\'s Research Hospital. Contract: GUtUrPGwfJDj3WTb2dEe2B9UnLtG1GGdBMreFtDXJxEw'

export const viewport: Viewport = {
  themeColor: '#120326',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | $POT Luck Community',
  },
  description: SITE_DESC,
  applicationName: '$POT Luck Community',
  authors: [{ name: 'EpiCoin AI / World Park', url: SITE_URL }],
  generator: 'Next.js',
  keywords: [
    '$POT',
    'POT Luck',
    'PLC',
    'EpiCoin',
    'EpiCoin AI',
    'Solana meme coin',
    'SOL reflections',
    'St. Jude Children Research Hospital',
    'Crypto Charity',
    'Solana DeFi',
    'SPL Token',
    'Transparent crypto',
    'GUtUrPGwfJDj3WTb2dEe2B9UnLtG1GGdBMreFtDXJxEw',
  ],
  creator: 'EpiCoin AI',
  publisher: 'EpiCoin AI / World Park',
  category: 'finance',
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/icon.png'],
    apple: [{ url: '/icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'EpiCoin Ecosystem | $POT Luck Community',
    title: '$POT Luck Community (PLC) | Two Utilities. One Mission.',
    description: SITE_DESC,
    images: [
      {
        url: '/hero-bg.webp',
        width: 1912,
        height: 1029,
        alt: '$POT Luck Community - EpiCoin Ecosystem Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '$POT Luck Community (PLC) | Two Utilities. One Mission.',
    description: SITE_DESC,
    site: '@epicoinai',
    creator: '@epicoinai',
    images: ['/hero-bg.webp'],
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
}: Readonly<{
  children: React.ReactNode
}>) {
  // Structured JSON-LD schema for search engines
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EpiCoin AI / $POT Luck Community',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    sameAs: [
      'https://x.com/epicoinai',
      'https://t.me/epicoins',
    ],
    description: SITE_DESC,
  }

  return (
    <html lang="en" className={`${poppins.variable} font-sans scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-[#9c3fff] selection:text-white">
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
