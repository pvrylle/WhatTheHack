import { ChallengeCard, ChallengeCardProps } from '@/components/molecules'
import { cn } from '@/lib/utils'

export interface ChallengeGridProps {
  challenges: ChallengeCardProps[]
  className?: string
}

export const ChallengeGrid = ({ challenges, className }: ChallengeGridProps) => {
  if (challenges.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground font-mono">No challenges available</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'grid gap-6',
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} {...challenge} />
      ))}
    </div>
  )
}
