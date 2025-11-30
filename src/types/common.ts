/**
 * Common types used across features
 */

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary'
export type DifficultyLevel = 'easy' | 'medium' | 'hard'

export interface Paginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface TimestampedEntity {
  created_at?: string
  updated_at?: string
}
