import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// GET /api/user - Get current user profile
export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseServerClient()
    
    // Get the user ID from the authorization header or cookie
    const authHeader = request.headers.get('authorization')
    const userId = authHeader?.replace('Bearer ', '')
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Get user stats
    const { data: stats, error: statsError } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single()

    // Get daily streak
    const { data: streak } = await supabase
      .from('daily_streaks')
      .select('*')
      .eq('user_id', userId)
      .single()

    // Get user rank from leaderboard
    const { data: leaderboard } = await supabase
      .from('leaderboard_view')
      .select('rank')
      .eq('user_id', userId)
      .single()

    const userProfile = profile as any
    const userStats = stats as any
    const userStreak = streak as any
    const userLeaderboard = leaderboard as any

    const formattedStats = [
      { label: 'Level', value: userProfile.level || 1, icon: 'Star', color: 'primary' },
      { label: 'XP', value: (userProfile.xp || 0).toLocaleString(), icon: 'Zap', color: 'success' },
      { label: 'Completed', value: userStats?.challenges_completed || 0, icon: 'Trophy', color: 'accent' },
      { label: 'Streak', value: `${userStreak?.current_streak || 0} days`, icon: 'Flame', color: 'secondary' },
      { label: 'Rank', value: userLeaderboard?.rank ? `#${userLeaderboard.rank}` : 'N/A', icon: 'TrendingUp', color: 'primary' },
    ]

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: userProfile.id,
          username: userProfile.username,
          email: userProfile.email,
          avatar: userProfile.avatar_url,
          rank: userProfile.rank,
          level: userProfile.level,
          xp: userProfile.xp,
          xpToNext: Math.ceil((userProfile.level || 1) * 1000 * 1.5),
          totalPoints: userProfile.xp,
          hacksCompleted: userStats?.challenges_completed || 0,
          streakDays: userStreak?.current_streak || 0,
          badges: [], // Could be populated from achievements
          joinedAt: userProfile.created_at,
          lastActiveAt: userProfile.updated_at,
        },
        stats: formattedStats,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// PATCH /api/user - Update user profile
export async function PATCH(request: Request) {
  try {
    const supabase = await createSupabaseServerClient()
    
    // Get the user ID from the authorization header or cookie
    const authHeader = request.headers.get('authorization')
    const userId = authHeader?.replace('Bearer ', '')
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Only allow certain fields to be updated
    const allowedUpdates: any = {}
    if (body.username) allowedUpdates.username = body.username
    if (body.avatar_url) allowedUpdates.avatar_url = body.avatar_url
    allowedUpdates.updated_at = new Date().toISOString()

    const { data: updatedProfile, error } = await supabase
      .from('user_profiles')
      // @ts-expect-error - Supabase typing issue
      .update(allowedUpdates)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating user:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to update user' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedProfile,
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
