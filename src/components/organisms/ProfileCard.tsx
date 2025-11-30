import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Icon, Text } from '@/components/atoms'
import { Shield, Star, Trophy, Zap, ChevronRight } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

export interface ProfileCardProps {
  username?: string
  rank: string
  level: number
  xp: number
  xpToNext: number
  hacksCompleted: number
  streakDays: number
  totalPoints: number
}

export const ProfileCard = ({
  rank,
  level,
  xp,
  xpToNext,
  hacksCompleted,
  streakDays,
  totalPoints,
}: ProfileCardProps) => {
  const progressPercentage = (xp / xpToNext) * 100

  return (
    <Card className="border-0 bg-card/50">
      <CardHeader className="pb-3 pt-4 px-4">
        <Link
          href={ROUTES.DASHBOARD.SETTINGS}
          className="flex items-center justify-between group"
        >
          <CardTitle className="font-orbitron text-base text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
            <Icon icon={Shield} color="primary" size="sm" />
            <Text variant="span" size="base" weight="semibold" orbitron>
              Agent Profile
            </Text>
          </CardTitle>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4">
        {/* Compact Avatar Row */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center shrink-0">
            <Icon icon={Shield} size="lg" color="primary" />
          </div>
          <div className="flex-1 min-w-0">
            <Text variant="h3" size="base" weight="semibold" orbitron className="truncate">
              {rank}
            </Text>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="w-3 h-3" />
              <Text size="xs" mono>Level {level}</Text>
            </div>
          </div>
        </div>

        {/* XP Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <Text size="xs" color="muted">XP Progress</Text>
            <Text size="xs" color="primary" mono>
              {xp.toLocaleString()}/{xpToNext.toLocaleString()}
            </Text>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-success/10 border border-success/20">
            <Trophy className="w-4 h-4 text-success shrink-0" />
            <div>
              <Text size="sm" weight="semibold" color="success">{hacksCompleted}</Text>
              <Text size="xs" color="muted" mono>Done</Text>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-accent/10 border border-accent/20">
            <Zap className="w-4 h-4 text-accent shrink-0" />
            <div>
              <Text size="sm" weight="semibold" color="accent">{streakDays}</Text>
              <Text size="xs" color="muted" mono>Streak</Text>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
