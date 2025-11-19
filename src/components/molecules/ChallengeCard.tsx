import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/atoms"
import { CheckCircle, Lock, Play } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ChallengeCardProps {
  id: string | number
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  xpReward: number
  timeEstimate: string
  isCompleted: boolean
  isUnlocked: boolean
  category: string
  onStart?: () => void
}

const difficultyColors = {
  Beginner: "bg-success/15 text-success border-success/30",
  Intermediate: "bg-secondary/15 text-secondary border-secondary/30",
  Advanced: "bg-destructive/15 text-destructive border-destructive/30",
}

export const ChallengeCard = ({
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
  return (
    <div
      className={cn(
        "border rounded-lg p-6 transition-all",
        isCompleted
          ? "border-success/30 bg-success/5"
          : isUnlocked
          ? "border-border hover:border-primary/30"
          : "border-border/50 bg-muted/20 opacity-60"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Text variant="h3" size="lg" weight="medium" orbitron>
              {title}
            </Text>
            {isCompleted && <CheckCircle className="w-5 h-5 text-success" />}
            {!isUnlocked && <Lock className="w-5 h-5 text-muted-foreground" />}
          </div>
          <Text size="sm" color="muted" className="mb-3">
            {description}
          </Text>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={difficultyColors[difficulty]}>
              {difficulty}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              {category}
            </Badge>
            <Badge variant="outline" className="text-primary">
              +{xpReward} XP
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              {timeEstimate}
            </Badge>
          </div>
        </div>
      </div>

      <Button
        className="w-full font-mono"
        disabled={!isUnlocked || isCompleted}
        onClick={onStart}
      >
        {isCompleted ? (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Completed
          </>
        ) : !isUnlocked ? (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Locked
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2" />
            Start Challenge
          </>
        )}
      </Button>
    </div>
  )
}
