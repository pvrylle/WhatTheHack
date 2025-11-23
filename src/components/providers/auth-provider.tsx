'use client'

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  username: string
  rank: string
  level: number
  xp: number
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hardcoded user accounts for demo
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('whathehack_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('whathehack_user')
      }
    }
  }, [])

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const account = DEMO_ACCOUNTS.find((acc) => acc.email === email && acc.password === password)

    if (account) {
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: account.email,
        username: account.username,
        rank: account.rank,
        level: account.level,
        xp: account.xp,
      }
      setUser(userData)
      localStorage.setItem('whathehack_user', JSON.stringify(userData))
      return { success: true }
    } else {
      return { success: false, error: 'Invalid credentials' }
    }
  }

  const signup = async (
    username: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check if email already exists
    const existingAccount = DEMO_ACCOUNTS.find((acc) => acc.email === email)
    if (existingAccount) {
      return { success: false, error: 'Email already exists' }
    }

    // For demo purposes, create a new user
    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      username,
      rank: 'Rookie Hacker',
      level: 1,
      xp: 0,
    }
    setUser(userData)
    localStorage.setItem('whathehack_user', JSON.stringify(userData))

    return { success: true }
  }

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('whathehack_user')
    router.push('/')
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
