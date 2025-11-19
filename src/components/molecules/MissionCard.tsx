import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/atoms"
import { Clock, Award, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MissionCardProps {
  id: number | string
  title: string
  progress: number
  reward: string
  difficulty: string
  timeLeft: string
  onContinue?: () => void
}

const difficultyColors = {
  easy: "text-success border-success/20",
  medium: "text-secondary border-secondary/20",
  hard: "text-destructive border-destructive/20",
}

export const MissionCard = ({
  title,
  progress,
  reward,
  difficulty,
  timeLeft,
  onContinue,
}: MissionCardProps) => {
  const difficultyColor = difficultyColors[difficulty.toLowerCase() as keyof typeof difficultyColors] || "text-muted-foreground border-muted/20"

  return (
    <div className="border border-border rounded-lg p-6 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Text variant="h4" size="lg" weight="medium" orbitron className="mb-3">
            {title}
          </Text>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className={cn("font-mono", difficultyColor)}>
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
        <Button
          size="sm"
          className="w-full font-mono"
          variant="default"
          onClick={onContinue}
        >
          Continue Mission
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
