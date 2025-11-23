/**
 * API Configuration
 * This project uses public APIs or mock data - NO custom backend required
 * 
 * Options:
 * 1. Mock Data (default) - Uses mock.service.ts for all data
 * 2. Public APIs - Set NEXT_PUBLIC_API_URL to a public API endpoint
 * 
 * Examples of public APIs you could use:
 * - JSONPlaceholder: https://jsonplaceholder.typicode.com
 * - ReqRes: https://reqres.in/api
 * - Any public REST API
 */

// For public APIs, set this in .env.local:
// NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com'

export const API_VERSION = 'v1'

export const API_URL = `${API_BASE_URL}/${API_VERSION}`

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
    LOGOUT: '/auth/logout/',
    REFRESH: '/auth/token/refresh/',
    VERIFY: '/auth/token/verify/',
    PROFILE: '/auth/profile/',
    PASSWORD_RESET: '/auth/password/reset/',
    PASSWORD_CHANGE: '/auth/password/change/',
  },

  USERS: {
    LIST: '/users/',
    DETAIL: (id: string) => `/users/${id}/`,
    PROFILE: '/users/me/',
    UPDATE_PROFILE: '/users/me/',
  },

  CHALLENGES: {
    LIST: '/challenges/',
    DETAIL: (id: string) => `/challenges/${id}/`,
    CATEGORY: (category: string) => `/challenges/category/${category}/`,
    SUBMIT: (id: string) => `/challenges/${id}/submit/`,
    PROGRESS: (id: string) => `/challenges/${id}/progress/`,
  },

  MISSIONS: {
    LIST: '/missions/',
    DETAIL: (id: string) => `/missions/${id}/`,
    CHALLENGES: (id: string) => `/missions/${id}/challenges/`,
    PROGRESS: (id: string) => `/missions/${id}/progress/`,
  },

  ACHIEVEMENTS: {
    LIST: '/achievements/',
    DETAIL: (id: string) => `/achievements/${id}/`,
    USER_ACHIEVEMENTS: '/achievements/user/',
    UNLOCK: (id: string) => `/achievements/${id}/unlock/`,
  },

  LEADERBOARD: {
    GLOBAL: '/leaderboard/',
    CATEGORY: (category: string) => `/leaderboard/${category}/`,
    USER_RANK: '/leaderboard/rank/',
  },

  STATS: {
    USER_STATS: '/stats/user/',
    GLOBAL_STATS: '/stats/global/',
  },
} as const

export const REQUEST_TIMEOUT = 30000

/**
 * Use Mock Data by default (no backend required)
 * Set NEXT_PUBLIC_USE_MOCK=false in .env.local to use public APIs instead
 */
export const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK !== 'false'

/**
 * Helper to check if we should use mock data
 */
export const shouldUseMock = (): boolean => {
  return USE_MOCK_DATA
}
