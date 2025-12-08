import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Press_Start_2P } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/providers'
import { generateBaseMetadata, viewport as viewportConfig, generateOrganizationStructuredData, generateWebsiteStructuredData } from '@/lib/seo'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

// Press Start 2P - Retro pixel font for titles and branding
const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  variable: '--font-press-start',
  weight: '400',
  display: 'swap',
})

// Enhanced SEO metadata
export const metadata: Metadata = generateBaseMetadata()

// Viewport configuration
export const viewport: Viewport = viewportConfig

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationStructuredData()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteStructuredData()),
          }}
        />
      </head>
      <body className={`${jetbrainsMono.variable} ${pressStart2P.variable} font-mono antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
