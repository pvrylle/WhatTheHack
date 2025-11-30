import type { Metadata, ResolvingMetadata } from 'next'
import { getChallengeDetail, missionPaths } from '@/data/challenges'
import { siteConfig } from '@/lib/seo'

type Props = {
  params: Promise<{ category: string; id: string }>
}

/**
 * Generate dynamic metadata for individual challenge pages
 * Uses ISR pattern for optimal performance with dynamic content
 */
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category, id } = await params
  const mission = missionPaths[category]
  const challenge = getChallengeDetail(category, id)

  if (!mission || !challenge) {
    return {
      title: 'Challenge Not Found',
      description: 'The requested challenge could not be found.',
    }
  }

  const title = `${challenge.title} - ${challenge.category} Challenge`
  const description = `${challenge.description}. Difficulty: ${challenge.difficulty}. Earn ${challenge.xpReward} XP.`
  const url = `${siteConfig.url}/challenges/${category}/${id}`

  return {
    title,
    description,
    keywords: [
      challenge.category.toLowerCase(),
      challenge.difficulty.toLowerCase(),
      'hacking challenge',
      'security exercise',
      'cybersecurity',
    ],
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      type: 'website',
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    alternates: {
      canonical: `/challenges/${category}/${id}`,
    },
  }
}

/**
 * Generate static params for all known challenges
 * This enables SSG for challenge detail pages at build time
 */
export async function generateStaticParams() {
  const params: { category: string; id: string }[] = []

  Object.entries(missionPaths).forEach(([categoryKey, mission]) => {
    mission.challenges.forEach((challenge) => {
      params.push({
        category: categoryKey,
        id: challenge.id,
      })
    })
  })

  return params
}
