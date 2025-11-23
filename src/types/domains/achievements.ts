import type { Rarity, TimestampedEntity } from '../common'

export interface Achievement extends TimestampedEntity {
  id: string | number
  name: string
  description: string
  icon?: string
  rarity: Rarity
  xp_reward: number
  is_earned?: boolean
  earned_at?: string
  progress?: number
  requirement?: number
}

export interface RecentAchievement {
  id: string | number
  title: string
  description: string
  earned: string
  rarity: Lowercase<Rarity>
}
