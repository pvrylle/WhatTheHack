import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'global'
    const limit = parseInt(searchParams.get('limit') || '10')

    const { data: leaderboardEntries, error: leaderboardError } = await supabaseAdmin
      .from('leaderboard')
      .select(`
        *,
        users (
          username,
          email
        )
      `)
      .eq('period', period)
      .order('rank', { ascending: true })
      .limit(limit)

    if (leaderboardError || !leaderboardEntries || leaderboardEntries.length === 0) {
      const { data: users, error: usersError } = await supabaseAdmin
        .from('users')
        .select('id, username, total_points, streak_days, level')
        .order('total_points', { ascending: false })
        .limit(limit)

      if (usersError) {
        console.error('Supabase users error:', usersError)
        return NextResponse.json(
          { success: false, error: 'Failed to fetch leaderboard' },
          { status: 500 }
        )
      }

      const leaderboard = (users || []).map((user, index) => ({
        rank: index + 1,
        username: user.username,
        points: user.total_points,
        streak: user.streak_days,
        level: user.level,
        change: '0',
        avatar: null,
        isCurrentUser: user.username === 'CyberAgent_X',
      }))

      return NextResponse.json({
        success: true,
        data: {
          leaderboard,
          period,
          currentUserRank: leaderboard.find((p) => p.isCurrentUser)?.rank || null,
        },
        meta: {
          total: leaderboard.length,
          timestamp: new Date().toISOString(),
        },
      })
    }

    const leaderboard = leaderboardEntries.map((entry) => ({
      rank: entry.rank,
      username: entry.users?.username || 'Unknown',
      points: entry.points,
      streak: entry.streak,
      level: entry.level,
      change: '0',
      avatar: null,
      isCurrentUser: entry.users?.username === 'CyberAgent_X',
    }))

    return NextResponse.json({
      success: true,
      data: {
        leaderboard,
        period,
        currentUserRank: leaderboard.find((p) => p.isCurrentUser)?.rank || null,
      },
      meta: {
        total: leaderboard.length,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Leaderboard API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
