'use client'

import { useState, useMemo } from 'react'
import { Container, Text } from '@/components/atoms'
import { ChallengeGrid } from '@/components/organisms'
import { ChallengeCardProps } from '@/components/molecules'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LucideIcon, ArrowLeft, Search, Filter, X } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const completionPercentage = Math.round((completedChallenges / totalChallenges) * 100)

  const filteredChallenges = useMemo(() => {
    return challenges.filter((challenge) => {
      const matchesSearch =
        searchQuery === '' ||
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDifficulty =
        difficultyFilter === 'all' || challenge.difficulty === difficultyFilter

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'completed' && challenge.isCompleted) ||
        (statusFilter === 'unlocked' && challenge.isUnlocked && !challenge.isCompleted) ||
        (statusFilter === 'locked' && !challenge.isUnlocked)

      return matchesSearch && matchesDifficulty && matchesStatus
    })
  }, [challenges, searchQuery, difficultyFilter, statusFilter])

  const hasActiveFilters = searchQuery !== '' || difficultyFilter !== 'all' || statusFilter !== 'all'

  const clearFilters = () => {
    setSearchQuery('')
    setDifficultyFilter('all')
    setStatusFilter('all')
  }

  return (
    <Container>
      {/* Header Section */}
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild className="border-primary/30 font-mono mb-6">
          <Link href="/learning-paths">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Missions
          </Link>
        </Button>

        <div className="flex items-start gap-4 mb-6">
          <div className="p-4 rounded-xl bg-primary/15 border-2 border-primary/25 shadow-lg shadow-primary/10">
            <IconComponent className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <Text variant="h1" size="3xl" weight="bold" orbitron glow className="mb-2">
              {missionTitle}
            </Text>
            <Text color="muted" mono className="text-base">
              {missionDescription}
            </Text>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-card/50 to-card/30 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Text variant="h3" size="lg" weight="semibold" orbitron className="mb-1">
                  Mission Progress
                </Text>
                <Text size="sm" color="muted" mono>
                  {completedChallenges} of {totalChallenges} challenges completed
                </Text>
              </div>
              <div className="text-right">
                <Text size="4xl" weight="bold" color="primary" orbitron>
                  {completionPercentage}%
                </Text>
              </div>
            </div>
            <Progress
              value={completionPercentage}
              className="h-4 bg-muted/50"
            />
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Text variant="h2" size="2xl" weight="bold" orbitron className="mb-1">
              Challenges
            </Text>
            <Text color="muted" mono>
              {filteredChallenges.length} of {challenges.length} challenges
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
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-mono"
            />
          </div>

          {/* Difficulty Filter */}
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

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] font-mono">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="unlocked">Available</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="locked">Locked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Challenges Grid */}
      {filteredChallenges.length > 0 ? (
        <ChallengeGrid
          challenges={filteredChallenges.map((challenge) => ({
            ...challenge,
            onStart: () => onChallengeStart?.(challenge.id),
          }))}
        />
      ) : (
        <Card className="border-2 border-dashed">
          <CardContent className="py-12 text-center">
            <Text variant="h3" size="lg" color="muted" className="mb-2">
              No challenges found
            </Text>
            <Text size="sm" color="muted" mono>
              {hasActiveFilters
                ? 'Try adjusting your filters'
                : 'No challenges available in this mission'}
            </Text>
          </CardContent>
        </Card>
      )}
    </Container>
  )
}
