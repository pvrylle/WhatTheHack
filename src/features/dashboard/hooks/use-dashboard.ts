/**
 * Hook for dashboard data
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboard.service'
import type { DashboardData } from '@/types'

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await dashboardService.getDashboardData()
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })
}
