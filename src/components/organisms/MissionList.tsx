import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MissionCard, MissionCardProps } from '@/components/molecules'
import { Icon, Text } from '@/components/atoms'
import { Target, ChevronRight } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

export interface MissionListProps {
  missions: MissionCardProps[]
}

export const MissionList = ({ missions }: MissionListProps) => {
  return (
    <Card className="border-0 bg-card/50">
      <CardHeader className="pb-3 pt-4 px-4">
        <Link
          href={ROUTES.DASHBOARD.LEARNING_PATHS}
          className="flex items-center justify-between group"
        >
          <CardTitle className="font-orbitron text-base text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
            <Icon icon={Target} color="primary" size="sm" />
            <Text variant="span" size="base" weight="semibold" orbitron>
              Active Missions
            </Text>
          </CardTitle>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-2 px-4 pb-4">
        {missions.map((mission) => (
          <MissionCard key={mission.id} {...mission} />
        ))}
      </CardContent>
    </Card>
  )
}
