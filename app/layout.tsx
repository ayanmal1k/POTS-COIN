import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'EpiCoin Ecosystem | $POT Luck Community',
  description: 'Welcome to the $POT Luck Community (PLC), a community-driven Solana meme coin built on transparency, organic growth, and real-world charitable impact.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans scroll-smooth`}>
      <body className="font-sans antialiased selection:bg-[#9c3fff] selection:text-white">
        {children}
      </body>
    </html>
  )
}
