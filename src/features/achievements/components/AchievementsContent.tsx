'use client'

import { useState, useMemo } from 'react'
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
  Search,
  Filter,
  X,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Container, Text } from '@/components/atoms'
import { cn } from '@/lib/utils'

interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  category: string
  earned: boolean
  rarity: string
  points: number
  earnedDate?: string
  progress?: number
}

interface LeaderboardPlayer {
  rank: number
  username: string
  points: number
  streak: number
  change: string
}

interface Category {
  name: string
  earned: number
  total: number
  color: string
}

interface AchievementsContentProps {
  achievements?: Achievement[]
  leaderboard?: LeaderboardPlayer[]
  categories?: Category[]
}

const defaultAchievements: Achievement[] = [
  {
    id: 1,
    title: 'First Blood',
    description: 'Complete your first hacking challenge',
    icon: '🎯',
    category: 'Milestone',
    earned: true,
    rarity: 'Common',
    points: 50,
    earnedDate: '2025-01-15',
  },
  {
    id: 2,
    title: 'SQL Injection Master',
    description: 'Successfully exploit 10 SQL injection vulnerabilities',
    icon: '💉',
    category: 'Web Security',
    earned: true,
    rarity: 'Rare',
    points: 250,
    earnedDate: '2025-02-10',
  },
  {
    id: 3,
    title: 'Ghost in the Machine',
    description: 'Complete a challenge without triggering any alarms',
    icon: '👻',
    category: 'Stealth',
    earned: false,
    rarity: 'Epic',
    points: 500,
    progress: 67,
  },
  {
    id: 4,
    title: 'Code Breaker',
    description: 'Successfully decrypt 5 different encryption algorithms',
    icon: '🔓',
    category: 'Cryptography',
    earned: true,
    rarity: 'Rare',
    points: 300,
    earnedDate: '2025-01-28',
  },
  {
    id: 5,
    title: 'Network Ninja',
    description: 'Complete all network security challenges',
    icon: '🥷',
    category: 'Network',
    earned: false,
    rarity: 'Legendary',
    points: 1000,
    progress: 40,
  },
  {
    id: 6,
    title: 'Bug Hunter',
    description: 'Find and report 25 unique vulnerabilities',
    icon: '🐛',
    category: 'Discovery',
    earned: false,
    rarity: 'Epic',
    points: 750,
    progress: 84,
  },
]

const defaultLeaderboard: LeaderboardPlayer[] = [
  { rank: 1, username: 'CyberPhantom', points: 15420, streak: 45, change: '+2' },
  { rank: 2, username: 'H4ck3rM4st3r', points: 14830, streak: 32, change: '-1' },
  { rank: 3, username: 'DigitalSamurai', points: 13945, streak: 28, change: '+1' },
  { rank: 4, username: 'QuantumHacker', points: 12760, streak: 22, change: '0' },
  { rank: 5, username: 'Agent_X', points: 11890, streak: 18, change: '+3' },
  { rank: 6, username: 'YOU', points: 8420, streak: 15, change: '+1' },
]

const defaultCategories: Category[] = [
  { name: 'Web Security', earned: 1, total: 2, color: 'bg-secondary' },
  { name: 'Cryptography', earned: 1, total: 1, color: 'bg-success' },
  { name: 'Network', earned: 0, total: 1, color: 'bg-accent' },
  { name: 'Stealth', earned: 0, total: 1, color: 'bg-warning' },
  { name: 'Discovery', earned: 0, total: 1, color: 'bg-destructive' },
  { name: 'Milestone', earned: 1, total: 1, color: 'bg-primary' },
]

const getRarityStyles = (rarity: string) => {
  switch (rarity) {
    case 'Common':
      return {
        color: 'text-muted-foreground',
        bg: 'bg-muted/10 border-muted/30',
        badge: 'bg-muted/20 text-muted-foreground border-muted/30',
        icon: 'bg-muted/20 border-muted/30',
      }
    case 'Rare':
      return {
        color: 'text-secondary',
        bg: 'bg-secondary/10 border-secondary/30',
        badge: 'bg-secondary/20 text-secondary border-secondary/30',
        icon: 'bg-secondary/20 border-secondary/30',
      }
    case 'Epic':
      return {
        color: 'text-accent',
        bg: 'bg-accent/10 border-accent/30',
        badge: 'bg-accent/20 text-accent border-accent/30',
        icon: 'bg-accent/20 border-accent/30',
      }
    case 'Legendary':
      return {
        color: 'text-warning',
        bg: 'bg-warning/10 border-warning/30',
        badge: 'bg-warning/20 text-warning border-warning/30',
        icon: 'bg-warning/20 border-warning/30',
      }
    default:
      return {
        color: 'text-muted-foreground',
        bg: 'bg-muted/10 border-muted/30',
        badge: 'bg-muted/20 text-muted-foreground border-muted/30',
        icon: 'bg-muted/20 border-muted/30',
      }
  }
}

export default function AchievementsContent({
  achievements = defaultAchievements,
  leaderboard = defaultLeaderboard,
  categories = defaultCategories,
}: AchievementsContentProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [rarityFilter, setRarityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const filteredAchievements = useMemo(() => {
    return achievements.filter((achievement) => {
      const matchesSearch =
        searchQuery === '' ||
        achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRarity = rarityFilter === 'all' || achievement.rarity === rarityFilter

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'earned' && achievement.earned) ||
        (statusFilter === 'in-progress' && !achievement.earned)

      const matchesCategory = categoryFilter === 'all' || achievement.category === categoryFilter

      return matchesSearch && matchesRarity && matchesStatus && matchesCategory
    })
  }, [achievements, searchQuery, rarityFilter, statusFilter, categoryFilter])

  const hasActiveFilters =
    searchQuery !== '' ||
    rarityFilter !== 'all' ||
    statusFilter !== 'all' ||
    categoryFilter !== 'all'

  const clearFilters = () => {
    setSearchQuery('')
    setRarityFilter('all')
    setStatusFilter('all')
    setCategoryFilter('all')
  }

  const earnedCount = achievements.filter((a) => a.earned).length
  const totalPoints = achievements.filter((a) => a.earned).reduce((sum, a) => sum + a.points, 0)
  const currentStreak = 15
  const globalRank = 6
  const completionRate = Math.round((earnedCount / achievements.length) * 100)

  const earnedAchievements = filteredAchievements.filter((a) => a.earned)
  const inProgressAchievements = filteredAchievements.filter((a) => !a.earned)

  return (
    <Container className="py-4 sm:py-6">
      {/* Compact Header */}
      <header className="mb-4 sm:mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Trophy className="w-5 h-5 text-primary" aria-hidden="true" />
          <Text variant="h1" size="xl" weight="bold" orbitron glow>
            Achievements
          </Text>
          <Badge variant="outline" className="text-primary border-primary/30 font-mono text-[10px]">
            Hall of Fame
          </Badge>
        </div>
        <Text color="muted" mono size="sm">
          Track your milestones and climb the leaderboard
        </Text>
      </header>

      {/* Compact Stats Row */}
      <section aria-label="Achievement Statistics" className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-3.5 h-3.5 text-primary" />
            <Text size="xs" color="muted" mono className="uppercase tracking-wider">Points</Text>
          </div>
          <Text size="xl" weight="bold" color="primary" orbitron>{totalPoints.toLocaleString()}</Text>
        </div>

        <div className="p-3 rounded-xl bg-success/10 border border-success/20">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-3.5 h-3.5 text-success" />
            <Text size="xs" color="muted" mono className="uppercase tracking-wider">Earned</Text>
          </div>
          <Text size="xl" weight="bold" color="success" orbitron>{earnedCount}/{achievements.length}</Text>
        </div>

        <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-3.5 h-3.5 text-accent" />
            <Text size="xs" color="muted" mono className="uppercase tracking-wider">Streak</Text>
          </div>
          <Text size="xl" weight="bold" color="accent" orbitron>{currentStreak}</Text>
        </div>

        <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-secondary" />
            <Text size="xs" color="muted" mono className="uppercase tracking-wider">Rank</Text>
          </div>
          <Text size="xl" weight="bold" color="secondary" orbitron>#{globalRank}</Text>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <main className="lg:col-span-2 space-y-4">
          {/* Compact Filters */}
          <section aria-label="Filter achievements">
            <Card className="border-0 bg-card/50">
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9 font-mono text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={rarityFilter} onValueChange={setRarityFilter}>
                      <SelectTrigger className="w-[110px] h-9 font-mono text-xs">
                        <SelectValue placeholder="Rarity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Common">Common</SelectItem>
                        <SelectItem value="Rare">Rare</SelectItem>
                        <SelectItem value="Epic">Epic</SelectItem>
                        <SelectItem value="Legendary">Legendary</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[110px] h-9 font-mono text-xs">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="earned">Earned</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
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

          {/* Earned Achievements */}
          {earnedAchievements.length > 0 && (
            <section aria-labelledby="earned-achievements-heading">
              <Card className="border-0 bg-card/50">
                <CardHeader className="pb-3 pt-4 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-orbitron text-base flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      Earned
                    </CardTitle>
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {earnedAchievements.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 px-4 pb-4">
                  {earnedAchievements
                    .sort((a, b) => new Date(b.earnedDate || '').getTime() - new Date(a.earnedDate || '').getTime())
                    .map((achievement) => {
                      const styles = getRarityStyles(achievement.rarity)
                      return (
                        <div
                          key={achievement.id}
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-lg border transition-all hover:scale-[1.01]',
                            styles.bg
                          )}
                        >
                          <div className="text-2xl shrink-0">{achievement.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <Text size="sm" weight="semibold" orbitron className="truncate">
                                {achievement.title}
                              </Text>
                              <Badge variant="outline" className={cn('font-mono text-[9px] shrink-0', styles.badge)}>
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <Text size="xs" color="muted" mono className="truncate">
                              {achievement.description}
                            </Text>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Star className="w-3 h-3 text-primary" />
                            <Text size="xs" weight="semibold" color="primary" mono>
                              {achievement.points}
                            </Text>
                          </div>
                        </div>
                      )
                    })}
                </CardContent>
              </Card>
            </section>
          )}

          {/* In Progress Achievements */}
          {inProgressAchievements.length > 0 && (
            <section aria-labelledby="in-progress-heading">
              <Card className="border-0 bg-card/50">
                <CardHeader className="pb-3 pt-4 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-orbitron text-base flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      In Progress
                    </CardTitle>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {inProgressAchievements.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 px-4 pb-4">
                  {inProgressAchievements
                    .sort((a, b) => (b.progress || 0) - (a.progress || 0))
                    .map((achievement) => {
                      const styles = getRarityStyles(achievement.rarity)
                      return (
                        <div
                          key={achievement.id}
                          className={cn(
                            'p-3 rounded-lg border border-dashed transition-all hover:border-solid',
                            styles.bg
                          )}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-2xl opacity-60 shrink-0">{achievement.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <Text size="sm" weight="semibold" orbitron className="truncate">
                                  {achievement.title}
                                </Text>
                                <Badge variant="outline" className={cn('font-mono text-[9px] shrink-0', styles.badge)}>
                                  {achievement.rarity}
                                </Badge>
                              </div>
                              <Text size="xs" color="muted" mono className="truncate">
                                {achievement.description}
                              </Text>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <Star className="w-3 h-3 text-muted-foreground" />
                              <Text size="xs" color="muted" mono>
                                {achievement.points}
                              </Text>
                            </div>
                          </div>
                          {achievement.progress && (
                            <div className="flex items-center gap-2 pl-11">
                              <Progress value={achievement.progress} className="h-1.5 flex-1" />
                              <Text size="xs" weight="semibold" color="primary" mono>
                                {achievement.progress}%
                              </Text>
                            </div>
                          )}
                        </div>
                      )
                    })}
                </CardContent>
              </Card>
            </section>
          )}

          {/* Empty State */}
          {filteredAchievements.length === 0 && (
            <Card className="border-2 border-dashed">
              <CardContent className="py-8 text-center">
                <Search className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <Text size="sm" weight="semibold" className="mb-1">No achievements found</Text>
                <Text size="xs" color="muted" mono>
                  {hasActiveFilters ? 'Try adjusting your filters' : 'No achievements available'}
                </Text>
              </CardContent>
            </Card>
          )}
        </main>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Leaderboard */}
          <Card className="border-0 bg-card/50">
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="font-orbitron text-base flex items-center gap-2">
                <Medal className="w-4 h-4 text-secondary" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-1.5">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className={cn(
                      'flex items-center gap-2 p-2 rounded-lg transition-all',
                      player.username === 'YOU'
                        ? 'bg-primary/10 border border-primary/30'
                        : 'hover:bg-muted/50'
                    )}
                  >
                    <div className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                      {player.rank <= 3 ? (
                        <Trophy
                          className={cn(
                            'w-3 h-3',
                            player.rank === 1 ? 'text-warning' : player.rank === 2 ? 'text-muted-foreground' : 'text-warning/70'
                          )}
                        />
                      ) : (
                        <span className="text-[10px] font-mono font-bold">{player.rank}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Text
                        size="xs"
                        weight="medium"
                        mono
                        className={cn('truncate', player.username === 'YOU' && 'text-primary')}
                      >
                        {player.username}
                      </Text>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                        <span>{player.points.toLocaleString()}</span>
                        <Flame className="w-2.5 h-2.5 text-accent" />
                        <span>{player.streak}</span>
                      </div>
                    </div>
                    <div
                      className={cn(
                        'text-[9px] px-1.5 py-0.5 rounded font-mono',
                        player.change.startsWith('+')
                          ? 'text-success bg-success/20'
                          : player.change.startsWith('-')
                            ? 'text-destructive bg-destructive/20'
                            : 'text-muted-foreground bg-muted/50'
                      )}
                    >
                      {player.change !== '0' ? player.change : '—'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="border-0 bg-card/50">
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="font-orbitron text-base flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4">
              {categories.map((category) => {
                const progress = (category.earned / category.total) * 100
                return (
                  <div key={category.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Text size="xs" weight="medium" mono>{category.name}</Text>
                      <Text size="xs" color="muted" mono>{category.earned}/{category.total}</Text>
                    </div>
                    <div className="w-full h-1.5 bg-muted/50 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full transition-all', category.color)}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 bg-card/50">
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="font-orbitron text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-4 pb-4">
              <button className="w-full p-3 text-left rounded-lg border border-dashed border-primary/30 hover:border-primary/50 hover:bg-primary/10 transition-all group">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <Text size="xs" weight="medium" mono className="group-hover:text-primary">Start Challenge</Text>
                    <Text size="xs" color="muted" mono>Continue streak</Text>
                  </div>
                </div>
              </button>
              <button className="w-full p-3 text-left rounded-lg border border-dashed border-secondary/30 hover:border-secondary/50 hover:bg-secondary/10 transition-all group">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                  <div>
                    <Text size="xs" weight="medium" mono className="group-hover:text-secondary">View Friends</Text>
                    <Text size="xs" color="muted" mono>Compare progress</Text>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </Container>
  )
}
