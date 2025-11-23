'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Zap, Search, Filter, X, Trophy, Target, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Container, Text } from '@/components/atoms'
import { missionPaths } from '@/data/challenges'
import { cn } from '@/lib/utils'

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-success/20 text-success border-success/30',
  Intermediate: 'bg-secondary/20 text-secondary border-secondary/30',
  Advanced: 'bg-destructive/20 text-destructive border-destructive/30',
}

const colorStyles = {
  primary: {
    wrapper: 'bg-primary/15 border-2 border-primary/25 shadow-lg shadow-primary/10',
    icon: 'text-primary',
    gradient: 'from-primary/20 via-primary/10 to-transparent',
  },
  secondary: {
    wrapper: 'bg-secondary/15 border-2 border-secondary/25 shadow-lg shadow-secondary/10',
    icon: 'text-secondary',
    gradient: 'from-secondary/20 via-secondary/10 to-transparent',
  },
  accent: {
    wrapper: 'bg-accent/15 border-2 border-accent/25 shadow-lg shadow-accent/10',
    icon: 'text-accent',
    gradient: 'from-accent/20 via-accent/10 to-transparent',
  },
  success: {
    wrapper: 'bg-success/15 border-2 border-success/25 shadow-lg shadow-success/10',
    icon: 'text-success',
    gradient: 'from-success/20 via-success/10 to-transparent',
  },
} as const

export default function LearningPathsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [progressFilter, setProgressFilter] = useState<string>('all')

  const learningPaths = Object.values(missionPaths)

  const filteredPaths = useMemo(() => {
    return learningPaths.filter((path) => {
      const matchesSearch =
        searchQuery === '' ||
        path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.description.toLowerCase().includes(searchQuery.toLowerCase())

      const pathDifficulty = path.challenges[0]?.difficulty || 'Beginner'
      const matchesDifficulty =
        difficultyFilter === 'all' || pathDifficulty === difficultyFilter

      const progress = Math.round((path.completedChallenges / path.totalChallenges) * 100)
      const matchesProgress =
        progressFilter === 'all' ||
        (progressFilter === 'completed' && progress === 100) ||
        (progressFilter === 'in-progress' && progress > 0 && progress < 100) ||
        (progressFilter === 'not-started' && progress === 0)

      return matchesSearch && matchesDifficulty && matchesProgress
    })
  }, [learningPaths, searchQuery, difficultyFilter, progressFilter])

  const hasActiveFilters =
    searchQuery !== '' || difficultyFilter !== 'all' || progressFilter !== 'all'

  const clearFilters = () => {
    setSearchQuery('')
    setDifficultyFilter('all')
    setProgressFilter('all')
  }

  const totalChallenges = learningPaths.reduce((sum, path) => sum + path.totalChallenges, 0)
  const completedChallenges = learningPaths.reduce(
    (sum, path) => sum + path.completedChallenges,
    0
  )
  const totalProgress = Math.round((completedChallenges / totalChallenges) * 100)
  const totalXP = learningPaths.reduce(
    (sum, path) => sum + path.completedChallenges * 150,
    0
  )

  if (learningPaths.length === 0) {
    return (
      <Container>
        <div className="text-center py-16">
          <Text variant="h1" size="4xl" weight="bold" orbitron glow className="mb-4">
            Hacking Missions
          </Text>
          <Text color="muted" mono>
            No missions available at the moment
          </Text>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      {/* Header Section */}
      <div className="mb-8">
        <Text variant="h1" size="4xl" weight="bold" orbitron glow className="mb-3">
          Hacking Missions
        </Text>
        <Text color="muted" mono size="lg">
          Choose your path to become the ultimate cybersecurity expert
        </Text>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Text size="sm" color="muted" mono className="mb-1">
                  Total Progress
                </Text>
                <Text variant="h3" size="2xl" weight="bold" color="primary" orbitron>
                  {totalProgress}%
                </Text>
              </div>
              <div className="p-3 rounded-lg bg-primary/20 border border-primary/30">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <Progress value={totalProgress} className="h-2 mt-4" />
          </CardContent>
        </Card>

        <Card className="border-2 border-success/20 bg-gradient-to-br from-success/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Text size="sm" color="muted" mono className="mb-1">
                  Challenges
                </Text>
                <Text variant="h3" size="2xl" weight="bold" color="success" orbitron>
                  {completedChallenges}/{totalChallenges}
                </Text>
              </div>
              <div className="p-3 rounded-lg bg-success/20 border border-success/30">
                <Target className="w-6 h-6 text-success" />
              </div>
            </div>
            <Text size="xs" color="muted" mono className="mt-4">
              {totalChallenges - completedChallenges} remaining
            </Text>
          </CardContent>
        </Card>

        <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Text size="sm" color="muted" mono className="mb-1">
                  XP Earned
                </Text>
                <Text variant="h3" size="2xl" weight="bold" color="accent" orbitron>
                  {totalXP.toLocaleString()}
                </Text>
              </div>
              <div className="p-3 rounded-lg bg-accent/20 border border-accent/30">
                <Zap className="w-6 h-6 text-accent" />
              </div>
            </div>
            <Text size="xs" color="muted" mono className="mt-4">
              Keep hacking!
            </Text>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Text size="sm" color="muted" mono className="mb-1">
                  Missions
                </Text>
                <Text variant="h3" size="2xl" weight="bold" color="secondary" orbitron>
                  {learningPaths.length}
                </Text>
              </div>
              <div className="p-3 rounded-lg bg-secondary/20 border border-secondary/30">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <Text size="xs" color="muted" mono className="mt-4">
              Available paths
            </Text>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Text variant="h2" size="2xl" weight="bold" orbitron className="mb-1">
              Mission Paths
            </Text>
            <Text color="muted" mono>
              {filteredPaths.length} of {learningPaths.length} missions
            </Text>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="font-mono text-xs"
            >
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search missions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-mono"
            />
          </div>

          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full sm:w-[180px] font-mono">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <Select value={progressFilter} onValueChange={setProgressFilter}>
            <SelectTrigger className="w-full sm:w-[180px] font-mono">
              <SelectValue placeholder="Progress" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Progress</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mission Paths Grid */}
      {filteredPaths.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredPaths.map((path) => {
          const IconComponent = path.icon
          const progress = Math.round((path.completedChallenges / path.totalChallenges) * 100)
          const palette = colorStyles[path.color]
            const pathDifficulty = path.challenges[0]?.difficulty || 'Beginner'
            const isCompleted = progress === 100

          return (
            <Card
              key={path.id}
                className={cn(
                  'border-2 bg-card backdrop-blur transition-all duration-300 group overflow-hidden relative',
                  'hover:shadow-2xl hover:scale-[1.02]',
                  isCompleted
                    ? 'border-success/50 hover:border-success'
                    : progress > 0
                      ? 'border-primary/50 hover:border-primary'
                      : 'border-border/50 hover:border-primary/50'
                )}
              >
                {/* Gradient Background */}
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                    palette.gradient
                  )}
                />

                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={cn('p-4 rounded-xl transition-transform group-hover:scale-110', palette.wrapper)}>
                        <IconComponent className={cn('w-7 h-7', palette.icon)} />
                    </div>
                      <div className="flex-1">
                        <CardTitle className="font-orbitron text-xl mb-2 group-hover:text-primary transition-colors">
                        {path.title}
                      </CardTitle>
                        <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                            variant="outline"
                            className={cn('font-mono text-xs', difficultyStyles[pathDifficulty])}
                        >
                            {pathDifficulty}
                          </Badge>
                          {isCompleted && (
                            <Badge variant="outline" className="font-mono text-xs bg-success/10 text-success border-success/30">
                              <Trophy className="w-3 h-3 mr-1" />
                              Completed
                        </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="font-mono text-sm leading-relaxed">
                    {path.description}
                  </CardDescription>
              </CardHeader>

                <CardContent className="space-y-5 relative z-10">
                {/* Challenges Preview */}
                {path.challenges && path.challenges.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Text size="xs" weight="semibold" color="muted" mono className="uppercase tracking-wider">
                      Challenges ({path.challenges.length})
                        </Text>
                        <Text size="xs" color="muted" mono>
                          {path.completedChallenges}/{path.totalChallenges} complete
                        </Text>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {path.challenges.slice(0, 4).map((challenge) => (
                        <Badge
                          key={challenge.id}
                          variant="outline"
                            className={cn(
                              'text-xs font-mono transition-colors',
                            challenge.isCompleted
                              ? 'bg-success/10 text-success border-success/30'
                              : challenge.isUnlocked
                                ? 'bg-primary/10 text-primary border-primary/30'
                                : 'bg-muted/50 text-muted-foreground border-border/50'
                            )}
                        >
                          {challenge.title}
                        </Badge>
                      ))}
                      {path.challenges.length > 4 && (
                        <Badge
                          variant="outline"
                            className="text-xs font-mono bg-muted/50 text-muted-foreground border-border/50"
                        >
                          +{path.challenges.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                  {/* Progress Section */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Text size="sm" color="muted" mono>
                        Progress
                      </Text>
                      <Text size="sm" weight="semibold" color="primary" orbitron>
                        {progress}%
                      </Text>
                  </div>
                    <Progress
                      value={progress}
                      className={cn(
                        'h-3 transition-all',
                        isCompleted && 'bg-success/20'
                      )}
                    />
                    <div className="flex justify-between text-xs">
                      <Text size="xs" color="muted" mono>
                        {path.completedChallenges} of {path.totalChallenges} challenges
                      </Text>
                      {!isCompleted && (
                        <Text size="xs" color="muted" mono>
                          {path.totalChallenges - path.completedChallenges} remaining
                        </Text>
                      )}
                  </div>
                </div>

                  {/* XP and Action Section */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-success" />
                        <Text size="sm" weight="medium" color="success" mono>
                        {path.completedChallenges * 150} XP earned
                        </Text>
                    </div>
                      {!isCompleted && (
                        <Text size="xs" color="muted" mono>
                      {(path.totalChallenges - path.completedChallenges) * 150} XP remaining
                        </Text>
                      )}
                  </div>

                  <Button
                      variant={isCompleted ? 'outline' : progress > 0 ? 'default' : 'default'}
                      className={cn(
                        'font-mono transition-all group-hover:scale-105',
                        isCompleted && 'border-success/30 text-success hover:bg-success/10'
                      )}
                    asChild
                  >
                    <Link href={`/challenges/${path.id}`}>
                        {isCompleted
                          ? 'Review'
                          : progress > 0
                            ? 'Continue'
                            : 'Start Mission'}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      ) : (
        <Card className="border-2 border-dashed">
          <CardContent className="py-16 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-muted/20">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
                </div>
            <Text variant="h3" size="lg" weight="semibold" className="mb-2">
              No missions found
            </Text>
            <Text size="sm" color="muted" mono>
              {hasActiveFilters
                ? 'Try adjusting your filters to see more missions'
                : 'No missions available at the moment'}
            </Text>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="mt-4 font-mono"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
            </Button>
            )}
        </CardContent>
      </Card>
      )}
    </Container>
  )
}
