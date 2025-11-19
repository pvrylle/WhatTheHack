import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "@/services/dashboard.service"

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await dashboardService.getDashboardData()
      return response.data
    },
  })
}

export const useUserStats = () => {
  return useQuery({
    queryKey: ["userStats"],
    queryFn: async () => {
      const response = await dashboardService.getUserStats()
      return response.data
    },
  })
}

export const useActiveMissions = () => {
  return useQuery({
    queryKey: ["activeMissions"],
    queryFn: async () => {
      const response = await dashboardService.getActiveMissions()
      return response.data
    },
  })
}

export const useRecentAchievements = (limit: number = 5) => {
  return useQuery({
    queryKey: ["recentAchievements", limit],
    queryFn: async () => {
      const response = await dashboardService.getRecentAchievements(limit)
      return response.data
    },
  })
}
