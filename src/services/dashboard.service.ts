import httpService from './request.service'
import { DashboardData, UserStats, ApiResponse, ActiveMission, RecentAchievement } from '@/types'

class DashboardService {
  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    try {
      const response = await httpService.get<DashboardData>('/api/dashboard/')
      return { data: response.data }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      throw error
    }
  }

  async getUserStats(): Promise<ApiResponse<UserStats>> {
    try {
      const response = await httpService.get<UserStats>('/api/stats/user/')
      return { data: response.data }
    } catch (error) {
      console.error('Error fetching user stats:', error)
      throw error
    }
  }

  async getActiveMissions(): Promise<ApiResponse<ActiveMission[]>> {
    try {
      const response = await httpService.get<ActiveMission[]>('/api/missions/active/')
      return { data: response.data }
    } catch (error) {
      console.error('Error fetching active missions:', error)
      throw error
    }
  }

  async getRecentAchievements(limit: number = 5): Promise<ApiResponse<RecentAchievement[]>> {
    try {
      const response = await httpService.get<RecentAchievement[]>(
        `/api/achievements/recent/?limit=${limit}`
      )
      return { data: response.data }
    } catch (error) {
      console.error('Error fetching recent achievements:', error)
      throw error
    }
  }
}

export const dashboardService = new DashboardService()
