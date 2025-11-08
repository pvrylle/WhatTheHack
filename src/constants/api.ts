/**
 * API Constants
 * Centralized configuration for API endpoints
 * Easy to update when Django backend is ready
 */

// API Base URL - Update this when Django backend is ready
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// API Version
export const API_VERSION = 'v1'

// Full API URL
export const API_URL = `${API_BASE_URL}/${API_VERSION}`

/**
 * API Endpoints
 * Django REST Framework compatible endpoints
 */
export const API_ENDPOINTS = {
  // Authentication
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

  // User Management
  USERS: {
    LIST: '/users/',
    DETAIL: (id: string) => `/users/${id}/`,
    PROFILE: '/users/me/',
    UPDATE_PROFILE: '/users/me/',
  },

  // Challenges & Missions
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

  // Achievements
  ACHIEVEMENTS: {
    LIST: '/achievements/',
    DETAIL: (id: string) => `/achievements/${id}/`,
    USER_ACHIEVEMENTS: '/achievements/user/',
    UNLOCK: (id: string) => `/achievements/${id}/unlock/`,
  },

  // Leaderboard
  LEADERBOARD: {
    GLOBAL: '/leaderboard/',
    CATEGORY: (category: string) => `/leaderboard/${category}/`,
    USER_RANK: '/leaderboard/rank/',
  },

  // Statistics
  STATS: {
    USER_STATS: '/stats/user/',
    GLOBAL_STATS: '/stats/global/',
  },
} as const

/**
 * Request Timeout (in milliseconds)
 */
export const REQUEST_TIMEOUT = 30000

/**
 * Enable/Disable Mock Mode
 * Set to false when Django backend is ready
 */
export const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || true

