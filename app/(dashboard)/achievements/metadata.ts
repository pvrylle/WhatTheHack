import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Achievements',
  description: 'Track your cybersecurity achievements and milestones. View earned badges, progress, and compete on the global leaderboard.',
  path: '/achievements',
  keywords: ['achievements', 'badges', 'leaderboard', 'cybersecurity milestones', 'hacking badges'],
})

