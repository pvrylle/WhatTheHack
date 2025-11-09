


export interface ApiResponse<T = any> {
  data?: T
  results?: T[] 
  count?: number
  next?: string | null
  previous?: string | null
  detail?: string 
  message?: string
  status?: number
}


export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}


export interface ApiError {
  detail?: string
  message?: string
  errors?: Record<string, string[]>
  non_field_errors?: string[]
  [key: string]: any
}


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
  access: string 
  refresh: string 
  user: User
}

export interface TokenRefreshRequest {
  refresh: string
}

export interface TokenRefreshResponse {
  access: string
}


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
