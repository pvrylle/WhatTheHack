/**
 * useChallengesRequest Hook
 * Custom hooks for challenges and missions requests
 * Uses React Query for data fetching and caching
 */

'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { challengesService } from '@/services/challenges.service'
import { mockChallengesService, shouldUseMock } from '@/services/mock.service'
import type {
  Challenge,
  ChallengeDetail,
  ChallengeSubmission,
  ChallengeSubmissionResponse,
  Mission,
  MissionProgress,
} from '@/interfaces/api'

/**
 * Hook for fetching all missions
 */
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
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook for fetching a single mission
 */
export const useMission = (missionId: string) => {
  const shouldUseMockData = shouldUseMock()

  return useQuery({
    queryKey: ['missions', missionId],
    queryFn: async (): Promise<Mission> => {
      if (shouldUseMockData) {
        return mockChallengesService.getMission(missionId)
      }
      return challengesService.getMission(missionId)
    },
    enabled: !!missionId,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook for fetching mission challenges
 */
export const useMissionChallenges = (missionId: string) => {
  return useQuery({
    queryKey: ['missions', missionId, 'challenges'],
    queryFn: async (): Promise<Challenge[]> => {
      return challengesService.getMissionChallenges(missionId)
    },
    enabled: !!missionId && !shouldUseMock(),
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook for fetching mission progress
 */
export const useMissionProgress = (missionId: string) => {
  const shouldUseMockData = shouldUseMock()

  return useQuery({
    queryKey: ['missions', missionId, 'progress'],
    queryFn: async (): Promise<MissionProgress> => {
      if (shouldUseMockData) {
        // Return mock progress
        const mission = await mockChallengesService.getMission(missionId)
        return {
          mission_id: missionId,
          progress_percentage: Math.round(
            (mission.completedChallenges / mission.totalChallenges) * 100
          ),
          completed_challenges: mission.completedChallenges,
          total_challenges: mission.totalChallenges,
          xp_earned: mission.completedChallenges * 150,
          xp_remaining: (mission.totalChallenges - mission.completedChallenges) * 150,
        }
      }
      return challengesService.getMissionProgress(missionId)
    },
    enabled: !!missionId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

/**
 * Hook for fetching all challenges
 */
export const useChallenges = (params?: {
  category?: string
  difficulty?: string
  page?: number
}) => {
  return useQuery({
    queryKey: ['challenges', params],
    queryFn: async () => {
      return challengesService.getChallenges(params)
    },
    enabled: !shouldUseMock(),
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook for fetching a single challenge
 */
export const useChallenge = (challengeId: string | number) => {
  const shouldUseMockData = shouldUseMock()

  return useQuery({
    queryKey: ['challenges', challengeId],
    queryFn: async (): Promise<ChallengeDetail> => {
      if (shouldUseMockData) {
        // Would need to implement based on your data structure
        throw new Error('Mock challenge detail not implemented')
      }
      return challengesService.getChallenge(challengeId)
    },
    enabled: !!challengeId && !shouldUseMockData,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook for submitting challenge answer
 */
export const useSubmitChallenge = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      challengeId,
      submission,
    }: {
      challengeId: string | number
      submission: ChallengeSubmission
    }): Promise<ChallengeSubmissionResponse> => {
      return challengesService.submitChallenge(challengeId, submission)
    },
    onSuccess: (data, variables) => {
      // Invalidate challenge and mission progress
      queryClient.invalidateQueries({
        queryKey: ['challenges', variables.challengeId],
      })
      queryClient.invalidateQueries({ queryKey: ['missions'] })
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    },
    onError: (error: any) => {
      console.error('Submit challenge error:', error)
    },
  })
}

/**
 * Hook for fetching challenges by category
 */
export const useChallengesByCategory = (category: string) => {
  return useQuery({
    queryKey: ['challenges', 'category', category],
    queryFn: async (): Promise<Challenge[]> => {
      return challengesService.getChallengesByCategory(category)
    },
    enabled: !!category && !shouldUseMock(),
    staleTime: 5 * 60 * 1000,
  })
}

