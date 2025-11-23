import { ChallengeCard, ChallengeCardProps } from '@/components/molecules'

export interface ChallengeGridProps {
  challenges: ChallengeCardProps[]
}

export const ChallengeGrid = ({ challenges }: ChallengeGridProps) => {
  return (
    <div className="grid gap-6">
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} {...challenge} />
      ))}
    </div>
  )
}
