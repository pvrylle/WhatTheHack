import { Container, Text } from '@/components/atoms'
import { ChallengeGrid } from '@/components/organisms'
import { ChallengeCardProps } from '@/components/molecules'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export interface ChallengeListTemplateProps {
  missionTitle: string
  missionDescription: string
  icon: LucideIcon
  completedChallenges: number
  totalChallenges: number
  challenges: ChallengeCardProps[]
  onChallengeStart?: (id: string | number) => void
}

export const ChallengeListTemplate = ({
  missionTitle,
  missionDescription,
  icon: IconComponent,
  completedChallenges,
  totalChallenges,
  challenges,
  onChallengeStart,
}: ChallengeListTemplateProps) => {
  const completionPercentage = Math.round((completedChallenges / totalChallenges) * 100)

  return (
    <Container>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" asChild className="border-primary/30 font-mono">
          <Link href="/learning-paths">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Missions
          </Link>
        </Button>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-lg bg-primary/15 border border-primary/25">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
            <div>
              <Text variant="h1" size="3xl" weight="bold" orbitron glow>
                {missionTitle}
              </Text>
              <Text color="muted" mono>
                {missionDescription}
              </Text>
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-8 border-0 bg-card/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Text variant="h3" size="lg" weight="medium" orbitron>
                Mission Progress
              </Text>
              <Text size="sm" color="muted" mono>
                {completedChallenges} of {totalChallenges} challenges completed
              </Text>
            </div>
            <div className="text-right">
              <Text size="3xl" weight="bold" color="primary" orbitron>
                {completionPercentage}%
              </Text>
            </div>
          </div>
          <Progress value={completionPercentage} className="h-3" />
        </CardContent>
      </Card>

      <div className="mb-6">
        <Text variant="h2" size="2xl" weight="bold" orbitron className="mb-2">
          Challenges
        </Text>
        <Text color="muted" mono>
          Complete challenges to earn XP and unlock new missions
        </Text>
      </div>

      <ChallengeGrid
        challenges={challenges.map((challenge) => ({
          ...challenge,
          onStart: () => onChallengeStart?.(challenge.id),
        }))}
      />
    </Container>
  )
}
