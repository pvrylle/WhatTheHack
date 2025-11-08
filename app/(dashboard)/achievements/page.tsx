"use client"

import {
  Trophy,
  Star,
  Zap,
  Crown,
  Target,
  Flame,
  Award,
  Medal,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function AchievementsPage() {
  const achievements = [
    {
      id: 1,
      title: "First Blood",
      description: "Complete your first hacking challenge",
      icon: "🎯",
      category: "Milestone",
      earned: true,
      rarity: "Common",
      points: 50,
      earnedDate: "2024-01-15",
    },
    {
      id: 2,
      title: "SQL Injection Master",
      description: "Successfully exploit 10 SQL injection vulnerabilities",
      icon: "💉",
      category: "Web Security",
      earned: true,
      rarity: "Rare",
      points: 250,
      earnedDate: "2024-02-10",
    },
    {
      id: 3,
      title: "Ghost in the Machine",
      description: "Complete a challenge without triggering any alarms",
      icon: "👻",
      category: "Stealth",
      earned: false,
      rarity: "Epic",
      points: 500,
      progress: 67,
    },
    {
      id: 4,
      title: "Code Breaker",
      description: "Successfully decrypt 5 different encryption algorithms",
      icon: "🔓",
      category: "Cryptography",
      earned: true,
      rarity: "Rare",
      points: 300,
      earnedDate: "2024-01-28",
    },
    {
      id: 5,
      title: "Network Ninja",
      description: "Complete all network security challenges",
      icon: "🥷",
      category: "Network",
      earned: false,
      rarity: "Legendary",
      points: 1000,
      progress: 40,
    },
    {
      id: 6,
      title: "Bug Hunter",
      description: "Find and report 25 unique vulnerabilities",
      icon: "🐛",
      category: "Discovery",
      earned: false,
      rarity: "Epic",
      points: 750,
      progress: 84,
    },
  ]

  const leaderboard = [
    { rank: 1, username: "CyberPhantom", points: 15420, streak: 45, change: "+2" },
    { rank: 2, username: "H4ck3rM4st3r", points: 14830, streak: 32, change: "-1" },
    { rank: 3, username: "DigitalSamurai", points: 13945, streak: 28, change: "+1" },
    { rank: 4, username: "QuantumHacker", points: 12760, streak: 22, change: "0" },
    { rank: 5, username: "Agent_X", points: 11890, streak: 18, change: "+3" },
    { rank: 6, username: "YOU", points: 8420, streak: 15, change: "+1" },
  ]

  const getRarityStyles = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return {
          color: "text-muted-foreground",
          bg: "bg-muted/10 border-muted/20",
          badge: "bg-muted/20 text-muted-foreground",
        }
      case "Rare":
        return {
          color: "text-blue-500",
          bg: "bg-blue-500/5 border-blue-500/20",
          badge: "bg-blue-500/20 text-blue-600",
        }
      case "Epic":
        return {
          color: "text-purple-500",
          bg: "bg-purple-500/5 border-purple-500/20",
          badge: "bg-purple-500/20 text-purple-600",
        }
      case "Legendary":
        return {
          color: "text-amber-500",
          bg: "bg-amber-500/5 border-amber-500/20",
          badge: "bg-amber-500/20 text-amber-600",
        }
      default:
        return {
          color: "text-muted-foreground",
          bg: "bg-muted/10 border-muted/20",
          badge: "bg-muted/20 text-muted-foreground",
        }
    }
  }

  const earnedCount = achievements.filter((a) => a.earned).length
  const totalPoints = achievements
    .filter((a) => a.earned)
    .reduce((sum, a) => sum + a.points, 0)
  const currentStreak = 15
  const globalRank = 6

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-8 border border-primary/10">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Trophy className="w-6 h-6" />
            </div>
            <Badge variant="outline" className="text-primary border-primary/20">
              Hall of Fame
            </Badge>
          </div>
          <h1 className="text-4xl font-orbitron font-bold glow-text mb-2">
            Your Achievements
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl font-mono">
            Celebrate your cybersecurity milestones and track your progress on
            the global leaderboard
          </p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 text-center hover:shadow-md transition-shadow border-border/50 bg-card/80 backdrop-blur">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
            <Star className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold font-orbitron">
            {totalPoints.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground font-mono">
            Total Points
          </div>
        </Card>

        <Card className="p-6 text-center hover:shadow-md transition-shadow border-border/50 bg-card/80 backdrop-blur">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary mb-3">
            <Award className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold font-orbitron">
            {earnedCount}/{achievements.length}
          </div>
          <div className="text-sm text-muted-foreground font-mono">
            Achievements
          </div>
        </Card>

        <Card className="p-6 text-center hover:shadow-md transition-shadow border-border/50 bg-card/80 backdrop-blur">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-3">
            <Flame className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold font-orbitron">{currentStreak}</div>
          <div className="text-sm text-muted-foreground font-mono">Day Streak</div>
        </Card>

        <Card className="p-6 text-center hover:shadow-md transition-shadow border-border/50 bg-card/80 backdrop-blur">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted/10 text-foreground mb-3">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold font-orbitron">#{globalRank}</div>
          <div className="text-sm text-muted-foreground font-mono">
            Global Rank
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recently Earned */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <h2 className="text-xl font-semibold font-orbitron">
                  Recently Earned
                </h2>
              </div>
              <Badge variant="secondary" className="font-mono">
                {earnedCount} earned
              </Badge>
            </div>

            <div className="grid gap-4">
              {achievements
                .filter((a) => a.earned)
                .sort(
                  (a, b) =>
                    new Date(b.earnedDate || "").getTime() -
                    new Date(a.earnedDate || "").getTime(),
                )
                .map((achievement) => {
                  const styles = getRarityStyles(achievement.rarity)
                  return (
                    <Card
                      key={achievement.id}
                      className={`${styles.bg} border transition-all hover:scale-[1.02] bg-card/80 backdrop-blur`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-lg font-orbitron">
                                {achievement.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <Badge className={styles.badge}>
                                  {achievement.rarity}
                                </Badge>
                                <Crown className="w-4 h-4 text-amber-500" />
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-3 font-mono text-sm">
                              {achievement.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground font-mono">
                                {achievement.category}
                              </span>
                              <div className="flex items-center gap-1 text-primary font-medium font-mono">
                                <Star className="w-4 h-4" />
                                {achievement.points} pts
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </section>

          {/* In Progress */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-semibold font-orbitron">
                  In Progress
                </h2>
              </div>
              <Badge variant="outline" className="font-mono">
                {achievements.filter((a) => !a.earned).length} remaining
              </Badge>
            </div>

            <div className="grid gap-4">
              {achievements
                .filter((a) => !a.earned)
                .sort((a, b) => (b.progress || 0) - (a.progress || 0))
                .map((achievement) => {
                  const styles = getRarityStyles(achievement.rarity)
                  return (
                    <Card
                      key={achievement.id}
                      className="border-dashed hover:border-solid transition-all bg-card/80 backdrop-blur"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl opacity-50">
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-lg text-muted-foreground font-orbitron">
                                {achievement.title}
                              </h3>
                              <Badge variant="outline" className={styles.color}>
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-4 font-mono text-sm">
                              {achievement.description}
                            </p>

                            {achievement.progress && (
                              <div className="space-y-2 mb-3">
                                <div className="flex justify-between text-sm font-mono">
                                  <span>Progress</span>
                                  <span className="text-primary font-medium">
                                    {achievement.progress}%
                                  </span>
                                </div>
                                <Progress
                                  value={achievement.progress}
                                  className="h-2"
                                />
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground font-mono">
                                {achievement.category}
                              </span>
                              <div className="flex items-center gap-1 text-muted-foreground font-mono">
                                <Star className="w-4 h-4" />
                                {achievement.points} pts
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <Card className="border-border/50 bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-orbitron">
                <Medal className="w-5 h-5" />
                Global Leaderboard
              </CardTitle>
              <CardDescription className="font-mono">
                Top performers this week
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {leaderboard.map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-muted/50 ${
                    player.username === "YOU"
                      ? "bg-primary/5 border border-primary/20 shadow-sm"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold">
                    {player.rank <= 3 ? (
                      <Trophy
                        className={`w-4 h-4 ${
                          player.rank === 1
                            ? "text-yellow-500"
                            : player.rank === 2
                              ? "text-gray-400"
                              : "text-amber-600"
                        }`}
                      />
                    ) : (
                      player.rank
                    )}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-medium font-mono ${player.username === "YOU" ? "text-primary" : ""}`}
                    >
                      {player.username}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                      <span>{player.points.toLocaleString()}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span>{player.streak}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded font-mono ${
                      player.change.startsWith("+")
                        ? "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400"
                        : player.change.startsWith("-")
                          ? "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400"
                          : "text-muted-foreground bg-muted/50"
                    }`}
                  >
                    {player.change !== "0" ? player.change : "—"}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievement Categories */}
          <Card className="border-border/50 bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-orbitron">
                <Target className="w-5 h-5" />
                Categories
              </CardTitle>
              <CardDescription className="font-mono">
                Progress by category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Web Security", earned: 1, total: 2, color: "bg-blue-500" },
                {
                  name: "Cryptography",
                  earned: 1,
                  total: 1,
                  color: "bg-green-500",
                },
                { name: "Network", earned: 0, total: 1, color: "bg-purple-500" },
                { name: "Stealth", earned: 0, total: 1, color: "bg-orange-500" },
                { name: "Discovery", earned: 0, total: 1, color: "bg-red-500" },
              ].map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium font-mono">
                      {category.name}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {category.earned}/{category.total}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${category.color} transition-all duration-500`}
                      style={{
                        width: `${(category.earned / category.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border/50 bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-orbitron">
                <Zap className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg border border-dashed border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-primary" />
                  <div>
                    <div className="font-medium font-mono group-hover:text-primary transition-colors">
                      Start New Challenge
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      Continue your streak
                    </div>
                  </div>
                </div>
              </button>

              <button className="w-full p-3 text-left rounded-lg border border-dashed border-secondary/30 hover:border-secondary/50 hover:bg-secondary/5 transition-all group">
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-secondary" />
                  <div>
                    <div className="font-medium font-mono group-hover:text-secondary transition-colors">
                      View Friends
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      Compare progress
                    </div>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

