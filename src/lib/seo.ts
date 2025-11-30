import type { Metadata, Viewport } from 'next'

/**
 * SEO Configuration and Metadata Utilities
 * 
 * This module provides centralized SEO configuration and helper functions
 * for generating consistent metadata across the application.
 */

// Site-wide configuration
export const siteConfig = {
  name: 'WhatTheHack',
  description: 'Master the Art of Ethical Hacking through interactive challenges and gamified learning',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://whatthehack.dev',
  ogImage: '/og-image.png',
  twitterHandle: '@whatthehack',
  creator: 'WhatTheHack Team',
  keywords: [
    'cybersecurity',
    'ethical hacking',
    'penetration testing',
    'security training',
    'CTF',
    'hacking challenges',
    'web security',
    'network security',
    'cryptography',
    'security education',
    'learn hacking',
    'cybersecurity courses',
  ],
}

// Default viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

/**
 * Generate base metadata for the site
 */
export function generateBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} - Master the Art of Ethical Hacking`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Ethical Hacking Platform`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
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
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    alternates: {
      canonical: siteConfig.url,
    },
  }
}

/**
 * Generate page-specific metadata
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
  keywords = [],
}: {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
  keywords?: string[]
}): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image || siteConfig.ogImage

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  }
}

/**
 * Generate metadata for challenge pages
 */
export function generateChallengeMetadata({
  title,
  description,
  category,
  difficulty,
  xpReward,
}: {
  title: string
  description: string
  category: string
  difficulty: string
  xpReward: number
}): Metadata {
  return generatePageMetadata({
    title: `${title} - ${category} Challenge`,
    description: `${description}. Difficulty: ${difficulty}. Earn ${xpReward} XP.`,
    keywords: [
      category.toLowerCase(),
      difficulty.toLowerCase(),
      'hacking challenge',
      'security exercise',
    ],
  })
}

/**
 * Generate structured data for rich search results
 */
export function generateCourseStructuredData(challenge: {
  title: string
  description: string
  category: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: challenge.title,
    description: challenge.description,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    courseCode: challenge.category,
    educationalCredentialAwarded: 'Digital Badge',
    isAccessibleForFree: true,
    teaches: challenge.category,
  }
}

/**
 * Generate organization structured data
 */
export function generateOrganizationStructuredData(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo-wth 1.svg`,
    description: siteConfig.description,
    sameAs: [
      'https://twitter.com/whatthehack',
      'https://github.com/whatthehack',
    ],
  }
}

/**
 * Generate website structured data
 */
export function generateWebsiteStructuredData(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/challenges?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
