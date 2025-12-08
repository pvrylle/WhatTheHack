import { NextResponse } from 'next/server'

// POST /api/auth/register - Register new user
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, username } = body

    await new Promise((resolve) => setTimeout(resolve, 300))

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

    // In production, check if email/username already exists, hash password, save to DB
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      username,
      rank: 'Recruit',
      level: 1,
      xp: 0,
      createdAt: new Date().toISOString(),
    }

    const mockToken = Buffer.from(JSON.stringify({ userId: newUser.id, exp: Date.now() + 86400000 })).toString('base64')

    return NextResponse.json({
      success: true,
      data: {
        user: newUser,
        token: mockToken,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    )
  }
}
