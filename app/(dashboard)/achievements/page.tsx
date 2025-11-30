import dynamic from 'next/dynamic'
import { LoadingSkeleton } from '@/components/loading-skeleton'

// Lazy load the achievements content for better initial load performance
const AchievementsContent = dynamic(
  () => import('@/features/achievements/components/AchievementsContent'),
  {
    loading: () => (
      <div className="container mx-auto px-4 py-8">
        <LoadingSkeleton variant="card" className="mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <LoadingSkeleton key={i} variant="card" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <LoadingSkeleton key={i} variant="card" />
            ))}
          </div>
          <div className="space-y-4">
            <LoadingSkeleton variant="card" />
            <LoadingSkeleton variant="card" />
          </div>
        </div>
      </div>
    ),
    ssr: true,
  }
)

// Export metadata from separate file for better code organization
export { metadata } from './metadata'

/**
 * Achievements Page
 * 
 * This page uses:
 * - Dynamic imports for lazy loading the main content
 * - Static metadata for SEO
 * - Server-side rendering for initial page load
 */
export default function AchievementsPage() {
  return <AchievementsContent />
}
