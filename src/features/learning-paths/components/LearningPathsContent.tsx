'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Zap, Search, X, Trophy, Target, TrendingUp, Map } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    wrapper: 'bg-primary/15 border border-primary/25',
    icon: 'text-primary',
  },
  secondary: {
    wrapper: 'bg-secondary/15 border border-secondary/25',
    icon: 'text-secondary',
  },
  accent: {
    wrapper: 'bg-accent/15 border border-accent/25',
    icon: 'text-accent',
  },
  success: {
    wrapper: 'bg-success/15 border border-success/25',
    icon: 'text-success',
  },
} as const

export default function LearningPathsContent() {
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
      <Container className="py-4 sm:py-6">
        <div className="text-center py-16">
          <Text variant="h1" size="xl" weight="bold" orbitron glow className="mb-2">
            Hacking Missions
          </Text>
          <Text color="muted" mono size="sm">
            No missions available at the moment
          </Text>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-4 sm:py-6">
      {/* Compact Header */}
      <header className="mb-4 sm:mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Map className="w-5 h-5 text-primary" />
          <Text variant="h1" size="xl" weight="bold" orbitron glow>
            Learning Paths
          </Text>
        </div>
        <Text color="muted" mono size="sm">
          Choose your path to become the ultimate cybersecurity expert
        </Text>
      </header>

      {/* Compact Stats Row */}
      <section aria-label="Progress Statistics" className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            <Text size="xs" color="muted" mono className="uppercase tracking-wider">Progress</Text>
          </div>
          <Text size="xl" weight="bold" color="primary" orbitron>{totalProgress}%</Text>
        </div>

        <div className="p-3 rounded-xl bg-success/10 border border-success/20">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-3.5 h-3.5 text-success" />
            <Text size="xs" color="muted" mono className="uppercase tracking-wider">Done</Text>
          </div>
          <Text size="xl" weight="bold" color="success" orbitron>{completedChallenges}/{totalChallenges}</Text>
        </div>

        <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-3.5 h-3.5 text-accent" />
            <Text size="xs" color="muted" mono className="uppercase tracking-wider">XP</Text>
          </div>
          <Text size="xl" weight="bold" color="accent" orbitron>{totalXP.toLocaleString()}</Text>
        </div>

        <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-3.5 h-3.5 text-secondary" />
            <Text size="xs" color="muted" mono className="uppercase tracking-wider">Paths</Text>
          </div>
          <Text size="xl" weight="bold" color="secondary" orbitron>{learningPaths.length}</Text>
        </div>
      </section>

      {/* Compact Filters */}
      <section aria-label="Filter missions" className="mb-4">
        <Card className="border-0 bg-card/50">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search missions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 font-mono text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-[120px] h-9 font-mono text-xs">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={progressFilter} onValueChange={setProgressFilter}>
                  <SelectTrigger className="w-[120px] h-9 font-mono text-xs">
                    <SelectValue placeholder="Progress" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 px-2">
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Mission Paths Grid */}
      <main>
        {filteredPaths.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filteredPaths.map((path) => {
              const IconComponent = path.icon
              const progress = Math.round((path.completedChallenges / path.totalChallenges) * 100)
              const palette = colorStyles[path.color]
              const pathDifficulty = path.challenges[0]?.difficulty || 'Beginner'
              const isCompleted = progress === 100

              return (
                <Link
                  key={path.id}
                  href={`/challenges/${path.id}`}
                  className={cn(
                    'block p-4 rounded-xl border transition-all hover:scale-[1.01] group',
                    isCompleted
                      ? 'bg-success/5 border-success/30 hover:border-success/50'
                      : progress > 0
                        ? 'bg-primary/5 border-primary/30 hover:border-primary/50'
                        : 'bg-card/50 border-border/50 hover:border-primary/30'
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={cn('p-2.5 rounded-xl shrink-0', palette.wrapper)}>
                      <IconComponent className={cn('w-5 h-5', palette.icon)} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Title Row */}
                      <div className="flex items-center gap-2 mb-1">
                        <Text size="sm" weight="semibold" orbitron className="truncate group-hover:text-primary transition-colors">
                          {path.title}
                        </Text>
                        <Badge variant="outline" className={cn('font-mono text-[9px] shrink-0', difficultyStyles[pathDifficulty])}>
                          {pathDifficulty}
                        </Badge>
                        {isCompleted && (
                          <Trophy className="w-3.5 h-3.5 text-success shrink-0" />
                        )}
                      </div>

                      {/* Description */}
                      <Text size="xs" color="muted" mono className="line-clamp-1 mb-2">
                        {path.description}
                      </Text>

                      {/* Progress Bar */}
                      <div className="flex items-center gap-2 mb-2">
                        <Progress value={progress} className="h-1.5 flex-1" />
                        <Text size="xs" weight="semibold" color={isCompleted ? 'success' : 'primary'} mono>
                          {progress}%
                        </Text>
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono">
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {path.completedChallenges}/{path.totalChallenges}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-success" />
                            {path.completedChallenges * 150} XP
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          {isCompleted ? 'Review' : progress > 0 ? 'Continue' : 'Start'}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <Card className="border-2 border-dashed">
            <CardContent className="py-8 text-center">
              <Search className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <Text size="sm" weight="semibold" className="mb-1">No missions found</Text>
              <Text size="xs" color="muted" mono>
                {hasActiveFilters ? 'Try adjusting your filters' : 'No missions available'}
              </Text>
            </CardContent>
          </Card>
        )}
      </main>
    </Container>
  )
}
