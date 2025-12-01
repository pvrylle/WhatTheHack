import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin()

    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', 'agent@whatthehack.dev')
      .single()

    if (userError) {
      console.error('Supabase user error:', userError)
    }

    const { data: achievements, error: achievementsError } = await supabaseAdmin
      .from('achievements')
      .select('*')
      .eq('earned', true)
      .order('earned_date', { ascending: false })
      .limit(3)

    if (achievementsError) {
      console.error('Supabase achievements error:', achievementsError)
    }

    const { data: challenges, error: challengesError } = await supabaseAdmin
      .from('challenges')
      .select('*')
      .limit(3)

    if (challengesError) {
      console.error('Supabase challenges error:', challengesError)
    }

    const dashboardData = {
      stats: [
        { 
          label: 'Level', 
          value: user?.level || 1, 
          icon: 'Star', 
          color: 'primary' 
        },
        { 
          label: 'XP', 
          value: user?.xp?.toLocaleString() || '0', 
          icon: 'Zap', 
          color: 'success' 
        },
        { 
          label: 'Completed', 
          value: achievements?.length || 0, 
          icon: 'Trophy', 
          color: 'accent' 
        },
        { 
          label: 'Streak', 
          value: `${user?.streak_days || 0} days`, 
          icon: 'Flame', 
          color: 'secondary' 
        },
        { 
          label: 'Rank', 
          value: `#${user?.level ? Math.max(1, Math.floor(100 / user.level)) : 100}`, 
          icon: 'TrendingUp', 
          color: 'primary' 
        },
      ],
      missions: (challenges || []).map((challenge, index) => {
        const progress = challenge.completed_challenges && challenge.total_challenges
          ? Math.round((challenge.completed_challenges / challenge.total_challenges) * 100)
          : 0
        return {
          id: index + 1,
          title: challenge.title || 'Unknown Challenge',
          progress,
          reward: `+${challenge.xp_reward || 0} XP`,
          difficulty: challenge.difficulty || 'Beginner',
          timeLeft: '3 days left',
          category: challenge.category?.toLowerCase().replace(/\s+/g, '-') || 'general',
        }
      }),
      achievements: (achievements || []).map((achievement) => ({
        id: achievement.id,
        title: achievement.title,
        description: achievement.description || '',
        earned: achievement.earned_date 
          ? formatRelativeDate(achievement.earned_date) 
          : 'Recently',
        rarity: achievement.rarity || 'Common',
      })),
      profile: {
        rank: user?.rank || 'Recruit',
        level: user?.level || 1,
        xp: user?.xp || 0,
        xpToNext: calculateXpToNextLevel(user?.level || 1),
        hacksCompleted: achievements?.length || 0,
        streakDays: user?.streak_days || 0,
        totalPoints: user?.total_points || 0,
      },
    }

    return NextResponse.json({
      success: true,
      data: dashboardData,
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}

function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${diffDays >= 14 ? 's' : ''} ago`
  return `${Math.floor(diffDays / 30)} month${diffDays >= 60 ? 's' : ''} ago`
}

function calculateXpToNextLevel(currentLevel: number): number {
  return Math.floor(1000 * Math.pow(1.5, currentLevel - 1))
}
