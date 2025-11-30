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
  { name: 'Web Security', earned: 1, total: 2, color: 'bg-blue-500' },
  { name: 'Cryptography', earned: 1, total: 1, color: 'bg-green-500' },
  { name: 'Network', earned: 0, total: 1, color: 'bg-purple-500' },
  { name: 'Stealth', earned: 0, total: 1, color: 'bg-orange-500' },
  { name: 'Discovery', earned: 0, total: 1, color: 'bg-red-500' },
  { name: 'Milestone', earned: 1, total: 1, color: 'bg-cyan-500' },
]

const getRarityStyles = (rarity: string) => {
  switch (rarity) {
    case 'Common':
      return {
        color: 'text-muted-foreground',
        bg: 'bg-muted/10 border-muted/30',
        badge: 'bg-muted/20 text-muted-foreground border-muted/30',
        glow: 'shadow-muted/20',
        gradient: 'from-muted/20 to-muted/5',
      }
    case 'Rare':
      return {
        color: 'text-blue-500',
        bg: 'bg-blue-500/10 border-blue-500/30',
        badge: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
        glow: 'shadow-blue-500/20',
        gradient: 'from-blue-500/20 to-blue-500/5',
      }
    case 'Epic':
      return {
        color: 'text-purple-500',
        bg: 'bg-purple-500/10 border-purple-500/30',
        badge: 'bg-purple-500/20 text-purple-600 border-purple-500/30',
        glow: 'shadow-purple-500/20',
        gradient: 'from-purple-500/20 to-purple-500/5',
      }
    case 'Legendary':
      return {
        color: 'text-amber-500',
        bg: 'bg-amber-500/10 border-amber-500/30',
        badge: 'bg-amber-500/20 text-amber-600 border-amber-500/30',
        glow: 'shadow-amber-500/30',
        gradient: 'from-amber-500/30 to-amber-500/10',
      }
    default:
      return {
        color: 'text-muted-foreground',
        bg: 'bg-muted/10 border-muted/30',
        badge: 'bg-muted/20 text-muted-foreground border-muted/30',
        glow: 'shadow-muted/20',
        gradient: 'from-muted/20 to-muted/5',
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
    <Container>
      {/* Header Section */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-primary/15 border-2 border-primary/25 shadow-lg shadow-primary/10">
            <Trophy className="w-7 h-7 text-primary" aria-hidden="true" />
          </div>
          <Badge variant="outline" className="text-primary border-primary/30 font-mono">
            Hall of Fame
          </Badge>
        </div>
        <Text variant="h1" size="4xl" weight="bold" orbitron glow className="mb-3">
          Your Achievements
        </Text>
        <Text color="muted" mono size="lg">
          Celebrate your cybersecurity milestones and track your progress on the global leaderboard
        </Text>
      </header>

      {/* Stats Grid */}
      <section aria-label="Achievement Statistics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Text size="sm" color="muted" mono className="mb-1">
                  Total Points
                </Text>
                <Text variant="h3" size="2xl" weight="bold" color="primary" orbitron>
                  {totalPoints.toLocaleString()}
                </Text>
              </div>
              <div className="p-3 rounded-lg bg-primary/20 border border-primary/30">
                <Star className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
            </div>
            <Progress value={completionRate} className="h-2 bg-muted/50" aria-label={`${completionRate}% complete`} />
          </CardContent>
        </Card>

        <Card className="border-2 border-success/20 bg-gradient-to-br from-success/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Text size="sm" color="muted" mono className="mb-1">
                  Achievements
                </Text>
                <Text variant="h3" size="2xl" weight="bold" color="success" orbitron>
                  {earnedCount}/{achievements.length}
                </Text>
              </div>
              <div className="p-3 rounded-lg bg-success/20 border border-success/30">
                <Award className="w-6 h-6 text-success" aria-hidden="true" />
              </div>
            </div>
            <Text size="xs" color="muted" mono>
              {completionRate}% complete
            </Text>
          </CardContent>
        </Card>

        <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Text size="sm" color="muted" mono className="mb-1">
                  Day Streak
                </Text>
                <Text variant="h3" size="2xl" weight="bold" color="accent" orbitron>
                  {currentStreak}
                </Text>
              </div>
              <div className="p-3 rounded-lg bg-accent/20 border border-accent/30">
                <Flame className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
            </div>
            <Text size="xs" color="muted" mono>
              Keep it going!
            </Text>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Text size="sm" color="muted" mono className="mb-1">
                  Global Rank
                </Text>
                <Text variant="h3" size="2xl" weight="bold" color="secondary" orbitron>
                  #{globalRank}
                </Text>
              </div>
              <div className="p-3 rounded-lg bg-secondary/20 border border-secondary/30">
                <TrendingUp className="w-6 h-6 text-secondary" aria-hidden="true" />
              </div>
            </div>
            <Text size="xs" color="muted" mono>
              Top performer
            </Text>
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <main className="lg:col-span-2 space-y-8">
          {/* Filters Section */}
          <section aria-label="Filter achievements">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="h2" size="2xl" weight="bold" orbitron className="mb-1">
                    All Achievements
                  </Text>
                  <Text color="muted" mono>
                    {filteredAchievements.length} of {achievements.length} achievements
                  </Text>
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="font-mono text-xs"
                  >
                    <X className="w-4 h-4 mr-2" aria-hidden="true" />
                    Clear Filters
                  </Button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    placeholder="Search achievements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 font-mono"
                    aria-label="Search achievements"
                  />
                </div>

                <Select value={rarityFilter} onValueChange={setRarityFilter}>
                  <SelectTrigger className="w-full sm:w-[150px] font-mono" aria-label="Filter by rarity">
                    <Filter className="w-4 h-4 mr-2" aria-hidden="true" />
                    <SelectValue placeholder="Rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rarities</SelectItem>
                    <SelectItem value="Common">Common</SelectItem>
                    <SelectItem value="Rare">Rare</SelectItem>
                    <SelectItem value="Epic">Epic</SelectItem>
                    <SelectItem value="Legendary">Legendary</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[150px] font-mono" aria-label="Filter by status">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="earned">Earned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[150px] font-mono" aria-label="Filter by category">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {Array.from(new Set(achievements.map((a) => a.category))).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Earned Achievements */}
          {earnedAchievements.length > 0 && (
            <section aria-labelledby="earned-achievements-heading">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/20 border border-success/30">
                    <CheckCircle className="w-5 h-5 text-success" aria-hidden="true" />
                  </div>
                  <Text variant="h2" size="xl" weight="semibold" orbitron>
                    Earned Achievements
                  </Text>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {earnedAchievements.length} earned
                </Badge>
              </div>

              <ul className="grid gap-4" role="list">
                {earnedAchievements
                  .sort(
                    (a, b) =>
                      new Date(b.earnedDate || '').getTime() -
                      new Date(a.earnedDate || '').getTime()
                  )
                  .map((achievement) => {
                    const styles = getRarityStyles(achievement.rarity)
                    return (
                      <li key={achievement.id}>
                        <Card
                          className={cn(
                            'border-2 bg-card backdrop-blur transition-all duration-300 group overflow-hidden relative',
                            'hover:shadow-2xl hover:scale-[1.02]',
                            styles.bg,
                            styles.glow
                          )}
                        >
                          <div
                            className={cn(
                              'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                              styles.gradient
                            )}
                          />
                          <CardContent className="p-6 relative z-10">
                            <article className="flex items-start gap-4">
                              <div className="text-4xl group-hover:scale-110 transition-transform" aria-hidden="true">
                                {achievement.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <Text variant="h3" size="lg" weight="semibold" orbitron className="mb-1">
                                      {achievement.title}
                                    </Text>
                                    <Text size="sm" color="muted" mono className="mb-3">
                                      {achievement.description}
                                    </Text>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant="outline"
                                      className={cn('font-mono text-xs', styles.badge)}
                                    >
                                      {achievement.rarity}
                                    </Badge>
                                    <Crown className="w-4 h-4 text-amber-500" aria-hidden="true" />
                                  </div>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                                  <Badge variant="outline" className="font-mono text-xs">
                                    {achievement.category}
                                  </Badge>
                                  <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-primary" aria-hidden="true" />
                                    <Text size="sm" weight="semibold" color="primary" mono>
                                      {achievement.points} pts
                                    </Text>
                                  </div>
                                </div>
                              </div>
                            </article>
                          </CardContent>
                        </Card>
                      </li>
                    )
                  })}
              </ul>
            </section>
          )}

          {/* In Progress Achievements */}
          {inProgressAchievements.length > 0 && (
            <section aria-labelledby="in-progress-heading">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/20 border border-accent/30">
                    <Clock className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>
                  <Text variant="h2" size="xl" weight="semibold" orbitron>
                    In Progress
                  </Text>
                </div>
                <Badge variant="outline" className="font-mono">
                  {inProgressAchievements.length} remaining
                </Badge>
              </div>

              <ul className="grid gap-4" role="list">
                {inProgressAchievements
                  .sort((a, b) => (b.progress || 0) - (a.progress || 0))
                  .map((achievement) => {
                    const styles = getRarityStyles(achievement.rarity)
                    return (
                      <li key={achievement.id}>
                        <Card
                          className={cn(
                            'border-2 border-dashed bg-card/50 backdrop-blur transition-all duration-300 group overflow-hidden relative',
                            'hover:border-solid hover:shadow-lg hover:scale-[1.01]',
                            styles.bg
                          )}
                        >
                          <div
                            className={cn(
                              'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                              styles.gradient
                            )}
                          />
                          <CardContent className="p-6 relative z-10">
                            <article className="flex items-start gap-4">
                              <div className="text-4xl opacity-50 group-hover:opacity-75 transition-opacity" aria-hidden="true">
                                {achievement.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <Text
                                     
                                      variant="h3"
                                      size="lg"
                                      weight="semibold"
                                      orbitron
                                      className="mb-1"
                                    >
                                      {achievement.title}
                                    </Text>
                                    <Text size="sm" color="muted" mono className="mb-3">
                                      {achievement.description}
                                    </Text>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={cn('font-mono text-xs', styles.badge)}
                                  >
                                    {achievement.rarity}
                                  </Badge>
                                </div>

                                {achievement.progress && (
                                  <div className="space-y-2 mb-4">
                                    <div className="flex justify-between items-center">
                                      <Text size="sm" color="muted" mono>
                                        Progress
                                      </Text>
                                      <Text size="sm" weight="semibold" color="primary" orbitron>
                                        {achievement.progress}%
                                      </Text>
                                    </div>
                                    <Progress
                                      value={achievement.progress}
                                      className="h-3 bg-muted/50"
                                      aria-label={`${achievement.progress}% progress`}
                                    />
                                  </div>
                                )}

                                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                                  <Badge variant="outline" className="font-mono text-xs">
                                    {achievement.category}
                                  </Badge>
                                  <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                                    <Text size="sm" color="muted" mono>
                                      {achievement.points} pts
                                    </Text>
                                  </div>
                                </div>
                              </div>
                            </article>
                          </CardContent>
                        </Card>
                      </li>
                    )
                  })}
              </ul>
            </section>
          )}

          {/* Empty State */}
          {filteredAchievements.length === 0 && (
            <Card className="border-2 border-dashed">
              <CardContent className="py-16 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-muted/20">
                    <Search className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
                  </div>
                </div>
                <Text variant="h3" size="lg" weight="semibold" className="mb-2">
                  No achievements found
                </Text>
                <Text size="sm" color="muted" mono>
                  {hasActiveFilters
                    ? 'Try adjusting your filters to see more achievements'
                    : 'No achievements available'}
                </Text>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="mt-4 font-mono"
                  >
                    <X className="w-4 h-4 mr-2" aria-hidden="true" />
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </main>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Leaderboard */}
          <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-secondary/20 border border-secondary/30">
                  <Medal className="w-5 h-5 text-secondary" aria-hidden="true" />
                </div>
                <CardTitle className="font-orbitron text-xl">Global Leaderboard</CardTitle>
              </div>
              <CardDescription className="font-mono">Top performers this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2" role="list" aria-label="Global leaderboard">
                {leaderboard.map((player) => (
                  <li
                    key={player.rank}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-muted/50',
                      player.username === 'YOU' &&
                        'bg-primary/10 border-2 border-primary/30 shadow-lg shadow-primary/10'
                    )}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 text-sm font-bold font-mono">
                      {player.rank <= 3 ? (
                        <Trophy
                          className={cn(
                            'w-5 h-5',
                            player.rank === 1
                              ? 'text-yellow-500'
                              : player.rank === 2
                                ? 'text-gray-400'
                                : 'text-amber-600'
                          )}
                          aria-label={`Rank ${player.rank}`}
                        />
                      ) : (
                        <span aria-label={`Rank ${player.rank}`}>{player.rank}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Text
                        size="sm"
                        weight="medium"
                        mono
                        className={cn(player.username === 'YOU' && 'text-primary')}
                      >
                        {player.username}
                      </Text>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                        <span>{player.points.toLocaleString()}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Flame className="w-3 h-3 text-orange-500" aria-hidden="true" />
                          <span>{player.streak}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={cn(
                        'text-xs px-2 py-1 rounded font-mono',
                        player.change.startsWith('+')
                          ? 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400'
                          : player.change.startsWith('-')
                            ? 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400'
                            : 'text-muted-foreground bg-muted/50'
                      )}
                      aria-label={`Change: ${player.change}`}
                    >
                      {player.change !== '0' ? player.change : '—'}
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Achievement Categories */}
          <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-accent/20 border border-accent/30">
                  <Target className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <CardTitle className="font-orbitron text-xl">Categories</CardTitle>
              </div>
              <CardDescription className="font-mono">Progress by category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.map((category) => {
                const progress = (category.earned / category.total) * 100
                return (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Text size="sm" weight="medium" mono>
                        {category.name}
                      </Text>
                      <Text size="xs" color="muted" mono>
                        {category.earned}/{category.total}
                      </Text>
                    </div>
                    <div className="w-full h-2.5 bg-muted/50 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full transition-all duration-500', category.color)}
                        style={{ width: `${progress}%` }}
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${category.name}: ${category.earned} of ${category.total} completed`}
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                  <Zap className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="font-orbitron text-xl">Quick Actions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-4 text-left rounded-lg border-2 border-dashed border-primary/30 hover:border-primary/50 hover:bg-primary/10 transition-all group">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <div>
                    <Text size="sm" weight="medium" mono className="group-hover:text-primary transition-colors">
                      Start New Challenge
                    </Text>
                    <Text size="xs" color="muted" mono>
                      Continue your streak
                    </Text>
                  </div>
                </div>
              </button>

              <button className="w-full p-4 text-left rounded-lg border-2 border-dashed border-secondary/30 hover:border-secondary/50 hover:bg-secondary/10 transition-all group">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <div>
                    <Text size="sm" weight="medium" mono className="group-hover:text-secondary transition-colors">
                      View Friends
                    </Text>
                    <Text size="xs" color="muted" mono>
                      Compare progress
                    </Text>
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
