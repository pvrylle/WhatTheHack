/**
 * API Response Interfaces
 * TypeScript interfaces matching Django REST Framework serializers
 */

/**
 * Standard API Response Wrapper
 * Django REST Framework typically returns data in this format
 */
export interface ApiResponse<T = any> {
  data?: T
  results?: T[] // For paginated responses
  count?: number
  next?: string | null
  previous?: string | null
  detail?: string // Error message
  message?: string
  status?: number
}

/**
 * Paginated Response
 * Django REST Framework pagination format
 */
export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

/**
 * Error Response
 */
export interface ApiError {
  detail?: string
  message?: string
  errors?: Record<string, string[]>
  non_field_errors?: string[]
  [key: string]: any
}

/**
 * Authentication Interfaces
 */
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  password_confirm?: string
}

export interface AuthResponse {
  access: string // JWT access token
  refresh: string // JWT refresh token
  user: User
}

export interface TokenRefreshRequest {
  refresh: string
}

export interface TokenRefreshResponse {
  access: string
}

/**
 * User Interface
 */
export interface User {
  id: string | number
  username: string
  email: string
  first_name?: string
  last_name?: string
  rank?: string
  level?: number
  xp?: number
  avatar?: string
  is_active?: boolean
  date_joined?: string
  last_login?: string
}

export interface UserProfile extends User {
  bio?: string
  achievements_count?: number
  challenges_completed?: number
  total_xp?: number
  current_streak?: number
  longest_streak?: number
}

/**
 * Challenge Interfaces
 */
export interface Challenge {
  id: string | number
  title: string
  description: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  xp_reward: number
  time_estimate: string
  is_completed?: boolean
  is_unlocked?: boolean
  created_at?: string
  updated_at?: string
}

export interface ChallengeDetail extends Challenge {
  questions: ChallengeQuestion[]
  hints?: string[]
  explanation?: string
  code_snippet?: string
  solution?: string
}

export interface ChallengeQuestion {
  id: string | number
  question: string
  type: 'code-analysis' | 'payload-craft' | 'multiple-choice'
  answer: string | number
  options?: string[]
  hint?: string
  explanation?: string
  code?: string
}

export interface ChallengeSubmission {
  challenge_id: string | number
  answer: string | number
  time_taken?: number
}

export interface ChallengeSubmissionResponse {
  correct: boolean
  message: string
  xp_earned?: number
  explanation?: string
}

/**
 * Mission Interfaces
 */
export interface Mission {
  id: string
  title: string
  description: string
  category: string
  total_challenges: number
  completed_challenges: number
  challenges: Challenge[]
  icon?: string
  color?: string
  created_at?: string
  updated_at?: string
}

export interface MissionProgress {
  mission_id: string
  progress_percentage: number
  completed_challenges: number
  total_challenges: number
  xp_earned: number
  xp_remaining: number
}

/**
 * Achievement Interfaces
 */
export interface Achievement {
  id: string | number
  name: string
  description: string
  icon?: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
  xp_reward: number
  is_earned?: boolean
  earned_at?: string
  progress?: number
  requirement?: number
}

/**
 * Leaderboard Interfaces
 */
export interface LeaderboardEntry {
  rank: number
  user: {
    id: string | number
    username: string
    avatar?: string
  }
  total_xp: number
  level: number
  challenges_completed: number
  achievements_count: number
}

/**
 * Statistics Interfaces
 */
export interface UserStats {
  total_xp: number
  level: number
  challenges_completed: number
  achievements_earned: number
  current_streak: number
  longest_streak: number
  total_time_spent: number
  accuracy_percentage: number
}

export interface GlobalStats {
  total_users: number
  total_challenges: number
  total_completions: number
  total_xp_earned: number
  active_users_today: number
}

