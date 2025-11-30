/**
 * Hook for fetching all challenges
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { challengesService } from '../services'
import { mockChallengesService, shouldUseMock } from '@/services/mock.service'
import type { Challenge } from '../types'

export const useChallenges = () => {
  const shouldUseMockData = shouldUseMock()

  return useQuery({
    queryKey: ['challenges'],
    queryFn: async (): Promise<Challenge[]> => {
      if (shouldUseMockData) {
        return mockChallengesService
          .getMissions()
          .then((missions) => missions.flatMap((mission) => mission.challenges))
      }
      const response = await challengesService.getChallenges()
      return response.results || []
    },
    staleTime: 5 * 60 * 1000,
  })
}
