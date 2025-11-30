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
  easy: 'text-success border-success/20 bg-success/10',
  medium: 'text-secondary border-secondary/20 bg-secondary/10',
  hard: 'text-destructive border-destructive/20 bg-destructive/10',
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
      className="block border border-border/50 rounded-lg p-3 sm:p-4 hover:border-primary/30 hover:bg-primary/[0.02] transition-all group"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Text variant="h4" size="sm" weight="medium" orbitron className="truncate">
              {title}
            </Text>
            <Badge variant="outline" className={cn('font-mono text-[10px] shrink-0', difficultyColor)}>
              {difficulty}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3 text-[10px] sm:text-xs text-muted-foreground font-mono mb-2">
            <span className="flex items-center gap-1">
              <Award className="w-3 h-3" />
              {reward}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeLeft}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Progress value={progress} className="h-1.5 flex-1" />
            <Text size="xs" color="primary" mono className="shrink-0">
              {progress}%
            </Text>
          </div>
        </div>

        <div className="shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
            <ChevronRight className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  )
})

MissionCard.displayName = 'MissionCard'
