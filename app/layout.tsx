import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Space_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/providers'
import { generateBaseMetadata, viewport as viewportConfig, generateOrganizationStructuredData, generateWebsiteStructuredData } from '@/lib/seo'

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
      <body className={`${jetbrainsMono.variable} ${orbitron.variable} font-mono antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
