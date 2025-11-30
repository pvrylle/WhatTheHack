/**
 * Challenges Service
 * Handles all challenges and missions related API calls
 * Compatible with Django REST Framework
 */

import httpService from './request.service'
import { API_ENDPOINTS } from '@/constants/api'
import type {
  Challenge,
  ChallengeDetail,
  ChallengeSubmission,
  ChallengeSubmissionResponse,
  Mission,
  MissionProgress,
  ApiResponse,
  PaginatedResponse,
} from '@/types'

/**
 * Challenges Service
 */
export const challengesService = {
  /**
   * Get all challenges
   * GET /api/v1/challenges/
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

    const endpoint = `${API_ENDPOINTS.CHALLENGES.LIST}${queryParams.toString() ? `?${queryParams}` : ''}`
    const response = await httpService.get<PaginatedResponse<Challenge>>(endpoint)

    let results: Challenge[] = []
    if (response.results && Array.isArray(response.results)) {
      results = response.results as unknown as Challenge[]
    } else if (Array.isArray(response.data)) {
      results = response.data as unknown as Challenge[]
    }
    return {
      count: response.count || 0,
      next: response.next || null,
      previous: response.previous || null,
      results: results,
    }
  },

  /**
   * Get challenge by ID
   * GET /api/v1/challenges/{id}/
   */
  getChallenge: async (id: string | number): Promise<ChallengeDetail> => {
    const response = await httpService.get<ChallengeDetail>(
      API_ENDPOINTS.CHALLENGES.DETAIL(String(id))
    )

    if (response.data) {
      return response.data
    }

    throw new Error('Challenge not found')
  },

  /**
   * Get challenges by category
   * GET /api/v1/challenges/category/{category}/
   */
  getChallengesByCategory: async (category: string): Promise<Challenge[]> => {
    const response = await httpService.get<Challenge[] | PaginatedResponse<Challenge>>(
      API_ENDPOINTS.CHALLENGES.CATEGORY(category)
    )

    if (response.results && Array.isArray(response.results)) {
      return response.results as unknown as Challenge[]
    }
    if (Array.isArray(response.data)) {
      return response.data as unknown as Challenge[]
    }
    return []
  },

  /**
   * Submit challenge answer
   * POST /api/v1/challenges/{id}/submit/
   */
  submitChallenge: async (
    id: string | number,
    submission: ChallengeSubmission
  ): Promise<ChallengeSubmissionResponse> => {
    const response = await httpService.post<ChallengeSubmissionResponse>(
      API_ENDPOINTS.CHALLENGES.SUBMIT(String(id)),
      submission
    )

    if (response.data) {
      return response.data
    }

    throw new Error('Submission failed')
  },

  /**
   * Get challenge progress
   * GET /api/v1/challenges/{id}/progress/
   */
  getChallengeProgress: async (id: string | number): Promise<any> => {
    const response = await httpService.get(API_ENDPOINTS.CHALLENGES.PROGRESS(String(id)))

    return response.data
  },

  /**
   * Get all missions
   * GET /api/v1/missions/
   */
  getMissions: async (): Promise<Mission[]> => {
    const response = await httpService.get<Mission[] | PaginatedResponse<Mission>>(
      API_ENDPOINTS.MISSIONS.LIST
    )

    if (response.results && Array.isArray(response.results)) {
      return response.results as unknown as Mission[]
    }
    if (Array.isArray(response.data)) {
      return response.data as unknown as Mission[]
    }
    return []
  },

  /**
   * Get mission by ID
   * GET /api/v1/missions/{id}/
   */
  getMission: async (id: string): Promise<Mission> => {
    const response = await httpService.get<Mission>(API_ENDPOINTS.MISSIONS.DETAIL(id))

    if (response.data) {
      return response.data
    }

    throw new Error('Mission not found')
  },

  /**
   * Get mission challenges
   * GET /api/v1/missions/{id}/challenges/
   */
  getMissionChallenges: async (id: string): Promise<Challenge[]> => {
    const response = await httpService.get<Challenge[] | PaginatedResponse<Challenge>>(
      API_ENDPOINTS.MISSIONS.CHALLENGES(id)
    )

    if (response.results && Array.isArray(response.results)) {
      return response.results as unknown as Challenge[]
    }
    if (Array.isArray(response.data)) {
      return response.data as unknown as Challenge[]
    }
    return []
  },

  /**
   * Get mission progress
   * GET /api/v1/missions/{id}/progress/
   */
  getMissionProgress: async (id: string): Promise<MissionProgress> => {
    const response = await httpService.get<MissionProgress>(API_ENDPOINTS.MISSIONS.PROGRESS(id))

    if (response.data) {
      return response.data
    }

    throw new Error('Failed to fetch mission progress')
  },
}

export default challengesService
