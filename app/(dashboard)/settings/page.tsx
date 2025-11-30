import dynamic from 'next/dynamic'
import { LoadingSkeleton } from '@/components/loading-skeleton'

// Lazy load the settings content for better initial load performance
const SettingsContent = dynamic(
  () => import('@/features/settings/components/SettingsContent'),
  {
    loading: () => (
      <div className="container mx-auto px-4 py-8">
        <LoadingSkeleton variant="card" className="mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <LoadingSkeleton variant="card" />
          <div className="lg:col-span-3">
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
 * Settings Page
 * 
 * This page uses:
 * - Dynamic imports for lazy loading the main content
 * - Static metadata for SEO
 * - Server-side rendering for initial page load
 */
export default function SettingsPage() {
  return <SettingsContent />
}
