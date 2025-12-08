/**
 * Supabase Database Types
 * Auto-generated types for your Supabase database
 * 
 * To regenerate, run: npx supabase gen types typescript --project-id mplgctdqyqistyuufbso > src/types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
export type RarityLevel = 'Common' | 'Rare' | 'Epic' | 'Legendary'
export type QuestionType =
  | 'code-analysis'
  | 'payload-craft'
  | 'multiple-choice'
  | 'vulnerability-spot'
  | 'vulnerability-analysis'
  | 'defense-identify'
  | 'attack-vector'
  | 'mitigation'
  | 'logic-flaw'
  | 'session-analysis'
  | 'bypass-technique'
  | 'secure-implementation'

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          username: string
          avatar_url: string | null
          rank: string
          bio: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          avatar_url?: string | null
          rank?: string
          bio?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          avatar_url?: string | null
          rank?: string
          bio?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_stats: {
        Row: {
          id: string
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
          last_activity_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          total_xp?: number
          level?: number
          xp_to_next?: number
          challenges_completed?: number
          achievements_earned?: number
          current_streak?: number
          longest_streak?: number
          total_time_spent?: number
          accuracy_percentage?: number
          total_points?: number
          last_activity_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          total_xp?: number
          level?: number
          xp_to_next?: number
          challenges_completed?: number
          achievements_earned?: number
          current_streak?: number
          longest_streak?: number
          total_time_spent?: number
          accuracy_percentage?: number
          total_points?: number
          last_activity_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      missions: {
        Row: {
          id: string
          title: string
          description: string
          icon: string | null
          color: string
          order_index: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          title: string
          description: string
          icon?: string | null
          color?: string
          order_index?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string | null
          color?: string
          order_index?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      challenges: {
        Row: {
          id: string
          mission_id: string
          title: string
          description: string
          difficulty: DifficultyLevel
          xp_reward: number
          time_estimate: string | null
          category: string | null
          order_index: number
          prerequisites: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          mission_id: string
          title: string
          description: string
          difficulty?: DifficultyLevel
          xp_reward?: number
          time_estimate?: string | null
          category?: string | null
          order_index?: number
          prerequisites?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mission_id?: string
          title?: string
          description?: string
          difficulty?: DifficultyLevel
          xp_reward?: number
          time_estimate?: string | null
          category?: string | null
          order_index?: number
          prerequisites?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      challenge_questions: {
        Row: {
          id: string
          challenge_id: string
          question: string
          type: QuestionType
          code_snippet: string | null
          context: string | null
          options: Json | null
          correct_answer: string
          hint: string | null
          explanation: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          challenge_id: string
          question: string
          type: QuestionType
          code_snippet?: string | null
          context?: string | null
          options?: Json | null
          correct_answer: string
          hint?: string | null
          explanation?: string | null
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          challenge_id?: string
          question?: string
          type?: QuestionType
          code_snippet?: string | null
          context?: string | null
          options?: Json | null
          correct_answer?: string
          hint?: string | null
          explanation?: string | null
          order_index?: number
          created_at?: string
        }
      }
      user_challenge_progress: {
        Row: {
          id: string
          user_id: string
          challenge_id: string
          is_completed: boolean
          is_unlocked: boolean
          xp_earned: number
          time_taken: number | null
          attempts: number
          last_attempt_at: string | null
          completed_at: string | null
          answers_history: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          challenge_id: string
          is_completed?: boolean
          is_unlocked?: boolean
          xp_earned?: number
          time_taken?: number | null
          attempts?: number
          last_attempt_at?: string | null
          completed_at?: string | null
          answers_history?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          challenge_id?: string
          is_completed?: boolean
          is_unlocked?: boolean
          xp_earned?: number
          time_taken?: number | null
          attempts?: number
          last_attempt_at?: string | null
          completed_at?: string | null
          answers_history?: Json
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: number
          name: string
          description: string
          icon: string | null
          category: string | null
          rarity: RarityLevel
          xp_reward: number
          points: number
          requirement: Json | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          icon?: string | null
          category?: string | null
          rarity?: RarityLevel
          xp_reward?: number
          points?: number
          requirement?: Json | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          icon?: string | null
          category?: string | null
          rarity?: RarityLevel
          xp_reward?: number
          points?: number
          requirement?: Json | null
          is_active?: boolean
          created_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: number
          progress: number
          earned_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: number
          progress?: number
          earned_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: number
          progress?: number
          earned_at?: string | null
          created_at?: string
        }
      }
      user_active_missions: {
        Row: {
          id: string
          user_id: string
          mission_id: string
          started_at: string
          deadline_at: string | null
          is_pinned: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mission_id: string
          started_at?: string
          deadline_at?: string | null
          is_pinned?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mission_id?: string
          started_at?: string
          deadline_at?: string | null
          is_pinned?: boolean
          created_at?: string
        }
      }
      daily_streaks: {
        Row: {
          id: string
          user_id: string
          activity_date: string
          challenges_completed: number
          xp_earned: number
          time_spent: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_date: string
          challenges_completed?: number
          xp_earned?: number
          time_spent?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_date?: string
          challenges_completed?: number
          xp_earned?: number
          time_spent?: number
          created_at?: string
        }
      }
    }
    Views: {
      leaderboard_view: {
        Row: {
          rank: number
          user_id: string
          username: string
          avatar_url: string | null
          user_rank: string
          total_xp: number
          level: number
          current_streak: number
          challenges_completed: number
          achievements_earned: number
        }
      }
      user_mission_progress: {
        Row: {
          user_id: string | null
          mission_id: string
          mission_title: string
          icon: string | null
          color: string
          total_challenges: number
          completed_challenges: number
          progress_percentage: number | null
          xp_earned: number
        }
      }
    }
    Functions: {
      calculate_level: {
        Args: { xp: number }
        Returns: number
      }
      calculate_xp_to_next: {
        Args: { xp: number }
        Returns: number
      }
      get_rank_from_level: {
        Args: { lvl: number }
        Returns: string
      }
    }
    Enums: {
      difficulty_level: DifficultyLevel
      rarity_level: RarityLevel
      question_type: QuestionType
    }
  }
}

// Helper types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Views<T extends keyof Database['public']['Views']> = Database['public']['Views'][T]['Row']

// Convenience exports
export type UserProfile = Tables<'user_profiles'>
export type UserStats = Tables<'user_stats'>
export type Mission = Tables<'missions'>
export type Challenge = Tables<'challenges'>
export type ChallengeQuestion = Tables<'challenge_questions'>
export type UserChallengeProgress = Tables<'user_challenge_progress'>
export type Achievement = Tables<'achievements'>
export type UserAchievement = Tables<'user_achievements'>
export type UserActiveMission = Tables<'user_active_missions'>
export type DailyStreak = Tables<'daily_streaks'>
export type LeaderboardEntry = Views<'leaderboard_view'>
export type MissionProgress = Views<'user_mission_progress'>
