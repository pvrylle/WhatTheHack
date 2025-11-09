

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


export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<AuthResponse> => {
      if (shouldUseMock()) {
        const response = await mockAuthService.login(credentials)

        localStorage.setItem('whathehack_user', JSON.stringify(response.user))
        return response
      }
      return authService.login(credentials)
    },
    onSuccess: (data) => {

      if (typeof window !== 'undefined') {
        localStorage.setItem('whathehack_user', JSON.stringify(data.user))
      }

      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      router.push('/dashboard')
    },
    onError: (error: any) => {
      console.error('Login error:', error)
    },
  })
}


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

      if (typeof window !== 'undefined') {
        localStorage.setItem('whathehack_user', JSON.stringify(data.user))
      }

      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      router.push('/dashboard')
    },
    onError: (error: any) => {
      console.error('Registration error:', error)
    },
  })
}


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

      queryClient.clear()
      clearAuthTokens()
      router.push('/')
    },
    onError: (error: any) => {
      console.error('Logout error:', error)

      clearAuthTokens()
      queryClient.clear()
      router.push('/')
    },
  })
}


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
    staleTime: 5 * 60 * 1000, 
    retry: 1,
  })
}


export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: Partial<UserProfile>): Promise<UserProfile> => {
      return authService.updateProfile(userData)
    },
    onSuccess: (data) => {

      queryClient.setQueryData(['user', 'profile'], data)

      if (typeof window !== 'undefined') {
        localStorage.setItem('whathehack_user', JSON.stringify(data))
      }
    },
    onError: (error: any) => {
      console.error('Update profile error:', error)
    },
  })
}


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
