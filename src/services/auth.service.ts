/**
 * Authentication Service
 * Handles all authentication-related API calls
 * Now uses Next.js API routes with Supabase
 */

import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserProfile,
} from '@/types'
import { setAuthTokens, clearAuthTokens } from './request.service'

// API response type from our routes
interface ApiAuthResponse {
  success: boolean
  data?: {
    user: {
      id: string
      email: string
      username: string
      rank?: string
      level?: number
      xp?: number
      avatar?: string
    }
    session?: {
      access_token: string
      refresh_token: string
      expires_at?: number
    }
    message?: string
    requiresConfirmation?: boolean
  }
  error?: string
}

/**
 * Authentication Service
 */
export const authService = {
  /**
   * Login user
   * POST /api/auth/login
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    const result: ApiAuthResponse = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Login failed')
    }

    if (result.data?.session) {
      setAuthTokens(result.data.session.access_token, result.data.session.refresh_token)
    }

    return {
      access: result.data?.session?.access_token || '',
      refresh: result.data?.session?.refresh_token || '',
      user: {
        id: result.data?.user.id || '',
        email: result.data?.user.email || '',
        username: result.data?.user.username || '',
        rank: result.data?.user.rank,
        level: result.data?.user.level,
        xp: result.data?.user.xp,
      },
    }
  },

  /**
   * Register new user
   * POST /api/auth/register
   */
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })

    const result: ApiAuthResponse = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Registration failed')
    }

    // Handle email confirmation required
    if (result.data?.requiresConfirmation) {
      return {
        access: '',
        refresh: '',
        user: {
          id: result.data.user.id,
          email: result.data.user.email,
          username: result.data.user.username,
        },
      }
    }

    if (result.data?.session) {
      setAuthTokens(result.data.session.access_token, result.data.session.refresh_token)
    }

    return {
      access: result.data?.session?.access_token || '',
      refresh: result.data?.session?.refresh_token || '',
      user: {
        id: result.data?.user.id || '',
        email: result.data?.user.email || '',
        username: result.data?.user.username || '',
        rank: result.data?.user.rank,
        level: result.data?.user.level,
        xp: result.data?.user.xp,
      },
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuthTokens()
    }
  },

  /**
   * Get current user profile
   * GET /api/user
   */
  getProfile: async (): Promise<UserProfile> => {
    const response = await fetch('/api/user')
    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to fetch profile')
    }

    return result.data.user
  },

  /**
   * Update user profile
   * PATCH /api/user
   */
  updateProfile: async (userData: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to update profile')
    }

    return result.data
  },

  /**
   * Change password (not implemented yet)
   */
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    console.log('Password change not implemented')
  },

  /**
   * Request password reset (not implemented yet)
   */
  requestPasswordReset: async (email: string): Promise<void> => {
    console.log('Password reset not implemented')
  },
}

export default authService
