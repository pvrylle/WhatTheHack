import type { Metadata } from 'next'
import { JetBrains_Mono, Space_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/providers'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

// Using Space Mono as fallback for Orbitron (similar monospace styling)
const orbitron = Space_Mono({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WhatTheHack - Master the Art of Ethical Hacking',
  description:
    'Gamified cybersecurity learning platform for ethical hacking education. Interactive challenges, missions, and real-world vulnerability exploitation scenarios.',
  keywords: [
    'cybersecurity',
    'ethical hacking',
    'penetration testing',
    'security training',
    'CTF',
    'hacking challenges',
  ],
  authors: [{ name: 'WhatTheHack Team' }],
  openGraph: {
    title: 'WhatTheHack - Ethical Hacking Platform',
    description: 'Master cybersecurity through interactive challenges and gamified learning',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} ${orbitron.variable} font-mono antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
