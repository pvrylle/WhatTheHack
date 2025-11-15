import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MissionCard, MissionCardProps } from "@/components/molecules"
import { Icon, Text } from "@/components/atoms"
import { Target } from "lucide-react"

export interface MissionListProps {
  missions: MissionCardProps[]
}

export const MissionList = ({ missions }: MissionListProps) => {
  return (
    <Card className="border-0 bg-card/50">
      <CardHeader className="pb-6">
        <CardTitle className="font-orbitron text-xl text-foreground flex items-center gap-2">
          <Icon icon={Target} color="primary" />
          <Text variant="span" size="xl" weight="semibold" orbitron>
            Active Missions
          </Text>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {missions.map((mission) => (
          <MissionCard key={mission.id} {...mission} />
        ))}
      </CardContent>
    </Card>
  )
}
