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

    if (userError || !user) {
      console.error('Supabase user error:', userError)
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const { data: achievements, error: achievementsError } = await supabaseAdmin
      .from('achievements')
      .select('id')
      .eq('earned', true)

    const hacksCompleted = achievements?.length || 0

    const transformedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: null,
      rank: user.rank,
      level: user.level,
      xp: user.xp,
      xpToNext: calculateXpToNextLevel(user.level),
      totalPoints: user.total_points,
      hacksCompleted,
      streakDays: user.streak_days,
      badges: user.badges || [],
      joinedAt: user.created_at,
      lastActiveAt: user.updated_at,
    }

    const stats = [
      { label: 'Level', value: user.level, icon: 'Star', color: 'primary' },
      { label: 'XP', value: user.xp.toLocaleString(), icon: 'Zap', color: 'success' },
      { label: 'Completed', value: hacksCompleted, icon: 'Trophy', color: 'accent' },
      { label: 'Streak', value: `${user.streak_days} days`, icon: 'Flame', color: 'secondary' },
      { label: 'Rank', value: `#${Math.max(1, Math.floor(100 / user.level))}`, icon: 'TrendingUp', color: 'primary' },
    ]

    return NextResponse.json({
      success: true,
      data: {
        user: transformedUser,
        stats,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('User API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const body = await request.json()

    const { data: currentUser, error: findError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', 'agent@whatthehack.dev')
      .single()

    if (findError || !currentUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', currentUser.id)
      .select()
      .single()

    if (updateError) {
      console.error('Supabase update error:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to update user' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        rank: updatedUser.rank,
        level: updatedUser.level,
        xp: updatedUser.xp,
        totalPoints: updatedUser.total_points,
        streakDays: updatedUser.streak_days,
        badges: updatedUser.badges,
        lastActiveAt: updatedUser.updated_at,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('User update API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

function calculateXpToNextLevel(currentLevel: number): number {
  return Math.floor(1000 * Math.pow(1.5, currentLevel - 1))
}
