import { NextResponse } from 'next/server'

// Mock leaderboard data with more details
const leaderboardData = {
  global: [
    { rank: 1, username: 'CyberPhantom', points: 15420, streak: 45, level: 28, change: '+2', avatar: null },
    { rank: 2, username: 'H4ck3rM4st3r', points: 14830, streak: 32, level: 26, change: '-1', avatar: null },
    { rank: 3, username: 'DigitalSamurai', points: 13945, streak: 28, level: 25, change: '+1', avatar: null },
    { rank: 4, username: 'QuantumHacker', points: 12760, streak: 22, level: 23, change: '0', avatar: null },
    { rank: 5, username: 'Agent_X', points: 11890, streak: 18, level: 21, change: '+3', avatar: null },
    { rank: 6, username: 'YOU', points: 8420, streak: 15, level: 15, change: '+1', avatar: null, isCurrentUser: true },
    { rank: 7, username: 'ByteRunner', points: 7650, streak: 12, level: 14, change: '-2', avatar: null },
    { rank: 8, username: 'ZeroDay', points: 6890, streak: 9, level: 13, change: '+1', avatar: null },
    { rank: 9, username: 'ShadowByte', points: 5430, streak: 5, level: 11, change: '0', avatar: null },
    { rank: 10, username: 'NullPointer', points: 4210, streak: 3, level: 9, change: '-1', avatar: null },
  ],
  weekly: [
    { rank: 1, username: 'Agent_X', points: 1250, streak: 15, level: 21, change: '+5', avatar: null },
    { rank: 2, username: 'CyberPhantom', points: 980, streak: 45, level: 28, change: '0', avatar: null },
    { rank: 3, username: 'YOU', points: 850, streak: 15, level: 15, change: '+2', avatar: null, isCurrentUser: true },
  ],
  monthly: [
    { rank: 1, username: 'CyberPhantom', points: 4520, streak: 45, level: 28, change: '+1', avatar: null },
    { rank: 2, username: 'H4ck3rM4st3r', points: 4100, streak: 32, level: 26, change: '-1', avatar: null },
    { rank: 3, username: 'DigitalSamurai', points: 3800, streak: 28, level: 25, change: '+2', avatar: null },
    { rank: 4, username: 'YOU', points: 2420, streak: 15, level: 15, change: '+3', avatar: null, isCurrentUser: true },
  ],
}

// GET /api/leaderboard - Get leaderboard data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'global' // global, weekly, monthly
    const limit = parseInt(searchParams.get('limit') || '10')

    await new Promise((resolve) => setTimeout(resolve, 100))

    const data = leaderboardData[period as keyof typeof leaderboardData] || leaderboardData.global

    return NextResponse.json({
      success: true,
      data: {
        leaderboard: data.slice(0, limit),
        period,
        currentUserRank: data.find((p) => p.isCurrentUser)?.rank || null,
      },
      meta: {
        total: data.length,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
