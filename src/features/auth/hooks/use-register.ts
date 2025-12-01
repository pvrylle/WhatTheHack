/**
 * Hook for user registration
 */

'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authService } from '../services'
import { setAuthTokens } from '@/services/request.service'
import type { RegisterRequest, AuthResponse } from '../types'

export const useRegister = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: RegisterRequest): Promise<AuthResponse> => {
      return authService.register(userData)
    },
    onSuccess: (data) => {
      if (data.access && data.refresh) {
        setAuthTokens(data.access, data.refresh)
      }

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
