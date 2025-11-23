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
      id: 'web-security',
      title: 'Web Application Security',
      progress: 33, // 4 completed out of 12
      reward: '1,200 XP',
      difficulty: 'Medium',
      timeLeft: '6h 45m',
      category: 'web-security',
    },
    {
      id: 'network-exploitation',
      title: 'Network Exploitation',
      progress: 60, // 9 completed out of 15
      reward: '2,100 XP',
      difficulty: 'Hard',
      timeLeft: '4h 20m',
      category: 'network-exploitation',
    },
    {
      id: 'database-security',
      title: 'Database Security',
      progress: 80, // 8 completed out of 10
      reward: '3,200 XP',
      difficulty: 'Medium',
      timeLeft: '1h 15m',
      category: 'database-security',
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
