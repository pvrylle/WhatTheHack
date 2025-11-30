import { NextResponse } from 'next/server'

// Mock achievements data
const achievements = [
  {
    id: 1,
    title: 'First Blood',
    description: 'Complete your first hacking challenge',
    icon: '🎯',
    category: 'Milestone',
    earned: true,
    rarity: 'Common',
    points: 50,
    earnedDate: '2025-01-15',
  },
  {
    id: 2,
    title: 'SQL Injection Master',
    description: 'Successfully exploit 10 SQL injection vulnerabilities',
    icon: '💉',
    category: 'Web Security',
    earned: true,
    rarity: 'Rare',
    points: 250,
    earnedDate: '2025-02-10',
  },
  {
    id: 3,
    title: 'Ghost in the Machine',
    description: 'Complete a challenge without triggering any alarms',
    icon: '👻',
    category: 'Stealth',
    earned: false,
    rarity: 'Epic',
    points: 500,
    progress: 67,
  },
  {
    id: 4,
    title: 'Code Breaker',
    description: 'Successfully decrypt 5 different encryption algorithms',
    icon: '🔓',
    category: 'Cryptography',
    earned: true,
    rarity: 'Rare',
    points: 300,
    earnedDate: '2025-01-28',
  },
  {
    id: 5,
    title: 'Network Ninja',
    description: 'Complete all network security challenges',
    icon: '🥷',
    category: 'Network',
    earned: false,
    rarity: 'Legendary',
    points: 1000,
    progress: 40,
  },
  {
    id: 6,
    title: 'Bug Hunter',
    description: 'Find and report 25 unique vulnerabilities',
    icon: '🐛',
    category: 'Discovery',
    earned: false,
    rarity: 'Epic',
    points: 750,
    progress: 84,
  },
  {
    id: 7,
    title: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    category: 'Dedication',
    earned: true,
    rarity: 'Common',
    points: 100,
    earnedDate: '2025-01-22',
  },
  {
    id: 8,
    title: 'XSS Expert',
    description: 'Discover 15 cross-site scripting vulnerabilities',
    icon: '⚡',
    category: 'Web Security',
    earned: false,
    rarity: 'Rare',
    points: 300,
    progress: 53,
  },
]

// Mock leaderboard data
const leaderboard = [
  { rank: 1, username: 'CyberPhantom', points: 15420, streak: 45, change: '+2' },
  { rank: 2, username: 'H4ck3rM4st3r', points: 14830, streak: 32, change: '-1' },
  { rank: 3, username: 'DigitalSamurai', points: 13945, streak: 28, change: '+1' },
  { rank: 4, username: 'QuantumHacker', points: 12760, streak: 22, change: '0' },
  { rank: 5, username: 'Agent_X', points: 11890, streak: 18, change: '+3' },
  { rank: 6, username: 'YOU', points: 8420, streak: 15, change: '+1' },
  { rank: 7, username: 'ByteRunner', points: 7650, streak: 12, change: '-2' },
  { rank: 8, username: 'ZeroDay', points: 6890, streak: 9, change: '+1' },
  { rank: 9, username: 'ShadowByte', points: 5430, streak: 5, change: '0' },
  { rank: 10, username: 'NullPointer', points: 4210, streak: 3, change: '-1' },
]

// Mock categories
const categories = [
  { name: 'Web Security', earned: 2, total: 4, color: 'bg-secondary' },
  { name: 'Cryptography', earned: 1, total: 2, color: 'bg-success' },
  { name: 'Network', earned: 0, total: 1, color: 'bg-accent' },
  { name: 'Stealth', earned: 0, total: 1, color: 'bg-warning' },
  { name: 'Discovery', earned: 0, total: 1, color: 'bg-destructive' },
  { name: 'Milestone', earned: 1, total: 2, color: 'bg-primary' },
  { name: 'Dedication', earned: 1, total: 3, color: 'bg-secondary' },
]

// GET /api/achievements - Get all achievements
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const rarity = searchParams.get('rarity')
    const status = searchParams.get('status')
    const category = searchParams.get('category')

    await new Promise((resolve) => setTimeout(resolve, 100))

    let filtered = [...achievements]

    // Apply filters
    if (rarity && rarity !== 'all') {
      filtered = filtered.filter((a) => a.rarity === rarity)
    }
    if (status === 'earned') {
      filtered = filtered.filter((a) => a.earned)
    } else if (status === 'in-progress') {
      filtered = filtered.filter((a) => !a.earned)
    }
    if (category && category !== 'all') {
      filtered = filtered.filter((a) => a.category === category)
    }

    // Calculate stats
    const earnedCount = achievements.filter((a) => a.earned).length
    const totalPoints = achievements.filter((a) => a.earned).reduce((sum, a) => sum + a.points, 0)

    return NextResponse.json({
      success: true,
      data: {
        achievements: filtered,
        leaderboard,
        categories,
        stats: {
          earnedCount,
          totalCount: achievements.length,
          totalPoints,
          completionRate: Math.round((earnedCount / achievements.length) * 100),
        },
      },
      meta: {
        total: filtered.length,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch achievements' },
      { status: 500 }
    )
  }
}
