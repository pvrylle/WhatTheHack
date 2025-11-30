import type { TimestampedEntity } from '../common'

export interface User extends TimestampedEntity {
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
