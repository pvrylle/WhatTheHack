/**
 * Mock Service
 * Provides mock data for the application
 * 
 * This is the PRIMARY data source - no backend required!
 * All data is simulated locally for demonstration purposes.
 * 
 * To use public APIs instead, set NEXT_PUBLIC_USE_MOCK=false
 */

import { USE_MOCK_DATA } from '@/constants/api'
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  UserProfile,
  Challenge,
  ChallengeDetail,
  Mission,
} from '@/types'
import { missionPaths } from '@/data/challenges'

// Mock delay to simulate network request
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Mock Authentication Service
 */
export const mockAuthService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    await delay(1500)

    const DEMO_ACCOUNTS = [
      {
        email: 'demo@hack.com',
        password: 'demo123',
        username: 'CyberAgent001',
        rank: 'Elite Hacker',
        level: 12,
        xp: 2850,
      },
      {
        email: 'admin@hack.com',
        password: 'admin123',
        username: 'SystemAdmin',
        rank: 'Master Hacker',
        level: 25,
        xp: 8420,
      },
      {
        email: 'test@hack.com',
        password: 'test123',
        username: 'TestAgent',
        rank: 'Rookie Hacker',
        level: 5,
        xp: 1200,
      },
    ]

    const account = DEMO_ACCOUNTS.find(
      (acc) => acc.email === credentials.email && acc.password === credentials.password
    )

    if (!account) {
      throw { detail: 'Invalid credentials' }
    }

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: account.email,
      username: account.username,
      rank: account.rank,
      level: account.level,
      xp: account.xp,
    }

    return {
      access: 'mock_access_token',
      refresh: 'mock_refresh_token',
      user,
    }
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    await delay(1500)

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      username: userData.username,
      rank: 'Rookie Hacker',
      level: 1,
      xp: 0,
    }

    return {
      access: 'mock_access_token',
      refresh: 'mock_refresh_token',
      user,
    }
  },

  getProfile: async (): Promise<UserProfile> => {
    await delay(500)

    const storedUser = localStorage.getItem('whathehack_user')
    if (storedUser) {
      return JSON.parse(storedUser)
    }

    throw { detail: 'User not found' }
  },

  logout: async (): Promise<void> => {
    await delay(300)
  },
}

/**
 * Mock Challenges Service
 */
export const mockChallengesService = {
  getMissions: async (): Promise<Mission[]> => {
    await delay(800)
    return Object.values(missionPaths).map((path) => ({
      id: path.id,
      title: path.title,
      description: path.description,
      category: path.id, // Use id as category for now
      total_challenges: path.totalChallenges,
      completed_challenges: path.completedChallenges,
      challenges: path.challenges.map((ch) => ({
        id: ch.id,
        title: ch.title,
        description: ch.description,
        category: ch.category,
        difficulty: ch.difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
        xp_reward: ch.xpReward,
        time_estimate: ch.timeEstimate,
        is_completed: ch.isCompleted,
        is_unlocked: ch.isUnlocked,
      })),
      icon: undefined,
      color: path.color,
    }))
  },

  getMission: async (id: string): Promise<Mission> => {
    await delay(500)
    const path = missionPaths[id]
    if (!path) {
      throw { detail: 'Mission not found' }
    }
    return {
      id: path.id,
      title: path.title,
      description: path.description,
      category: path.id,
      total_challenges: path.totalChallenges,
      completed_challenges: path.completedChallenges,
      challenges: path.challenges.map((ch) => ({
        id: ch.id,
        title: ch.title,
        description: ch.description,
        category: ch.category,
        difficulty: ch.difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
        xp_reward: ch.xpReward,
        time_estimate: ch.timeEstimate,
        is_completed: ch.isCompleted,
        is_unlocked: ch.isUnlocked,
      })),
      icon: undefined,
      color: path.color,
    }
  },

  getChallenge: async (category: string, id: string): Promise<ChallengeDetail | undefined> => {
    await delay(500)
    // This would need to be implemented based on your challenge data structure
    return undefined
  },
}

/**
 * Check if mock service should be used
 */
export const shouldUseMock = (): boolean => {
  return USE_MOCK_DATA
}
