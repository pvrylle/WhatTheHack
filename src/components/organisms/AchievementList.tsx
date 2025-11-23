import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AchievementCard, AchievementCardProps } from '@/components/molecules'
import { Icon, Text } from '@/components/atoms'
import { Trophy, ChevronRight } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

export interface AchievementListProps {
  achievements: AchievementCardProps[]
}

export const AchievementList = ({ achievements }: AchievementListProps) => {
  return (
    <Card className="border-0 bg-card/50">
      <CardHeader className="pb-6">
        <Link
          href={ROUTES.DASHBOARD.ACHIEVEMENTS}
          className="flex items-center justify-between group"
        >
          <CardTitle className="font-orbitron text-xl text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
            <Icon icon={Trophy} color="primary" />
            <Text variant="span" size="xl" weight="semibold" orbitron>
              Recent Achievements
            </Text>
          </CardTitle>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} {...achievement} />
        ))}
      </CardContent>
    </Card>
  )
}
