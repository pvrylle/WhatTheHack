import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// GET /api/dashboard - Get dashboard data for current user
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch user profile, stats, and related data in parallel
    const [
      profileResult,
      statsResult,
      progressResult,
      achievementsResult,
      activeMissionsResult
    ] = await Promise.all([
      // User profile
      supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single(),
      
      // User stats
      supabase
        .from('user_stats')
        .select('*')
        .eq('id', user.id)
        .single(),
      
      // Recent challenge progress (for active missions)
      supabase
        .from('user_challenge_progress')
        .select(`
          challenge_id,
          is_completed,
          xp_earned,
          completed_at,
          challenges (
            id,
            title,
            mission_id,
            xp_reward,
            difficulty
          )
        `)
        .eq('user_id', user.id)
        .eq('is_completed', false)
        .order('updated_at', { ascending: false })
        .limit(5),
      
      // Recent achievements
      supabase
        .from('user_achievements')
        .select(`
          earned_at,
          achievements (
            id,
            name,
            description,
            icon,
            rarity
          )
        `)
        .eq('user_id', user.id)
        .not('earned_at', 'is', null)
        .order('earned_at', { ascending: false })
        .limit(5),
      
      // Active missions
      supabase
        .from('user_active_missions')
        .select(`
          mission_id,
          started_at,
          deadline_at,
          missions (
            id,
            title,
            description,
            icon,
            color
          )
        `)
        .eq('user_id', user.id)
        .order('started_at', { ascending: false })
        .limit(3)
    ])

    const profile = profileResult.data
    const stats = statsResult.data

    if (!profile || !stats) {
      return NextResponse.json(
        { success: false, error: 'User data not found' },
        { status: 404 }
      )
    }

    // Format stats for dashboard display
    const dashboardStats = [
      { label: 'Level', value: stats.level, icon: 'Star', color: 'primary' },
      { label: 'XP', value: stats.total_xp.toLocaleString(), icon: 'Zap', color: 'success' },
      { label: 'Completed', value: stats.challenges_completed, icon: 'Trophy', color: 'accent' },
      { label: 'Streak', value: `${stats.current_streak} days`, icon: 'Flame', color: 'secondary' },
      { label: 'Rank', value: `#${await getUserRank(supabase, user.id)}`, icon: 'TrendingUp', color: 'primary' },
    ]

    // Format active missions
    const missions = (progressResult.data || []).map((p: any) => {
      const challenge = p.challenges
      return {
        id: p.challenge_id,
        title: challenge?.title || 'Unknown Challenge',
        progress: Math.round((p.xp_earned / (challenge?.xp_reward || 100)) * 100),
        reward: `+${challenge?.xp_reward || 0} XP`,
        difficulty: mapDifficulty(challenge?.difficulty),
        timeLeft: '2 days left', // You could calculate this from deadline_at
        category: challenge?.mission_id,
      }
    })

    // Format recent achievements
    const achievements = (achievementsResult.data || []).map((a: any) => {
      const achievement = a.achievements
      return {
        id: achievement?.id,
        title: achievement?.name || 'Unknown',
        description: achievement?.description || '',
        earned: formatTimeAgo(a.earned_at),
        rarity: achievement?.rarity?.toLowerCase() || 'common',
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        stats: dashboardStats,
        missions,
        achievements,
        profile: {
          rank: profile.rank,
          level: stats.level,
          xp: stats.total_xp,
          xpToNext: stats.xp_to_next,
          hacksCompleted: stats.challenges_completed,
          streakDays: stats.current_streak,
          totalPoints: stats.total_points,
        },
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Error in dashboard route:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to get user's leaderboard rank
async function getUserRank(supabase: any, userId: string): Promise<number> {
  const { data } = await supabase
    .from('leaderboard_view')
    .select('rank')
    .eq('user_id', userId)
    .single()
  
  return data?.rank || 0
}

// Map difficulty levels
function mapDifficulty(difficulty: string): string {
  const map: Record<string, string> = {
    'Beginner': 'Beginner',
    'Intermediate': 'Intermediate',
    'Advanced': 'Advanced',
    'Expert': 'Expert',
  }
  return map[difficulty] || 'Intermediate'
}

// Format time ago
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`
  return `${Math.floor(diffInSeconds / 2592000)} months ago`
}
