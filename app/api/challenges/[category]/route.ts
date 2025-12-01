import { NextResponse } from 'next/server'
import { getSupabaseAdmin, DbChallenge } from '@/lib/supabase'

// Types for response
type CategoryInfo = {
  id: string
  name: string
  description: string
  icon: string
  color: string
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { category } = await params

    const categorySlug = category.toLowerCase()

    const { data: challenges, error } = await supabaseAdmin
      .from('challenges')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Supabase challenges error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch challenges' },
        { status: 500 }
      )
    }

    const categoryMatches = (challengeCategory: string | null) => {
      if (!challengeCategory) return false
      const normalized = challengeCategory.toLowerCase().replace(/\s+/g, '-')
      return normalized === categorySlug
    }

    const filteredChallenges = ((challenges || []) as DbChallenge[]).filter(
      (c) => categoryMatches(c.category)
    )

    if (filteredChallenges.length === 0) {
      const { data: categoriesData } = await supabaseAdmin
        .from('categories')
        .select('*')

      const matchedCategory = (categoriesData as DbCategory[] || []).find(
        (cat) => cat.name.toLowerCase().replace(/\s+/g, '-') === categorySlug
      )

      if (!matchedCategory) {
        return NextResponse.json(
          { success: false, error: 'Category not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        category: {
          id: categorySlug,
          name: matchedCategory.name,
          description: matchedCategory.description || `Master ${matchedCategory.name.toLowerCase()} challenges`,
          icon: matchedCategory.icon || 'Shield',
          color: matchedCategory.color || 'primary',
        },
        challenges: [],
      })
    }

    const originalCategoryName = filteredChallenges[0].category || category

    const { data: categoriesData } = await supabaseAdmin
      .from('categories')
      .select('*')

    const matchedCategory = (categoriesData as DbCategory[] || []).find(
      (cat) => cat.name.toLowerCase().replace(/\s+/g, '-') === categorySlug ||
               cat.name.toLowerCase() === originalCategoryName?.toLowerCase()
    )

    const categoryInfo: CategoryInfo = {
      id: categorySlug,
      name: matchedCategory?.name || originalCategoryName || category,
      description: matchedCategory?.description || `Master ${originalCategoryName?.toLowerCase()} challenges and techniques`,
      icon: matchedCategory?.icon || 'Shield',
      color: matchedCategory?.color || 'primary',
    }

    const transformedChallenges: TransformedChallenge[] = filteredChallenges.map((challenge) => ({
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      difficulty: challenge.difficulty || 'Beginner',
      xp_reward: challenge.xp_reward || 100,
      time_estimate: '30 min',
      is_completed: (challenge.completed_challenges || 0) >= (challenge.total_challenges || 1),
      is_unlocked: true,
      category_id: categorySlug,
    }))

    return NextResponse.json({
      success: true,
      category: categoryInfo,
      challenges: transformedChallenges,
    })
  } catch (error) {
    console.error('Category challenges API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch challenges' },
      { status: 500 }
    )
  }
}
