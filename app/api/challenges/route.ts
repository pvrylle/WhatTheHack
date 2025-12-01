import { NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase-server'

// GET /api/challenges - Get all missions with their challenges
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient()

    // Get current user (optional - for progress tracking)
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch missions with challenges
    const { data: missions, error: missionsError } = await supabase
      .from('missions')
      .select(`
        id,
        title,
        description,
        icon,
        color,
        order_index,
        challenges (
          id,
          title,
          description,
          difficulty,
          xp_reward,
          time_estimate,
          category,
          order_index,
          prerequisites
        )
      `)
      .eq('is_active', true)
      .order('order_index')

    if (missionsError) {
      console.error('Error fetching missions:', missionsError)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch missions' },
        { status: 500 }
      )
    }

    // If user is logged in, fetch their progress
    let userProgress: Record<string, { is_completed: boolean; is_unlocked: boolean }> = {}
    
    if (user) {
      const { data: progress } = await supabase
        .from('user_challenge_progress')
        .select('challenge_id, is_completed, is_unlocked')
        .eq('user_id', user.id)

      if (progress) {
        userProgress = progress.reduce((acc, p) => {
          acc[p.challenge_id] = { 
            is_completed: p.is_completed, 
            is_unlocked: p.is_unlocked 
          }
          return acc
        }, {} as Record<string, { is_completed: boolean; is_unlocked: boolean }>)
      }
    }

    // Transform data to match frontend format
    const formattedMissions = missions?.map((mission) => {
      const challenges = (mission.challenges as any[]) || []
      const completedCount = challenges.filter(c => 
        userProgress[c.id]?.is_completed
      ).length

      return {
        id: mission.id,
        title: mission.title,
        description: mission.description,
        icon: mission.icon,
        color: mission.color,
        totalChallenges: challenges.length,
        completedChallenges: completedCount,
        challenges: challenges
          .sort((a, b) => a.order_index - b.order_index)
          .map((challenge, index) => {
            // Determine if challenge is unlocked based on prerequisites
            const prerequisites = (challenge.prerequisites as string[]) || []
            const isUnlocked = index === 0 || 
              prerequisites.every(prereqId => userProgress[prereqId]?.is_completed) ||
              userProgress[challenge.id]?.is_unlocked

            return {
              id: challenge.id,
              title: challenge.title,
              description: challenge.description,
              difficulty: challenge.difficulty,
              xpReward: challenge.xp_reward,
              timeEstimate: challenge.time_estimate,
              category: challenge.category,
              isCompleted: userProgress[challenge.id]?.is_completed || false,
              isUnlocked: isUnlocked,
            }
          }),
      }
    })

    return NextResponse.json({
      success: true,
      data: formattedMissions,
      meta: {
        timestamp: new Date().toISOString(),
        count: formattedMissions?.length || 0,
      },
    })
  } catch (error) {
    console.error('Error in challenges route:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
