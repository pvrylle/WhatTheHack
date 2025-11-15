import { Badge } from "@/components/ui/badge"
import { Text } from "@/components/atoms"
import { Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

export interface AchievementCardProps {
  id: number | string
  title: string
  description: string
  earned: string
  rarity: string
}

const rarityColors = {
  common: "text-muted-foreground border-muted/20",
  uncommon: "text-success border-success/20",
  rare: "text-primary border-primary/20",
  epic: "text-secondary border-secondary/20",
  legendary: "text-accent border-accent/20",
}

export const AchievementCard = ({
  title,
  description,
  earned,
  rarity,
}: AchievementCardProps) => {
  const rarityColor = rarityColors[rarity.toLowerCase() as keyof typeof rarityColors] || rarityColors.common

  return (
    <div className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/30 transition-colors">
      <div className={cn("p-3 rounded-lg bg-primary/10 border border-primary/20 h-fit")}>
        <Trophy className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <Text variant="h4" size="base" weight="medium" orbitron>
            {title}
          </Text>
          <Badge variant="outline" className={cn("font-mono text-xs", rarityColor)}>
            {rarity}
          </Badge>
        </div>
        <Text size="sm" color="muted" className="mb-2">
          {description}
        </Text>
        <Text size="xs" color="muted" mono>
          {earned}
        </Text>
      </div>
    </div>
  )
}
