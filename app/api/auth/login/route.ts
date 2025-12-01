import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// POST /api/auth/login - Login with email and password
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const supabase = await createSupabaseServerClient()

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error:', error.message)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 401 }
      )
    }

    // Fetch user profile and stats
    const [profileResult, statsResult] = await Promise.all([
      supabase
        .from('user_profiles')
        .select('*')
        .eq('id', data.user.id)
        .single(),
      supabase
        .from('user_stats')
        .select('*')
        .eq('id', data.user.id)
        .single(),
    ])

    const profile = profileResult.data
    const stats = statsResult.data

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          username: profile?.username || 'Agent',
          rank: profile?.rank || 'Recruit',
          level: stats?.level || 1,
          xp: stats?.total_xp || 0,
          avatar: profile?.avatar_url,
        },
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
        },
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    )
  }
}
