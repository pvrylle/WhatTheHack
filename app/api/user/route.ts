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

    const formattedStats = [
      { label: 'Level', value: profile.level || 1, icon: 'Star', color: 'primary' },
      { label: 'XP', value: (profile.xp || 0).toLocaleString(), icon: 'Zap', color: 'success' },
      { label: 'Completed', value: stats?.challenges_completed || 0, icon: 'Trophy', color: 'accent' },
      { label: 'Streak', value: `${streak?.current_streak || 0} days`, icon: 'Flame', color: 'secondary' },
      { label: 'Rank', value: leaderboard?.rank ? `#${leaderboard.rank}` : 'N/A', icon: 'TrendingUp', color: 'primary' },
    ]

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: profile.id,
          username: profile.username,
          email: profile.email,
          avatar: profile.avatar_url,
          rank: profile.rank,
          level: profile.level,
          xp: profile.xp,
          xpToNext: Math.ceil((profile.level || 1) * 1000 * 1.5),
          totalPoints: profile.xp,
          hacksCompleted: stats?.challenges_completed || 0,
          streakDays: streak?.current_streak || 0,
          badges: [], // Could be populated from achievements
          joinedAt: profile.created_at,
          lastActiveAt: profile.updated_at,
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
    const allowedUpdates: Record<string, unknown> = {}
    if (body.username) allowedUpdates.username = body.username
    if (body.avatar_url) allowedUpdates.avatar_url = body.avatar_url
    allowedUpdates.updated_at = new Date().toISOString()

    const { data: updatedProfile, error } = await supabase
      .from('user_profiles')
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
