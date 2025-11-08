/**
 * Authentication Service
 * Handles all authentication-related API calls
 * Compatible with Django REST Framework authentication
 */

import httpService from './request.service'
import { API_ENDPOINTS } from '@/constants/api'
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  UserProfile,
  ApiResponse,
} from '@/interfaces/api'
import { setAuthTokens, clearAuthTokens } from './request.service'

/**
 * Authentication Service
 */
export const authService = {
  /**
   * Login user
   * POST /api/v1/auth/login/
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await httpService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
      { skipAuth: true }
    )

    if (response.data) {
      // Store tokens
      setAuthTokens(response.data.access, response.data.refresh)
      return response.data
    }

    throw new Error('Login failed')
  },

  /**
   * Register new user
   * POST /api/v1/auth/register/
   */
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await httpService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData,
      { skipAuth: true }
    )

    if (response.data) {
      // Store tokens
      setAuthTokens(response.data.access, response.data.refresh)
      return response.data
    }

    throw new Error('Registration failed')
  },

  /**
   * Logout user
   * POST /api/v1/auth/logout/
   */
  logout: async (): Promise<void> => {
    try {
      await httpService.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear tokens regardless of API response
      clearAuthTokens()
    }
  },

  /**
   * Get current user profile
   * GET /api/v1/auth/profile/
   */
  getProfile: async (): Promise<UserProfile> => {
    const response = await httpService.get<UserProfile>(API_ENDPOINTS.AUTH.PROFILE)

    if (response.data) {
      return response.data
    }

    throw new Error('Failed to fetch profile')
  },

  /**
   * Update user profile
   * PATCH /api/v1/auth/profile/
   */
  updateProfile: async (userData: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await httpService.patch<UserProfile>(
      API_ENDPOINTS.AUTH.PROFILE,
      userData
    )

    if (response.data) {
      return response.data
    }

    throw new Error('Failed to update profile')
  },

  /**
   * Change password
   * POST /api/v1/auth/password/change/
   */
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    await httpService.post(API_ENDPOINTS.AUTH.PASSWORD_CHANGE, {
      old_password: oldPassword,
      new_password: newPassword,
    })
  },

  /**
   * Request password reset
   * POST /api/v1/auth/password/reset/
   */
  requestPasswordReset: async (email: string): Promise<void> => {
    await httpService.post(
      API_ENDPOINTS.AUTH.PASSWORD_RESET,
      { email },
      { skipAuth: true }
    )
  },
}

export default authService

