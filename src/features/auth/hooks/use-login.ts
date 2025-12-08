/**
 * Hook for user login
 * Manages login state and API calls
 */

'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authService } from '../services'
import { setAuthTokens } from '@/services/request.service'
import type { LoginRequest, AuthResponse } from '../types'

export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<AuthResponse> => {
      return authService.login(credentials)
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
      console.error('Login error:', error)
    },
  })
}
