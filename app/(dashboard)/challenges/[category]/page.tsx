'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import { ChallengeListTemplate } from '@/components/templates'
import { missionPaths } from '@/data/challenges'
import { ROUTES } from '@/constants/routes'
import type { ChallengeCardProps } from '@/components/molecules'

// Note: Metadata is exported from metadata.ts for better code organization
// The page uses client-side rendering for interactive features

export default function MissionChallengesPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = use(params)
  const mission = missionPaths[category]

  if (!mission) {
    notFound()
  }

  const challenges: ChallengeCardProps[] = mission.challenges.map((challenge) => ({
    id: challenge.id,
    title: challenge.title,
    description: challenge.description,
    difficulty: challenge.difficulty,
    xpReward: challenge.xpReward,
    timeEstimate: challenge.timeEstimate,
    isCompleted: challenge.isCompleted,
    isUnlocked: challenge.isUnlocked,
    category: challenge.category,
  }))

  const handleChallengeStart = (id: string | number) => {
    window.location.href = ROUTES.DASHBOARD.CHALLENGE_DETAIL(category, id)
  }

  return (
    <ChallengeListTemplate
      missionTitle={mission.title}
      missionDescription={mission.description}
      icon={mission.icon}
      completedChallenges={mission.completedChallenges}
      totalChallenges={mission.totalChallenges}
      challenges={challenges}
      onChallengeStart={handleChallengeStart}
    />
  )
}
