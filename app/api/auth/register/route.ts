import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// POST /api/auth/register - Register new user
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, username } = body

    // Validate input
    if (!email || !password || !username) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and username are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    if (username.length < 3 || username.length > 50) {
      return NextResponse.json(
        { success: false, error: 'Username must be between 3 and 50 characters' },
        { status: 400 }
      )
    }

    const supabase = await createSupabaseServerClient()

    // Check if username is already taken
    const { data: existingUser } = await supabase
      .from('user_profiles')
      .select('username')
      .eq('username', username)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Username is already taken' },
        { status: 400 }
      )
    }

    // Sign up with Supabase Auth
    // The handle_new_user trigger will automatically create profile and stats
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username, // This will be used by the trigger
        },
      },
    })

    if (error) {
      console.error('Registration error:', error.message)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }

    // If email confirmation is enabled, user won't have a session yet
    if (!data.session) {
      return NextResponse.json({
        success: true,
        data: {
          user: {
            id: data.user?.id,
            email: data.user?.email,
            username,
          },
          message: 'Please check your email to confirm your account',
          requiresConfirmation: true,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      })
    }

    // If auto-confirm is enabled, return the session
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: data.user?.id,
          email: data.user?.email,
          username,
          rank: 'Recruit',
          level: 1,
          xp: 0,
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
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    )
  }
}
