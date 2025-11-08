"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Trophy,
  Target,
  Clock,
  Star,
  CheckCircle,
  Lock,
  Play,
  Flame,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { missionPaths } from "@/data/challenges"

const difficultyBadge: Record<string, string> = {
  Beginner: "bg-success/15 text-success border-success/30",
  Intermediate: "bg-secondary/15 text-secondary border-secondary/30",
  Advanced: "bg-destructive/15 text-destructive border-destructive/30",
}

const categoryBadge: Record<string, string> = {
  "SQL Injection": "bg-primary/10 text-primary",
  XSS: "bg-accent/10 text-accent",
  CSRF: "bg-secondary/10 text-secondary",
  "File Upload": "bg-success/10 text-success",
  Authentication: "bg-destructive/10 text-destructive",
  "Path Traversal": "bg-primary/10 text-primary",
  "API Security": "bg-accent/10 text-accent",
  JWT: "bg-secondary/10 text-secondary",
  Reconnaissance: "bg-primary/10 text-primary",
  "Traffic Analysis": "bg-accent/10 text-accent",
  "Wireless Security": "bg-secondary/10 text-secondary",
  "Classical Ciphers": "bg-accent/10 text-accent",
  "Hash Functions": "bg-primary/10 text-primary",
  "Public Key Crypto": "bg-secondary/10 text-secondary",
  "Security Hardening": "bg-success/10 text-success",
  "NoSQL Security": "bg-destructive/10 text-destructive",
}

export default function MissionChallengesPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = use(params)
  const mission = missionPaths[category]

  if (!mission) {
    notFound()
  }

  const IconComponent = mission.icon
  const completionPercentage = Math.round(
    (mission.completedChallenges / mission.totalChallenges) * 100,
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-primary/30 font-mono"
        >
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
              <h1 className="text-3xl font-orbitron font-bold glow-text">
                {mission.title}
              </h1>
              <p className="text-muted-foreground font-mono">
                {mission.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-8 border-primary/20 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="font-orbitron text-primary flex items-center gap-2 text-lg">
            <Trophy className="w-5 h-5" /> Mission Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-mono">Overall Progress</span>
                <span className="text-primary">
                  {mission.completedChallenges}/{mission.totalChallenges} challenges
                </span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
              <div className="text-right text-xs text-muted-foreground">
                {completionPercentage}% complete
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <span className="flex items-center gap-1 font-mono text-success text-lg font-bold">
                <Flame className="w-4 h-4" />
                {mission.completedChallenges * 250} XP
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Total Earned
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <span className="flex items-center gap-1 font-mono text-secondary text-lg font-bold">
                <Star className="w-4 h-4" />
                {(mission.totalChallenges - mission.completedChallenges) * 250} XP
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Remaining
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mission.challenges.map((challenge, index) => {
          const difficultyClass =
            difficultyBadge[challenge.difficulty] || difficultyBadge.Beginner
          const categoryClass =
            categoryBadge[challenge.category] || "bg-muted/10 text-muted-foreground"

          return (
            <Card
              key={challenge.id}
              className={`border-border/50 bg-card/80 backdrop-blur transition-all duration-300 ${
                challenge.isUnlocked
                  ? "hover:border-primary/50"
                  : "opacity-60"
              } ${challenge.isCompleted ? "border-success/30" : ""}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-mono text-muted-foreground">#{index + 1}</span>
                      <Badge className={`${categoryClass} font-mono px-3 py-1`}>
                        {challenge.category}
                      </Badge>
                    </div>
                    <CardTitle className="font-orbitron text-lg leading-tight">
                      {challenge.title}
                    </CardTitle>
                    <CardDescription className="mt-2 font-mono text-sm">
                      {challenge.description}
                    </CardDescription>
                  </div>
                  <div className="ml-2">
                    {challenge.isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-success" />
                    ) : challenge.isUnlocked ? (
                      <Target className="w-6 h-6 text-primary" />
                    ) : (
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className={difficultyClass + " font-mono px-3 py-1"}>
                      {challenge.difficulty}
                    </Badge>
                    <div className="flex items-center gap-2 text-muted-foreground font-mono">
                      <Clock className="w-3 h-3" />
                      {challenge.timeEstimate}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-success" />
                    <span className="font-mono text-success font-semibold">
                      {challenge.xpReward} XP
                    </span>
                  </div>
                </div>

                {challenge.isUnlocked ? (
                  <Button
                    className={`w-full font-mono ${
                      challenge.isCompleted
                        ? "bg-success/20 text-success border border-success/30 hover:bg-muted hover:text-muted-foreground"
                        : "bg-primary hover:bg-muted hover:text-muted-foreground text-primary-foreground"
                    }`}
                    asChild
                  >
                    <Link href={`/challenges/${mission.id}/${challenge.id}`}>
                      {challenge.isCompleted ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" /> Review Challenge
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" /> Start Challenge
                        </>
                      )}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-muted text-muted-foreground cursor-not-allowed font-mono"
                    disabled
                  >
                    <Lock className="w-4 h-4 mr-2" /> Locked
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

