/**
 * useAuthRequest Hook
 * Custom hook for authentication requests
 * Uses React Query for data fetching and caching
 */

'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'
import { mockAuthService, shouldUseMock } from '@/services/mock.service'
import { setAuthTokens, clearAuthTokens } from '@/services/request.service'
import type {
  LoginRequest,
  RegisterRequest,
  UserProfile,
  AuthResponse,
} from '@/interfaces/api'

/**
 * Hook for user login
 */
export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<AuthResponse> => {
      if (shouldUseMock()) {
        const response = await mockAuthService.login(credentials)
        // Store user in localStorage for mock mode
        localStorage.setItem('whathehack_user', JSON.stringify(response.user))
        return response
      }
      return authService.login(credentials)
    },
    onSuccess: (data) => {
      // Store user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('whathehack_user', JSON.stringify(data.user))
      }
      // Invalidate and refetch user profile
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      router.push('/dashboard')
    },
    onError: (error: any) => {
      console.error('Login error:', error)
    },
  })
}

/**
 * Hook for user registration
 */
export const useRegister = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: RegisterRequest): Promise<AuthResponse> => {
      if (shouldUseMock()) {
        const response = await mockAuthService.register(userData)
        localStorage.setItem('whathehack_user', JSON.stringify(response.user))
        return response
      }
      return authService.register(userData)
    },
    onSuccess: (data) => {
      // Store user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('whathehack_user', JSON.stringify(data.user))
      }
      // Invalidate and refetch user profile
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      router.push('/dashboard')
    },
    onError: (error: any) => {
      console.error('Registration error:', error)
    },
  })
}

/**
 * Hook for user logout
 */
export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (): Promise<void> => {
      if (shouldUseMock()) {
        await mockAuthService.logout()
        return
      }
      return authService.logout()
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear()
      clearAuthTokens()
      router.push('/')
    },
    onError: (error: any) => {
      console.error('Logout error:', error)
      // Clear tokens even if API call fails
      clearAuthTokens()
      queryClient.clear()
      router.push('/')
    },
  })
}

/**
 * Hook for fetching user profile
 */
export const useUserProfile = () => {
  const shouldUseMockData = shouldUseMock()

  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async (): Promise<UserProfile> => {
      if (shouldUseMockData) {
        return mockAuthService.getProfile()
      }
      return authService.getProfile()
    },
    enabled: !shouldUseMockData || !!localStorage.getItem('whathehack_user'),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })
}

/**
 * Hook for updating user profile
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: Partial<UserProfile>): Promise<UserProfile> => {
      return authService.updateProfile(userData)
    },
    onSuccess: (data) => {
      // Update cached profile
      queryClient.setQueryData(['user', 'profile'], data)
      // Also update localStorage for mock mode
      if (typeof window !== 'undefined') {
        localStorage.setItem('whathehack_user', JSON.stringify(data))
      }
    },
    onError: (error: any) => {
      console.error('Update profile error:', error)
    },
  })
}

/**
 * Hook for changing password
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({
      oldPassword,
      newPassword,
    }: {
      oldPassword: string
      newPassword: string
    }): Promise<void> => {
      return authService.changePassword(oldPassword, newPassword)
    },
    onError: (error: any) => {
      console.error('Change password error:', error)
    },
  })
}

