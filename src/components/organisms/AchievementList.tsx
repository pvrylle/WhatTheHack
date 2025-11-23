import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AchievementCard, AchievementCardProps } from '@/components/molecules'
import { Icon, Text } from '@/components/atoms'
import { Trophy } from 'lucide-react'

export interface AchievementListProps {
  achievements: AchievementCardProps[]
}

export const AchievementList = ({ achievements }: AchievementListProps) => {
  return (
    <Card className="border-0 bg-card/50">
      <CardHeader className="pb-6">
        <CardTitle className="font-orbitron text-xl text-foreground flex items-center gap-2">
          <Icon icon={Trophy} color="primary" />
          <Text variant="span" size="xl" weight="semibold" orbitron>
            Recent Achievements
          </Text>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} {...achievement} />
        ))}
      </CardContent>
    </Card>
  )
}
