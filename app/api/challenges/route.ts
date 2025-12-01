import { NextResponse } from 'next/server'
import { getSupabaseAdmin, DbChallenge } from '@/lib/supabase'

type CategoryInfo = {
  id: string
  name: string
  description: string
  icon: string
  color: string
  totalChallenges: number
  completedChallenges: number
}

type TransformedChallenge = {
  id: string
  title: string | null
  description: string | null
  difficulty: string
  xp_reward: number
  time_estimate: string
  is_completed: boolean
  is_unlocked: boolean
  category_id: string
}

type DbCategory = {
  id?: number
  name: string
  description?: string
  icon?: string
  color?: string
}

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin()

    const { data: challenges, error } = await supabaseAdmin
      .from('challenges')
      .select('*')
      .order('category', { ascending: true })

    if (error) {
      console.error('Supabase challenges error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch challenges' },
        { status: 500 }
      )
    }

    const { data: categoriesData, error: catError } = await supabaseAdmin
      .from('categories')
      .select('*')

    if (catError) {
      console.error('Supabase categories error:', catError)
    }

    const categoriesMap: Record<string, CategoryInfo> = {}

    if (categoriesData && categoriesData.length > 0) {
      (categoriesData as DbCategory[]).forEach((cat) => {
        categoriesMap[cat.name] = {
          id: cat.name.toLowerCase().replace(/\s+/g, '-'),
          name: cat.name,
          description: cat.description || `Master ${cat.name.toLowerCase()} challenges and techniques`,
          icon: cat.icon || 'Shield',
          color: cat.color || 'primary',
          totalChallenges: 0,
          completedChallenges: 0,
        }
      })
    }

    const challengesByCategory: Record<string, TransformedChallenge[]> = {}

    ;((challenges || []) as DbChallenge[]).forEach((challenge) => {
      const categoryName = challenge.category || 'General'
      const categoryKey = categoryName.toLowerCase().replace(/\s+/g, '-')

      if (!categoriesMap[categoryName]) {
        categoriesMap[categoryName] = {
          id: categoryKey,
          name: categoryName,
          description: `Master ${categoryName.toLowerCase()} challenges`,
          icon: 'Shield',
          color: 'primary',
          totalChallenges: 0,
          completedChallenges: 0,
        }
      }

      if (!challengesByCategory[categoryKey]) {
        challengesByCategory[categoryKey] = []
      }

      challengesByCategory[categoryKey].push({
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        difficulty: challenge.difficulty || 'Beginner',
        xp_reward: challenge.xp_reward || 100,
        time_estimate: '30 min',
        is_completed: (challenge.completed_challenges || 0) >= (challenge.total_challenges || 1),
        is_unlocked: true,
        category_id: categoryKey,
      })

      categoriesMap[categoryName].totalChallenges += 1
      if ((challenge.completed_challenges || 0) >= (challenge.total_challenges || 1)) {
        categoriesMap[categoryName].completedChallenges += 1
      }
    })

    const learningPaths = Object.values(categoriesMap).map((cat) => ({
      ...cat,
      challenges: challengesByCategory[cat.id] || [],
    }))

    return NextResponse.json({
      success: true,
      learningPaths,
      meta: {
        total: learningPaths.length,
        totalChallenges: challenges?.length || 0,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Challenges API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch challenges' },
      { status: 500 }
    )
  }
}
