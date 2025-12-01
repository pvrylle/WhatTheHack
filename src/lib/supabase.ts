import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client not available. SUPABASE_SERVICE_ROLE_KEY is not set.')
  }
  return supabaseAdmin
}

export interface DbUser {
  id: string
  email: string
  username: string
  password?: string
  rank: string
  level: number
  xp: number
  total_points: number
  streak_days: number
  badges: string[]
  created_at: string
  updated_at: string
}

export interface DbAchievement {
  id: number
  title: string
  description: string | null
  icon: string | null
  category: string | null
  rarity: string | null
  points: number
  earned: boolean
  progress: number | null
  earned_date: string | null
}

export interface DbCategory {
  id: number
  name: string
  earned: number
  total: number
  color: string | null
}

export interface DbChallenge {
  id: string
  title: string | null
  description: string | null
  category: string | null
  xp_reward: number | null
  difficulty: string | null
  total_challenges: number | null
  completed_challenges: number | null
  questions: ChallengeQuestion[] | null
}

export interface ChallengeQuestion {
  type: string
  question: string
  code?: string
  context?: string
  options?: string[]
  answer: string | number
  hint: string
  explanation: string
}

export interface DbLeaderboard {
  id: number
  user_id: string
  points: number
  streak: number
  level: number
  rank: number
  period: string
}

export interface LeaderboardWithUser extends DbLeaderboard {
  users: {
    username: string
    email: string
  } | null
}
