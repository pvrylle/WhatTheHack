import { DashboardData, UserStats, ApiResponse, ActiveMission, RecentAchievement } from '@/types'

class DashboardService {
  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      
      if (data.success) {
        return { data: data.data }
      }
      throw new Error(data.error || 'Failed to fetch dashboard data')
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      throw error
    }
  }

  async getUserStats(): Promise<ApiResponse<UserStats>> {
    try {
      const response = await fetch('/api/user')
      const data = await response.json()
      
      if (data.success) {
        return { data: data.data?.stats }
      }
      throw new Error(data.error || 'Failed to fetch user stats')
    } catch (error) {
      console.error('Error fetching user stats:', error)
      throw error
    }
  }

  async getActiveMissions(): Promise<ApiResponse<ActiveMission[]>> {
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      
      if (data.success) {
        return { data: data.data?.activeMissions || [] }
      }
      throw new Error(data.error || 'Failed to fetch active missions')
    } catch (error) {
      console.error('Error fetching active missions:', error)
      throw error
    }
  }

  async getRecentAchievements(limit: number = 5): Promise<ApiResponse<RecentAchievement[]>> {
    try {
      const response = await fetch(`/api/achievements?limit=${limit}`)
      const data = await response.json()
      
      if (data.success) {
        return { data: data.data?.recentAchievements || [] }
      }
      throw new Error(data.error || 'Failed to fetch recent achievements')
    } catch (error) {
      console.error('Error fetching recent achievements:', error)
      throw error
    }
  }
}

export const dashboardService = new DashboardService()
