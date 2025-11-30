import type { Difficulty, DifficultyLevel, TimestampedEntity } from '../common'

export interface Challenge extends TimestampedEntity {
  id: string | number
  title: string
  description: string
  category: string
  difficulty: Difficulty
  xp_reward: number
  time_estimate: string
  is_completed?: boolean
  is_unlocked?: boolean
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

export interface Mission extends TimestampedEntity {
  id: string
  title: string
  description: string
  category: string
  total_challenges: number
  completed_challenges: number
  challenges: Challenge[]
  icon?: string
  color?: string
}

export interface MissionProgress {
  mission_id: string
  progress_percentage: number
  completed_challenges: number
  total_challenges: number
  xp_earned: number
  xp_remaining: number
}
