import type { RecentAchievement } from './achievements'

export interface UserStats {
  total_xp: number
  level: number
  xp_to_next: number
  challenges_completed: number
  achievements_earned: number
  current_streak: number
  longest_streak: number
  total_time_spent: number
  accuracy_percentage: number
  total_points: number
  rank: string
}

export interface GlobalStats {
  total_users: number
  total_challenges: number
  total_completions: number
  total_xp_earned: number
  active_users_today: number
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

export interface DashboardData {
  user_stats: UserStats
  active_missions: ActiveMission[]
  recent_achievements: RecentAchievement[]
}

export interface ActiveMission {
  id: string | number
  title: string
  progress: number
  reward: string
  difficulty: 'easy' | 'medium' | 'hard'
  time_left: string
}
