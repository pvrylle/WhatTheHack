import dynamic from 'next/dynamic'
import { LoadingSkeleton } from '@/components/loading-skeleton'

// Lazy load the learning paths content for better initial load performance
const LearningPathsContent = dynamic(
  () => import('@/features/learning-paths/components/LearningPathsContent'),
  {
    loading: () => (
      <div className="container mx-auto px-4 py-8">
        <LoadingSkeleton variant="card" className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <LoadingSkeleton key={i} variant="card" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <LoadingSkeleton key={i} variant="card" />
          ))}
        </div>
      </div>
    ),
    ssr: true,
  }
)

// Export metadata from separate file for better code organization
export { metadata } from './metadata'

/**
 * Learning Paths Page
 * 
 * This page uses:
 * - Dynamic imports for lazy loading the main content
 * - Static metadata for SEO
 * - Server-side rendering for initial page load
 */
export default function LearningPathsPage() {
  return <LearningPathsContent />
}
