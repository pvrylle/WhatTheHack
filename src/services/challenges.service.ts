/**
 * Challenges Service
 * Handles all challenges and missions related API calls
 * Uses Next.js API routes with Supabase backend
 */

import type {
  Challenge,
  ChallengeDetail,
  ChallengeSubmission,
  ChallengeSubmissionResponse,
  Mission,
  MissionProgress,
  PaginatedResponse,
} from '@/types'

/**
 * Challenges Service
 */
export const challengesService = {
  /**
   * Get all challenges
   * GET /api/challenges
   */
  getChallenges: async (params?: {
    category?: string
    difficulty?: string
    page?: number
  }): Promise<PaginatedResponse<Challenge>> => {
    const queryParams = new URLSearchParams()
    if (params?.category) queryParams.append('category', params.category)
    if (params?.difficulty) queryParams.append('difficulty', params.difficulty)
    if (params?.page) queryParams.append('page', params.page.toString())

    const endpoint = `/api/challenges${queryParams.toString() ? `?${queryParams}` : ''}`
    const response = await fetch(endpoint)
    const data = await response.json()

    if (data.success && data.data?.challenges) {
      return {
        count: data.data.challenges.length,
        next: null,
        previous: null,
        results: data.data.challenges,
      }
    }

    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    }
  },

  /**
   * Get challenge by ID
   * GET /api/challenges/[category]?challengeId={id}
   */
  getChallenge: async (id: string | number): Promise<ChallengeDetail> => {
    const response = await fetch(`/api/challenges?challengeId=${id}`)
    const data = await response.json()

    if (data.success && data.data) {
      return data.data
    }

    throw new Error('Challenge not found')
  },

  /**
   * Get challenges by category
   * GET /api/challenges/[category]
   */
  getChallengesByCategory: async (category: string): Promise<Challenge[]> => {
    const response = await fetch(`/api/challenges/${category}`)
    const data = await response.json()

    if (data.success && data.data?.challenges) {
      return data.data.challenges
    }
    
    return []
  },

  /**
   * Submit challenge answer
   * POST /api/challenges/[category] with challengeId
   */
  submitChallenge: async (
    id: string | number,
    submission: ChallengeSubmission
  ): Promise<ChallengeSubmissionResponse> => {
    const response = await fetch(`/api/challenges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ challengeId: id, ...submission }),
    })
    const data = await response.json()

    if (data.success && data.data) {
      return data.data
    }

    throw new Error('Submission failed')
  },

  /**
   * Get challenge progress
   */
  getChallengeProgress: async (id: string | number): Promise<any> => {
    const response = await fetch(`/api/challenges?challengeId=${id}&progress=true`)
    const data = await response.json()

    return data.data
  },

  /**
   * Get all missions
   * GET /api/challenges
   */
  getMissions: async (): Promise<Mission[]> => {
    const response = await fetch('/api/challenges')
    const data = await response.json()

    if (data.success && data.data?.missions) {
      return data.data.missions
    }
    
    return []
  },

  /**
   * Get mission by ID
   */
  getMission: async (id: string): Promise<Mission> => {
    const response = await fetch(`/api/challenges?missionId=${id}`)
    const data = await response.json()

    if (data.success && data.data) {
      return data.data
    }

    throw new Error('Mission not found')
  },

  /**
   * Get mission challenges
   */
  getMissionChallenges: async (id: string): Promise<Challenge[]> => {
    const response = await fetch(`/api/challenges?missionId=${id}`)
    const data = await response.json()

    if (data.success && data.data?.challenges) {
      return data.data.challenges
    }
    
    return []
  },

  /**
   * Get mission progress
   */
  getMissionProgress: async (id: string): Promise<MissionProgress> => {
    const response = await fetch(`/api/challenges?missionId=${id}&progress=true`)
    const data = await response.json()

    if (data.success && data.data) {
      return data.data
    }

    throw new Error('Failed to fetch mission progress')
  },
}

export default challengesService
