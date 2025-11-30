/**
 * Hook for user login
 * Manages login state and API calls
 */

'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authService } from '../services'
import { mockAuthService, shouldUseMock } from '@/services/mock.service'
import { setAuthTokens } from '@/services/request.service'
import type { LoginRequest, AuthResponse } from '../types'

export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<AuthResponse> => {
      if (shouldUseMock()) {
        const response = await mockAuthService.login(credentials)
        if (typeof window !== 'undefined') {
          localStorage.setItem('whathehack_user', JSON.stringify(response.user))
        }
        return response
      }
      return authService.login(credentials)
    },
    onSuccess: (data) => {
      setAuthTokens(data.access, data.refresh)

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
