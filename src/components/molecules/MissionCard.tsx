import { memo, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Text } from '@/components/atoms'
import { Clock, Award, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/constants/routes'

export interface MissionCardProps {
  id: number | string
  title: string
  progress: number
  reward: string
  difficulty: string
  timeLeft: string
  category?: string
  onContinue?: () => void
}

const difficultyColors = {
  easy: 'text-success border-success/20',
  medium: 'text-secondary border-secondary/20',
  hard: 'text-destructive border-destructive/20',
}

export const MissionCard = memo(({
  id,
  title,
  progress,
  reward,
  difficulty,
  timeLeft,
  category,
  onContinue,
}: MissionCardProps) => {
  const difficultyColor = useMemo(
    () =>
      difficultyColors[difficulty.toLowerCase() as keyof typeof difficultyColors] ||
      'text-muted-foreground border-muted/20',
    [difficulty]
  )

  // Active missions link to their specific mission path page if category is provided,
  // otherwise link to learning paths page
  const missionLink = useMemo(
    () => (category ? `/challenges/${category}` : ROUTES.DASHBOARD.LEARNING_PATHS),
    [category]
  )

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (onContinue) {
        e.preventDefault()
        onContinue()
      }
    },
    [onContinue]
  )

  return (
    <Link
      href={missionLink}
      className="block border border-border rounded-lg p-6 hover:border-primary/30 transition-colors"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Text variant="h4" size="lg" weight="medium" orbitron className="mb-3">
            {title}
          </Text>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className={cn('font-mono', difficultyColor)}>
              {difficulty}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground font-mono">
              <Award className="w-3 h-3 mr-1" />
              {reward}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground font-mono">
              <Clock className="w-3 h-3 mr-1" />
              {timeLeft}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <Text size="sm" color="muted">
            Progress
          </Text>
          <Text size="sm" color="primary" mono>
            {progress}%
          </Text>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="w-full font-mono text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 flex items-center justify-center transition-colors">
          Continue Mission
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  )
})

MissionCard.displayName = 'MissionCard'
