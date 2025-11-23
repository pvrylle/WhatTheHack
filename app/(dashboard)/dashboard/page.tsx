'use client'

import { useAuth } from '@/components/providers/auth-provider'
import { DashboardTemplate } from '@/components/templates'
import { Trophy, Zap, Target, Calendar, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()

  const userStats = {
    level: user?.level || 1,
    xp: user?.xp || 0,
    xpToNext: 3000,
    hacksCompleted: 47,
    streakDays: 15,
    rank: user?.rank || 'Rookie Hacker',
    totalPoints: 15420,
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

  const missions = [
    {
      id: 1,
      title: 'SQL Injection Hunter',
      progress: 60,
      reward: '250 XP',
      difficulty: 'Medium',
      timeLeft: '2h 30m',
    },
    {
      id: 2,
      title: 'Buffer Overflow Challenge',
      progress: 30,
      reward: '400 XP',
      difficulty: 'Hard',
      timeLeft: '5h 15m',
    },
    {
      id: 3,
      title: 'XSS Detector',
      progress: 85,
      reward: '150 XP',
      difficulty: 'Easy',
      timeLeft: '45m',
    },
  ]

  const achievements = [
    {
      id: 1,
      title: 'First Blood',
      description: 'Complete first vulnerability',
      earned: '2 hours ago',
      rarity: 'Common',
    },
    {
      id: 2,
      title: 'Script Kiddie',
      description: 'Complete 10 easy challenges',
      earned: '1 day ago',
      rarity: 'Uncommon',
    },
    {
      id: 3,
      title: 'Database Destroyer',
      description: 'Master SQL injection',
      earned: '3 days ago',
      rarity: 'Rare',
    },
  ]

  return (
    <DashboardTemplate
      stats={stats}
      missions={missions}
      achievements={achievements}
      profileData={userStats}
    />
  )
}
