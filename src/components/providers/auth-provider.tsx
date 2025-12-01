'use client'

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { setAuthCookie, removeAuthCookie } from '@/lib/auth-cookie'

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
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('whathehack_user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        // Sync with cookie for middleware
        setAuthCookie(parsedUser.id)
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('whathehack_user')
        removeAuthCookie()
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success && data.data?.user) {
        const userData: User = {
          id: data.data.user.id,
          email: data.data.user.email,
          username: data.data.user.username || 'Agent',
          rank: data.data.user.rank || 'Recruit',
          level: data.data.user.level || 1,
          xp: data.data.user.xp || 0,
        }
        setUser(userData)
        localStorage.setItem('whathehack_user', JSON.stringify(userData))
        // Sync with cookie for middleware
        setAuthCookie(userData.id)
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Login failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const signup = async (
    username: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await response.json()

      if (data.success && data.data?.user) {
        // Check if email confirmation is required
        if (data.data.requiresConfirmation) {
          return { 
            success: false, 
            error: 'Please check your email to confirm your account before logging in.' 
          }
        }
        
        const userData: User = {
          id: data.data.user.id,
          email: data.data.user.email,
          username: data.data.user.username || username,
          rank: data.data.user.rank || 'Recruit',
          level: data.data.user.level || 1,
          xp: data.data.user.xp || 0,
        }
        setUser(userData)
        localStorage.setItem('whathehack_user', JSON.stringify(userData))
        // Sync with cookie for middleware
        setAuthCookie(userData.id)
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Registration failed' }
      }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('whathehack_user')
    // Remove auth cookie for middleware
    removeAuthCookie()
    router.push('/')
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
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
