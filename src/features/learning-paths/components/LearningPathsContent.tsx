'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Zap, Search, X, Trophy, Target, TrendingUp, Map, Lock, CheckCircle2, Play, RotateCcw } from 'lucide-react'
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

const difficultyConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  Beginner: { 
    label: 'BEGINNER', 
    color: 'text-emerald-400', 
    bg: 'bg-emerald-500/10', 
    border: 'border-emerald-500/30' 
  },
  Intermediate: { 
    label: 'INTERMEDIATE', 
    color: 'text-amber-400', 
    bg: 'bg-amber-500/10', 
    border: 'border-amber-500/30' 
  },
  Advanced: { 
    label: 'ADVANCED', 
    color: 'text-rose-400', 
    bg: 'bg-rose-500/10', 
    border: 'border-rose-500/30' 
  },
}

const pathColors = {
  primary: {
    gradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
    border: 'border-cyan-500/30 hover:border-cyan-400/60',
    glow: 'hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]',
    icon: 'text-cyan-400',
    iconBg: 'bg-cyan-500/20 border-cyan-500/30',
    accent: 'text-cyan-400',
    progress: 'bg-cyan-500',
  },
  secondary: {
    gradient: 'from-violet-500/20 via-violet-500/5 to-transparent',
    border: 'border-violet-500/30 hover:border-violet-400/60',
    glow: 'hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]',
    icon: 'text-violet-400',
    iconBg: 'bg-violet-500/20 border-violet-500/30',
    accent: 'text-violet-400',
    progress: 'bg-violet-500',
  },
  accent: {
    gradient: 'from-fuchsia-500/20 via-fuchsia-500/5 to-transparent',
    border: 'border-fuchsia-500/30 hover:border-fuchsia-400/60',
    glow: 'hover:shadow-[0_0_30px_-5px_rgba(217,70,239,0.3)]',
    icon: 'text-fuchsia-400',
    iconBg: 'bg-fuchsia-500/20 border-fuchsia-500/30',
    accent: 'text-fuchsia-400',
    progress: 'bg-fuchsia-500',
  },
  success: {
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    border: 'border-emerald-500/30 hover:border-emerald-400/60',
    glow: 'hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]',
    icon: 'text-emerald-400',
    iconBg: 'bg-emerald-500/20 border-emerald-500/30',
    accent: 'text-emerald-400',
    progress: 'bg-emerald-500',
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
      <section aria-label="Filter missions" className="mb-6">
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

      {/* Mission Paths Grid - Redesigned Cards */}
      <main>
        {filteredPaths.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredPaths.map((path) => {
              const IconComponent = path.icon
              const progress = Math.round((path.completedChallenges / path.totalChallenges) * 100)
              const colors = pathColors[path.color]
              const pathDifficulty = path.challenges[0]?.difficulty || 'Beginner'
              const difficulty = difficultyConfig[pathDifficulty]
              const isCompleted = progress === 100
              const isStarted = progress > 0

              return (
                <Link
                  key={path.id}
                  href={`/challenges/${path.id}`}
                  className="group block"
                >
                  <div
                    className={cn(
                      'relative overflow-hidden rounded-2xl border-2 transition-all duration-300',
                      'bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80',
                      'backdrop-blur-sm',
                      colors.border,
                      colors.glow,
                      'hover:translate-y-[-2px]'
                    )}
                  >
                    {/* Gradient overlay */}
                    <div className={cn(
                      'absolute inset-0 bg-gradient-to-br opacity-60',
                      colors.gradient
                    )} />
                    
                    {/* Scan line effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />

                    {/* Content */}
                    <div className="relative p-5">
                      {/* Top Row - Icon, Title, Badges */}
                      <div className="flex items-start gap-4 mb-4">
                        {/* Large Icon */}
                        <div className={cn(
                          'relative p-4 rounded-xl border-2 shrink-0',
                          'transition-all duration-300 group-hover:scale-110',
                          colors.iconBg
                        )}>
                          <IconComponent className={cn('w-7 h-7', colors.icon)} />
                          {isCompleted && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Title & Description */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <h3 className={cn(
                              'font-orbitron font-bold text-lg tracking-wide',
                              'transition-colors duration-300',
                              isCompleted ? 'text-emerald-400' : 'text-white group-hover:' + colors.accent
                            )}>
                              {path.title}
                            </h3>
                            <Badge 
                              variant="outline" 
                              className={cn(
                                'font-mono text-[10px] font-bold tracking-widest uppercase border',
                                difficulty.color,
                                difficulty.bg,
                                difficulty.border
                              )}
                            >
                              {difficulty.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400 font-mono line-clamp-2 leading-relaxed">
                            {path.description}
                          </p>
                        </div>
                      </div>

                      {/* Progress Section */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                            Mission Progress
                          </span>
                          <span className={cn(
                            'text-sm font-bold font-orbitron',
                            isCompleted ? 'text-emerald-400' : colors.accent
                          )}>
                            {progress}%
                          </span>
                        </div>
                        <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              'absolute inset-y-0 left-0 rounded-full transition-all duration-500',
                              isCompleted ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : colors.progress,
                              'shadow-[0_0_10px_currentColor]'
                            )}
                            style={{ width: `${progress}%` }}
                          />
                          {/* Animated shimmer */}
                          {isStarted && !isCompleted && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                          )}
                        </div>
                      </div>

                      {/* Bottom Stats Row */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
                        <div className="flex items-center gap-4">
                          {/* Challenges */}
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center">
                              <Target className="w-4 h-4 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 font-mono uppercase">Challenges</p>
                              <p className={cn('text-sm font-bold font-orbitron', colors.accent)}>
                                {path.completedChallenges}/{path.totalChallenges}
                              </p>
                            </div>
                          </div>

                          {/* XP */}
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                              <Zap className="w-4 h-4 text-amber-400" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 font-mono uppercase">XP Earned</p>
                              <p className="text-sm font-bold font-orbitron text-amber-400">
                                {(path.completedChallenges * 150).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className={cn(
                          'flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm font-semibold',
                          'transition-all duration-300',
                          'opacity-70 group-hover:opacity-100',
                          isCompleted 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : isStarted 
                              ? 'bg-primary/20 text-primary'
                              : 'bg-slate-800 text-slate-300'
                        )}>
                          {isCompleted ? (
                            <>
                              <RotateCcw className="w-4 h-4" />
                              <span>Review</span>
                            </>
                          ) : isStarted ? (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Continue</span>
                            </>
                          ) : (
                            <>
                              <ChevronRight className="w-4 h-4" />
                              <span>Start</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className={cn(
                      'absolute top-0 right-0 w-20 h-20',
                      'bg-gradient-to-bl',
                      colors.gradient,
                      'opacity-40'
                    )} />
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <Card className="border-2 border-dashed border-slate-700">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
                <Search className="w-8 h-8 text-slate-500" />
              </div>
              <Text size="lg" weight="bold" className="mb-2">No missions found</Text>
              <Text size="sm" color="muted" mono>
                {hasActiveFilters ? 'Try adjusting your filters' : 'No missions available'}
              </Text>
              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </Container>
  )
}
