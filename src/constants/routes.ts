/**
 * Application route constants
 * Single source of truth for all routes
 */

export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    AUTH: '/auth',
    ABOUT: '/about',
  },
  DASHBOARD: {
    HOME: '/dashboard',
    CHALLENGES: '/challenges',
    CHALLENGE_DETAIL: (category: string, id: string | number) => `/challenges/${category}/${id}`,
    ACHIEVEMENTS: '/achievements',
    LEARNING_PATHS: '/learning-paths',
    SETTINGS: '/settings',
  },
} as const

export const PROTECTED_ROUTES = Object.values(ROUTES.DASHBOARD)
export const PUBLIC_ROUTES = Object.values(ROUTES.PUBLIC)
