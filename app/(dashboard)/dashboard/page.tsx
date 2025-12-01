'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/providers/auth-provider'
import { DashboardTemplate } from '@/components/templates'
import { LoadingSkeleton } from '@/components/loading-skeleton'
import { Trophy, Zap, Target, Calendar, TrendingUp } from 'lucide-react'

type Mission = {
  id: string
  title: string
  progress: number
  reward: string
  difficulty: string
  timeLeft: string
  category: string
}

type Achievement = {
  id: number
  title: string
  description: string
  earned: string
  rarity: string
}

type LearningPath = {
  id: string
  name: string
  totalChallenges: number
  completedChallenges: number
  challenges?: { difficulty?: string }[]
}

type ApiAchievement = {
  id?: number
  title: string
  description: string
  earned: boolean
  earned_date?: string
  rarity?: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [missions, setMissions] = useState<Mission[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true)

        const challengesRes = await fetch('/api/challenges')
        const challengesData = await challengesRes.json()

        const missionsList: Mission[] = (challengesData.learningPaths || []).slice(0, 3).map((path: LearningPath) => ({
          id: path.id,
          title: path.name,
          progress: path.totalChallenges > 0 
            ? Math.round((path.completedChallenges / path.totalChallenges) * 100) 
            : 0,
          reward: `${path.totalChallenges * 150} XP`,
          difficulty: path.challenges?.[0]?.difficulty || 'Medium',
          timeLeft: '6h 45m',
          category: path.id,
        }))
        setMissions(missionsList)

        const achievementsRes = await fetch('/api/achievements')
        const achievementsData = await achievementsRes.json()

        const achievementsList = achievementsData?.data?.achievements || achievementsData?.achievements || []
        const recentAchievements: Achievement[] = (Array.isArray(achievementsList) ? achievementsList : [])
          .filter((a: ApiAchievement) => a.earned)
          .slice(0, 3)
          .map((a: ApiAchievement, index: number) => ({
            id: a.id || index + 1,
            title: a.title,
            description: a.description,
            earned: a.earned_date ? formatTimeAgo(new Date(a.earned_date)) : 'Recently',
            rarity: a.rarity || 'Common',
          }))
        
        setAchievements(recentAchievements.length > 0 ? recentAchievements : [
          { id: 1, title: 'First Blood', description: 'Complete first vulnerability', earned: 'Today', rarity: 'Common' },
          { id: 2, title: 'Script Kiddie', description: 'Complete 10 easy challenges', earned: 'Yesterday', rarity: 'Uncommon' },
        ])
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const userStats = {
    level: user?.level || 1,
    xp: user?.xp || 0,
    xpToNext: 3000,
    hacksCompleted: missions.reduce((acc, m) => acc + Math.floor(m.progress / 10), 0) || 47,
    streakDays: 15,
    rank: user?.rank || 'Rookie Hacker',
    totalPoints: user?.xp || 15420,
  }

  const stats = [
    {
      label: 'Level',
      value: userStats.level,
      icon: TrendingUp,
      color: 'primary' as const,
    },
    {
      label: 'Total XP',
      value: userStats.xp.toLocaleString(),
      icon: Zap,
      color: 'secondary' as const,
    },
    {
      label: 'Hacks Completed',
      value: userStats.hacksCompleted,
      icon: Target,
      color: 'success' as const,
    },
    {
      label: 'Streak Days',
      value: userStats.streakDays,
      icon: Calendar,
      color: 'accent' as const,
    },
    {
      label: 'Total Points',
      value: (userStats.totalPoints / 1000).toFixed(1) + 'K',
      icon: Trophy,
      color: 'primary' as const,
    },
  ]

  if (loading) {
    return <LoadingSkeleton variant="page" />
  }

  return (
    <DashboardTemplate
      stats={stats}
      missions={missions}
      achievements={achievements}
      profileData={userStats}
    />
  )
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays === 1) return '1 day ago'
  return `${diffDays} days ago`
}
