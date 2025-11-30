/**
 * Hook for fetching all missions
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { challengesService } from '../services'
import { mockChallengesService, shouldUseMock } from '@/services/mock.service'
import type { Mission } from '../types'

export const useMissions = () => {
  const shouldUseMockData = shouldUseMock()

  return useQuery({
    queryKey: ['missions'],
    queryFn: async (): Promise<Mission[]> => {
      if (shouldUseMockData) {
        return mockChallengesService.getMissions()
      }
      return challengesService.getMissions()
    },
    staleTime: 5 * 60 * 1000,
  })
}
