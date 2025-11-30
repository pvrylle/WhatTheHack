import { NextResponse } from 'next/server'

// Mock auth - in production, use proper authentication (NextAuth, Clerk, etc.)
const mockUsers = [
  {
    id: 'user-001',
    email: 'demo@whatthehack.dev',
    password: 'demo123', // In production, NEVER store plain passwords!
    username: 'CyberAgent_X',
    rank: 'Elite Hacker',
    level: 15,
  },
]

// POST /api/auth/login - Login
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    await new Promise((resolve) => setTimeout(resolve, 300))

    // Find user (mock validation)
    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // In production, create a proper JWT token
    const mockToken = Buffer.from(JSON.stringify({ userId: user.id, exp: Date.now() + 86400000 })).toString('base64')

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          rank: user.rank,
          level: user.level,
        },
        token: mockToken,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    )
  }
}
