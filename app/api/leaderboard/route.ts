import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// GET /api/leaderboard - Get global leaderboard
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const supabase = await createSupabaseServerClient()

    // Get current user for highlighting their position
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch leaderboard from view
    const { data: leaderboard, error, count } = await supabase
      .from('leaderboard_view')
      .select('*', { count: 'exact' })
      .order('rank')
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching leaderboard:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch leaderboard' },
        { status: 500 }
      )
    }

    // Format for frontend
    const formattedLeaderboard = leaderboard?.map((entry: any) => ({
      rank: entry.rank,
      username: entry.username,
      points: entry.total_xp,
      streak: entry.current_streak,
      level: entry.level,
      avatar: entry.avatar_url,
      change: '0', // You could calculate this by storing historical rankings
      isCurrentUser: user?.id === entry.user_id,
    }))

    // Get current user's rank if logged in and not in current view
    let userRank = null
    if (user) {
      const { data: userRankData } = await supabase
        .from('leaderboard_view')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      if (userRankData && !formattedLeaderboard?.find(e => e.isCurrentUser)) {
        const userData = userRankData as any
        userRank = {
          rank: userData.rank,
          username: userData.username,
          points: userData.total_xp,
          streak: userData.current_streak,
          level: userData.level,
          avatar: userData.avatar_url,
          isCurrentUser: true,
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        global: formattedLeaderboard,
        userRank,
        totalUsers: count || 0,
      },
      meta: {
        timestamp: new Date().toISOString(),
        limit,
        offset,
        hasMore: count ? offset + limit < count : false,
      },
    })
  } catch (error) {
    console.error('Error in leaderboard route:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
