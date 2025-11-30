import type { Metadata, ResolvingMetadata } from 'next'
import { missionPaths } from '@/data/challenges'
import { siteConfig } from '@/lib/seo'

type Props = {
  params: Promise<{ category: string }>
}

/**
 * Generate dynamic metadata for challenge category pages
 * Uses ISR pattern - metadata is generated at build time for known categories
 * and on-demand for new categories
 */
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category } = await params
  const mission = missionPaths[category]

  if (!mission) {
    return {
      title: 'Mission Not Found',
      description: 'The requested mission could not be found.',
    }
  }

  const title = `${mission.title} | Challenges`
  const description = `${mission.description} Complete ${mission.totalChallenges} challenges to master ${mission.title.toLowerCase()}.`

  return {
    title,
    description,
    keywords: [
      mission.title.toLowerCase(),
      'challenges',
      'cybersecurity',
      'hacking',
      'learning',
      category.replace(/-/g, ' '),
    ],
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      type: 'website',
      url: `${siteConfig.url}/challenges/${category}`,
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    alternates: {
      canonical: `/challenges/${category}`,
    },
  }
}

/**
 * Generate static params for known challenge categories
 * This enables SSG for all mission paths at build time
 */
export async function generateStaticParams() {
  return Object.keys(missionPaths).map((category) => ({
    category,
  }))
}
