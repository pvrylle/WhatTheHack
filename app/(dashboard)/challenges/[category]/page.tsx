"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { ChallengeListTemplate } from "@/components/templates"
import { missionPaths } from "@/data/challenges"
import type { ChallengeCardProps } from "@/components/molecules"

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
    window.location.href = `/challenges/${category}/${id}`
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
