import { memo, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Text } from '@/components/atoms'
import { CheckCircle, Lock, Play, Zap, Clock, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChallengeCardProps {
  id: string | number
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  xpReward: number
  timeEstimate: string
  isCompleted: boolean
  isUnlocked: boolean
  category: string
  onStart?: () => void
}

const difficultyConfig = {
  Beginner: {
    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    glow: 'shadow-emerald-500/20',
    icon: '🟢',
  },
  Intermediate: {
    color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    glow: 'shadow-amber-500/20',
    icon: '🟡',
  },
  Advanced: {
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
    glow: 'shadow-red-500/20',
    icon: '🔴',
  },
}

export const ChallengeCard = memo(({
  title,
  description,
  difficulty,
  xpReward,
  timeEstimate,
  isCompleted,
  isUnlocked,
  category,
  onStart,
}: ChallengeCardProps) => {
  const config = useMemo(() => difficultyConfig[difficulty], [difficulty])
  
  const cardClassName = useMemo(
    () =>
      cn(
        'group relative overflow-hidden border-2 transition-all duration-300',
        'hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1',
        isCompleted
          ? 'border-emerald-500/50 bg-emerald-500/5'
          : isUnlocked
            ? 'border-border/50 bg-card/50 hover:border-primary/50'
            : 'border-border/30 bg-muted/30 opacity-70 cursor-not-allowed'
      ),
    [isCompleted, isUnlocked]
  )
  
  const statusAriaLabel = useMemo(() => {
    if (isCompleted) return 'Challenge completed'
    if (!isUnlocked) return 'Challenge locked'
    return 'Challenge available'
  }, [isCompleted, isUnlocked])

  return (
    <Card
      className={cardClassName}
      role="article"
      aria-label={`${title} - ${difficulty} challenge`}
      aria-describedby={`challenge-${title}-description`}
    >
      {/* Status Indicator */}
      <div
        className={cn(
          'absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity',
          isCompleted
            ? 'bg-emerald-500'
            : isUnlocked
              ? 'bg-primary group-hover:opacity-30'
              : 'bg-muted-foreground'
        )}
      />

      <CardHeader className="relative">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {isCompleted && (
                <div className="flex-shrink-0 p-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
              )}
              {!isUnlocked && (
                <div className="flex-shrink-0 p-1.5 rounded-full bg-muted border border-border">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
              <Text
                variant="h3"
                size="lg"
                weight="semibold"
                orbitron
                className="truncate group-hover:text-primary transition-colors"
                id={`challenge-${title}-title`}
              >
                {title}
              </Text>
            </div>
            <Text
              size="sm"
              color="muted"
              className="line-clamp-2 mb-4"
              id={`challenge-${title}-description`}
            >
              {description}
            </Text>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="flex items-center gap-2 mb-3">
          <Badge
            variant="outline"
            className={cn('font-mono text-xs border-2', config.color, config.glow)}
          >
            {difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs font-mono text-muted-foreground">
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-3">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 border border-primary/10">
            <Zap className="w-4 h-4 text-primary" />
            <div>
              <Text size="xs" color="muted" className="font-mono">
                XP Reward
              </Text>
              <Text size="sm" weight="bold" className="text-primary font-mono">
                +{xpReward}
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/5 border border-secondary/10">
            <Clock className="w-4 h-4 text-secondary" />
            <div>
              <Text size="xs" color="muted" className="font-mono">
                Est. Time
              </Text>
              <Text size="sm" weight="bold" className="text-secondary font-mono">
                {timeEstimate}
              </Text>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="relative pt-0">
        <Button
          className={cn(
            'w-full font-mono transition-all',
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
              : !isUnlocked
                ? 'opacity-50 cursor-not-allowed'
                : 'group-hover:shadow-lg group-hover:shadow-primary/20'
          )}
          disabled={!isUnlocked || isCompleted}
          onClick={onStart}
          aria-label={
            isCompleted
              ? `${title} - Challenge completed`
              : !isUnlocked
                ? `${title} - Challenge locked`
                : `Start ${title} challenge`
          }
        >
          {isCompleted ? (
            <>
              <Trophy className="w-4 h-4 mr-2" />
              Challenge Completed
            </>
          ) : !isUnlocked ? (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Locked
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
              Start Challenge
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
})

ChallengeCard.displayName = 'ChallengeCard'
