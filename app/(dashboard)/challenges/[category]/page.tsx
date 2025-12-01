'use client'

import { use, useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Shield, Target, Database, Globe } from 'lucide-react'
import { ChallengeListTemplate } from '@/components/templates'
import { ROUTES } from '@/constants/routes'
import type { ChallengeCardProps } from '@/components/molecules'
import { LoadingSkeleton } from '@/components/loading-skeleton'

const categoryIcons: Record<string, typeof Shield> = {
  'web-security': Shield,
  'network-exploitation': Target,
  'database-security': Database,
  'osint': Globe,
}

type CategoryData = {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

type ChallengeData = {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  xp_reward: number
  time_estimate: string
  is_completed: boolean
  is_unlocked: boolean
  category_id: string
}

export default function MissionChallengesPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = use(params)
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null)
  const [challenges, setChallenges] = useState<ChallengeData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch(`/api/challenges/${category}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('not-found')
            return
          }
          throw new Error('Failed to fetch challenges')
        }
        
        const data = await response.json()
        setCategoryData(data.category)
        setChallenges(data.challenges || [])
      } catch (err) {
        console.error('Error fetching challenges:', err)
        setError('Failed to load challenges')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category])

  if (loading) {
    return <LoadingSkeleton variant="card" />
  }

  if (error === 'not-found' || !categoryData) {
    notFound()
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  const Icon = categoryIcons[category] || Shield
  const completedCount = challenges.filter(c => c.is_completed).length

  const challengeCards: ChallengeCardProps[] = challenges.map((challenge) => ({
    id: challenge.id,
    title: challenge.title,
    description: challenge.description,
    difficulty: challenge.difficulty,
    xpReward: challenge.xp_reward,
    timeEstimate: challenge.time_estimate,
    isCompleted: challenge.is_completed,
    isUnlocked: challenge.is_unlocked,
    category: categoryData.name,
  }))

  const handleChallengeStart = (id: string | number) => {
    window.location.href = ROUTES.DASHBOARD.CHALLENGE_DETAIL(category, id)
  }

  return (
    <ChallengeListTemplate
      missionTitle={categoryData.name}
      missionDescription={categoryData.description}
      icon={Icon}
      completedChallenges={completedCount}
      totalChallenges={challenges.length}
      challenges={challengeCards}
      onChallengeStart={handleChallengeStart}
    />
  )
}
