import dynamic from 'next/dynamic'
import React from 'react'
import { LoadingSkeleton } from '@/components/loading-skeleton'

/**
 * Lazy Loading Utilities
 * 
 * This module provides dynamic imports with loading states
 * for improved initial bundle size and load time.
 */

// Loading component for page transitions
const PageLoadingFallback = () => React.createElement(
  'div',
  { className: 'min-h-screen bg-background flex items-center justify-center' },
  React.createElement(LoadingSkeleton, { variant: 'card', className: 'w-full max-w-md' })
)

// Dashboard components - lazy loaded
export const LazyDashboardTemplate = dynamic(
  () => import('@/components/templates/DashboardTemplate').then(mod => ({ default: mod.DashboardTemplate })),
  {
    loading: PageLoadingFallback,
    ssr: true,
  }
)

// Achievement page components - lazy loaded for large component
export const LazyAchievementsContent = dynamic(
  () => import('@/features/achievements/components/AchievementsContent'),
  {
    loading: PageLoadingFallback,
    ssr: true,
  }
)

// Learning paths page - lazy loaded
export const LazyLearningPathsContent = dynamic(
  () => import('@/features/learning-paths/components/LearningPathsContent'),
  {
    loading: PageLoadingFallback,
    ssr: true,
  }
)

/**
 * Higher-order component for lazy loading with custom loading states
 */
export function lazyLoad<T extends object>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  loadingFallback: () => React.ReactNode = PageLoadingFallback
) {
  return dynamic(importFn, {
    loading: loadingFallback,
    ssr: true,
  })
}

/**
 * Preload a lazy component (call this on hover or focus)
 */
export function preloadComponent(
  importFn: () => Promise<{ default: React.ComponentType<unknown> }>
): void {
  importFn()
}
