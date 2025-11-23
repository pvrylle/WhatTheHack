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
      <CardHeader className="pb-4">
        <Link
          href={ROUTES.DASHBOARD.SETTINGS}
          className="flex items-center justify-between group"
        >
          <CardTitle className="font-orbitron text-lg text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
            <Icon icon={Shield} color="primary" />
            <Text variant="span" size="lg" weight="semibold" orbitron>
              Agent Profile
            </Text>
          </CardTitle>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon icon={Shield} size="xl" color="primary" />
          </div>
          <Text variant="h3" size="xl" weight="medium" orbitron>
            {rank}
          </Text>
          <p className="text-muted-foreground text-sm font-mono flex items-center justify-center gap-1 mt-1">
            <Star className="w-3 h-3" />
            Level {level}
          </p>
        </div>

        {/* XP Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <Text size="sm" color="muted">
              Experience
            </Text>
            <Text size="sm" color="primary" mono>
              {xp.toLocaleString()}/{xpToNext.toLocaleString()}
            </Text>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <Text size="xs" color="muted" className="text-center">
            {(xpToNext - xp).toLocaleString()} XP until next level
          </Text>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="w-4 h-4 text-success" />
            </div>
            <Text size="lg" weight="semibold" color="success">
              {hacksCompleted}
            </Text>
            <Text size="xs" color="muted" mono>
              Completed
            </Text>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Zap className="w-4 h-4 text-accent" />
            </div>
            <Text size="lg" weight="semibold" color="accent">
              {streakDays}
            </Text>
            <Text size="xs" color="muted" mono>
              Day Streak
            </Text>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
