import type { Metadata } from 'next'
import { Playfair_Display, Source_Serif_4, Inter, PT_Serif_Caption } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const ptSerifCaption = PT_Serif_Caption({
  subsets: ['latin'],
  variable: '--font-pt-serif-caption',
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Brown\'s Canyon',
  description: 'Real-time river conditions and information for Brown\'s Canyon',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSerif.variable} ${inter.variable} ${ptSerifCaption.variable}`}>
      <body className="font-source-serif">{children}</body>
    </html>
  )
}
