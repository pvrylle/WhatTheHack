import { NextResponse } from 'next/server'

// Mock dashboard data
const dashboardData = {
  stats: [
    { label: 'Level', value: 15, icon: 'Star', color: 'primary' },
    { label: 'XP', value: '8,420', icon: 'Zap', color: 'success' },
    { label: 'Completed', value: 24, icon: 'Trophy', color: 'accent' },
    { label: 'Streak', value: '15 days', icon: 'Flame', color: 'secondary' },
    { label: 'Rank', value: '#6', icon: 'TrendingUp', color: 'primary' },
  ],
  missions: [
    {
      id: 1,
      title: 'SQL Injection Mastery',
      progress: 75,
      reward: '+150 XP',
      difficulty: 'Intermediate',
      timeLeft: '2 days left',
      category: 'web-security',
    },
    {
      id: 2,
      title: 'Cross-Site Scripting',
      progress: 40,
      reward: '+200 XP',
      difficulty: 'Advanced',
      timeLeft: '5 days left',
      category: 'web-security',
    },
    {
      id: 3,
      title: 'Network Reconnaissance',
      progress: 90,
      reward: '+100 XP',
      difficulty: 'Beginner',
      timeLeft: '1 day left',
      category: 'network-exploitation',
    },
  ],
  achievements: [
    {
      id: 1,
      title: 'First Blood',
      description: 'Completed first challenge',
      earned: '2 days ago',
      rarity: 'Common',
    },
    {
      id: 2,
      title: 'SQL Master',
      description: 'Mastered SQL injection techniques',
      earned: '1 week ago',
      rarity: 'Rare',
    },
    {
      id: 3,
      title: 'Streak Keeper',
      description: '7 day learning streak',
      earned: 'Yesterday',
      rarity: 'Epic',
    },
  ],
  profile: {
    rank: 'Elite Hacker',
    level: 15,
    xp: 8420,
    xpToNext: 10000,
    hacksCompleted: 24,
    streakDays: 15,
    totalPoints: 8420,
  },
}

// GET /api/dashboard - Get dashboard data
export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      data: dashboardData,
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
