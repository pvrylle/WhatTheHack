

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


export const authService = {
  
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await httpService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
      { skipAuth: true }
    )

    if (response.data) {

      setAuthTokens(response.data.access, response.data.refresh)
      return response.data
    }

    throw new Error('Login failed')
  },

  
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await httpService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData,
      { skipAuth: true }
    )

    if (response.data) {

      setAuthTokens(response.data.access, response.data.refresh)
      return response.data
    }

    throw new Error('Registration failed')
  },

  
  logout: async (): Promise<void> => {
    try {
      await httpService.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {

      clearAuthTokens()
    }
  },

  
  getProfile: async (): Promise<UserProfile> => {
    const response = await httpService.get<UserProfile>(API_ENDPOINTS.AUTH.PROFILE)

    if (response.data) {
      return response.data
    }

    throw new Error('Failed to fetch profile')
  },

  
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

  
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    await httpService.post(API_ENDPOINTS.AUTH.PASSWORD_CHANGE, {
      old_password: oldPassword,
      new_password: newPassword,
    })
  },

  
  requestPasswordReset: async (email: string): Promise<void> => {
    await httpService.post(
      API_ENDPOINTS.AUTH.PASSWORD_RESET,
      { email },
      { skipAuth: true }
    )
  },
}

export default authService
