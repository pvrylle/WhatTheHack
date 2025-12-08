import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// Types for achievements
interface Achievement {
  id: number
  name: string
  description: string
  icon: string | null
  category: string | null
  rarity: string
  points: number
  xp_reward: number
  requirement: any
  is_active: boolean
  created_at: string
}

interface UserAchievementProgress {
  achievement_id: number
  progress: number
  earned_at: string | null
}

// GET /api/achievements - Get all achievements with user progress
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch all achievements
    const { data: achievements, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('is_active', true)
      .order('rarity')
      .order('points', { ascending: false })

    if (error) {
      console.error('Error fetching achievements:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch achievements' },
        { status: 500 }
      )
    }

    // Get user's achievement progress if logged in
    let userAchievements: Record<number, { progress: number; earned_at: string | null }> = {}
    
    if (user) {
      const { data: progress } = await supabase
        .from('user_achievements')
        .select('achievement_id, progress, earned_at')
        .eq('user_id', user.id)

      if (progress) {
        userAchievements = (progress as UserAchievementProgress[]).reduce((acc, p) => {
          acc[p.achievement_id] = { 
            progress: p.progress, 
            earned_at: p.earned_at 
          }
          return acc
        }, {} as Record<number, { progress: number; earned_at: string | null }>)
      }
    }

    // Format achievements
    const formattedAchievements = (achievements as Achievement[] || []).map((achievement) => {
      const userProgress = userAchievements[achievement.id]
      return {
        id: achievement.id,
        title: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
        category: achievement.category,
        earned: userProgress?.earned_at != null,
        rarity: achievement.rarity,
        points: achievement.points,
        earnedDate: userProgress?.earned_at,
        progress: userProgress?.progress || 0,
      }
    })

    // Group by category for stats
    const categories = formattedAchievements?.reduce((acc, achievement) => {
      const cat = achievement.category || 'Other'
      if (!acc[cat]) {
        acc[cat] = { name: cat, earned: 0, total: 0 }
      }
      acc[cat].total++
      if (achievement.earned) acc[cat].earned++
      return acc
    }, {} as Record<string, { name: string; earned: number; total: number }>)

    const categoryStats = Object.values(categories || {}).map((cat, index) => ({
      ...cat,
      color: getCategoryColor(index),
    }))

    // Calculate summary stats
    const totalEarned = formattedAchievements?.filter(a => a.earned).length || 0
    const totalPoints = formattedAchievements
      ?.filter(a => a.earned)
      .reduce((sum, a) => sum + a.points, 0) || 0

    return NextResponse.json({
      success: true,
      data: {
        achievements: formattedAchievements,
        categories: categoryStats,
        summary: {
          earned: totalEarned,
          total: formattedAchievements?.length || 0,
          points: totalPoints,
        },
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Error in achievements route:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getCategoryColor(index: number): string {
  const colors = [
    'bg-secondary',
    'bg-success', 
    'bg-accent',
    'bg-warning',
    'bg-destructive',
    'bg-primary',
  ]
  return colors[index % colors.length]
}
