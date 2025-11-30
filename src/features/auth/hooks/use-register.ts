/**
 * Hook for user registration
 */

'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authService } from '../services'
import { mockAuthService, shouldUseMock } from '@/services/mock.service'
import { setAuthTokens } from '@/services/request.service'
import type { RegisterRequest, AuthResponse } from '../types'

export const useRegister = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: RegisterRequest): Promise<AuthResponse> => {
      if (shouldUseMock()) {
        const response = await mockAuthService.register(userData)
        if (typeof window !== 'undefined') {
          localStorage.setItem('whathehack_user', JSON.stringify(response.user))
        }
        return response
      }
      return authService.register(userData)
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
      console.error('Register error:', error)
    },
  })
}
