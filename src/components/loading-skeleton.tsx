import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
  variant?: 'page' | 'card' | 'mission' | 'achievement' | 'inline'
  className?: string
}

/**
 * Universal loading skeleton component with multiple variants
 * Used for lazy loading fallbacks and content loading states
 */
export const LoadingSkeleton = ({ variant = 'card', className }: LoadingSkeletonProps) => {
  switch (variant) {
    case 'page':
      return <PageSkeleton />
    case 'mission':
      return <MissionCardSkeleton />
    case 'achievement':
      return <AchievementCardSkeleton />
    case 'inline':
      return <Skeleton className={cn('h-4 w-full', className)} />
    case 'card':
    default:
      return <CardSkeleton className={className} />
  }
}

export const PageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-96" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export const CardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

export const MissionCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

export const AchievementCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Skeleton className="w-16 h-16 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

