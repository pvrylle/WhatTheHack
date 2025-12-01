import dynamic from 'next/dynamic'
import { LoadingSkeleton } from '@/components/loading-skeleton'

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

export { metadata } from './metadata'

export default function SettingsPage() {
  return <SettingsContent />
}
