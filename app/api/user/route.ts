import { NextResponse } from 'next/server'

// Mock user data - in production, this would come from a database
const mockUser = {
  id: 'user-001',
  username: 'CyberAgent_X',
  email: 'agent@whatthehack.dev',
  avatar: null,
  rank: 'Elite Hacker',
  level: 15,
  xp: 8420,
  xpToNext: 10000,
  totalPoints: 8420,
  hacksCompleted: 24,
  streakDays: 15,
  badges: ['first-blood', 'sql-master', 'streak-7'],
  joinedAt: '2025-01-01T00:00:00Z',
  lastActiveAt: new Date().toISOString(),
}

// Mock stats
const mockStats = [
  { label: 'Level', value: 15, icon: 'Star', color: 'primary' },
  { label: 'XP', value: '8,420', icon: 'Zap', color: 'success' },
  { label: 'Completed', value: 24, icon: 'Trophy', color: 'accent' },
  { label: 'Streak', value: '15 days', icon: 'Flame', color: 'secondary' },
  { label: 'Rank', value: '#6', icon: 'TrendingUp', color: 'primary' },
]

// GET /api/user - Get current user profile
export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      data: {
        user: mockUser,
        stats: mockStats,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// PATCH /api/user - Update user profile
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    await new Promise((resolve) => setTimeout(resolve, 200))

    // In production, validate and save to database
    const updatedUser = {
      ...mockUser,
      ...body,
      lastActiveAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: updatedUser,
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
