'use client'

import Link from 'next/link'
import { ChevronRight, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { missionPaths } from '@/data/challenges'

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-success/20 text-success',
  Intermediate: 'bg-secondary/20 text-secondary',
  Advanced: 'bg-destructive/20 text-destructive',
}

const colorStyles = {
  primary: {
    wrapper: 'bg-primary/20 border border-primary/30',
    icon: 'text-primary',
  },
  secondary: {
    wrapper: 'bg-secondary/20 border border-secondary/30',
    icon: 'text-secondary',
  },
  accent: {
    wrapper: 'bg-accent/20 border border-accent/30',
    icon: 'text-accent',
  },
  success: {
    wrapper: 'bg-success/20 border border-success/30',
    icon: 'text-success',
  },
} as const

export default function LearningPathsPage() {
  const learningPaths = Object.values(missionPaths)

  if (learningPaths.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-4xl font-orbitron font-bold glow-text mb-2">Hacking Missions</h1>
          <p className="text-muted-foreground font-mono">No missions available at the moment</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-orbitron font-bold glow-text mb-2">Hacking Missions</h1>
        <p className="text-muted-foreground font-mono">
          Choose your path to become the ultimate cybersecurity expert
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {learningPaths.map((path) => {
          const IconComponent = path.icon
          const progress = Math.round((path.completedChallenges / path.totalChallenges) * 100)
          const palette = colorStyles[path.color]

          return (
            <Card
              key={path.id}
              className="border-2 border-border/50 bg-card backdrop-blur hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${palette.wrapper}`}>
                      <IconComponent className={`w-6 h-6 ${palette.icon}`} />
                    </div>
                    <div>
                      <CardTitle className="font-orbitron text-lg group-hover:text-muted-foreground transition-colors">
                        {path.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={
                            difficultyStyles[path.challenges[0]?.difficulty || 'Beginner'] ||
                            difficultyStyles.Beginner
                          }
                        >
                          {path.challenges[0]?.difficulty || 'Beginner'}
                        </Badge>
                        <span className="text-sm text-muted-foreground font-mono">
                          {path.completedChallenges}/{path.totalChallenges} complete
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-3 font-mono">{path.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Challenges Preview */}
                {path.challenges && path.challenges.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
                      Challenges ({path.challenges.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {path.challenges.slice(0, 4).map((challenge) => (
                        <Badge
                          key={challenge.id}
                          variant="outline"
                          className={`text-xs font-mono ${
                            challenge.isCompleted
                              ? 'bg-success/10 text-success border-success/30'
                              : challenge.isUnlocked
                                ? 'bg-primary/10 text-primary border-primary/30'
                                : 'bg-muted/50 text-muted-foreground border-border/50'
                          }`}
                        >
                          {challenge.title}
                        </Badge>
                      ))}
                      {path.challenges.length > 4 && (
                        <Badge
                          variant="outline"
                          className="text-xs font-mono bg-muted/50 text-muted-foreground"
                        >
                          +{path.challenges.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-mono">Progress</span>
                    <span className="text-primary">
                      {path.completedChallenges}/{path.totalChallenges} challenges
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="text-right text-xs text-muted-foreground">
                    {progress}% complete
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-success" />
                      <span className="font-mono text-success">
                        {path.completedChallenges * 150} XP earned
                      </span>
                    </div>
                    <div className="text-muted-foreground font-mono text-xs">
                      {(path.totalChallenges - path.completedChallenges) * 150} XP remaining
                    </div>
                  </div>

                  <Button
                    variant={progress > 0 ? 'default' : 'outline'}
                    className="group-hover:bg-muted group-hover:text-muted-foreground transition-colors"
                    asChild
                  >
                    <Link href={`/challenges/${path.id}`}>
                      {progress > 0 ? 'Continue' : 'Start Mission'}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="mt-8 border-accent/20 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="font-orbitron text-accent">Custom Challenges</CardTitle>
          <CardDescription>
            Create your own hacking scenarios or join community-created challenges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-auto p-4 bg-primary/10 hover:bg-muted hover:text-muted-foreground border border-primary/30 font-mono text-foreground">
              <div className="text-left">
                <div className="font-semibold text-foreground">Challenge Creator</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Build custom hacking scenarios
                </div>
              </div>
            </Button>
            <Button className="h-auto p-4 bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 font-mono text-foreground">
              <div className="text-left">
                <div className="font-semibold text-foreground">Community Hub</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Explore user-generated content
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
