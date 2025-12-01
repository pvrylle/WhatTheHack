import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import type { DbAchievement, DbCategory } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { searchParams } = new URL(request.url)
    const rarity = searchParams.get('rarity')
    const status = searchParams.get('status')
    const category = searchParams.get('category')

    let achievementsQuery = supabaseAdmin.from('achievements').select('*')

    if (rarity && rarity !== 'all') {
      achievementsQuery = achievementsQuery.eq('rarity', rarity)
    }
    if (status === 'earned') {
      achievementsQuery = achievementsQuery.eq('earned', true)
    } else if (status === 'in-progress') {
      achievementsQuery = achievementsQuery.eq('earned', false)
    }
    if (category && category !== 'all') {
      achievementsQuery = achievementsQuery.eq('category', category)
    }

    const { data: achievements, error: achievementsError } = await achievementsQuery

    if (achievementsError) {
      console.error('Supabase achievements error:', achievementsError)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch achievements' },
        { status: 500 }
      )
    }

    const { data: categories, error: categoriesError } = await supabaseAdmin
      .from('categories')
      .select('*')

    if (categoriesError) {
      console.error('Supabase categories error:', categoriesError)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch categories' },
        { status: 500 }
      )
    }

    const { data: allAchievements, error: allError } = await supabaseAdmin
      .from('achievements')
      .select('*')

    if (allError) {
      console.error('Supabase all achievements error:', allError)
    }

    const transformedAchievements = (achievements || []).map((a: DbAchievement) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      icon: a.icon,
      category: a.category,
      earned: a.earned,
      rarity: a.rarity,
      points: a.points,
      earnedDate: a.earned_date,
      progress: a.progress,
    }))

    const transformedCategories = (categories || []).map((c: DbCategory) => ({
      name: c.name,
      earned: c.earned,
      total: c.total,
      color: c.color,
    }))

    const allAchievementsList = allAchievements || []
    const earnedCount = allAchievementsList.filter((a: DbAchievement) => a.earned).length
    const totalPoints = allAchievementsList
      .filter((a: DbAchievement) => a.earned)
      .reduce((sum: number, a: DbAchievement) => sum + a.points, 0)

    const { data: leaderboardData, error: leaderboardError } = await supabaseAdmin
      .from('users')
      .select('username, total_points, streak_days')
      .order('total_points', { ascending: false })
      .limit(10)

    const leaderboard = leaderboardError
      ? []
      : (leaderboardData || []).map((user, index) => ({
          rank: index + 1,
          username: user.username,
          points: user.total_points,
          streak: user.streak_days,
          change: '0',
        }))

    return NextResponse.json({
      success: true,
      data: {
        achievements: transformedAchievements,
        leaderboard,
        categories: transformedCategories,
        stats: {
          earnedCount,
          totalCount: allAchievementsList.length,
          totalPoints,
          completionRate: allAchievementsList.length > 0 
            ? Math.round((earnedCount / allAchievementsList.length) * 100) 
            : 0,
        },
      },
      meta: {
        total: transformedAchievements.length,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Achievements API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch achievements' },
      { status: 500 }
    )
  }
}
