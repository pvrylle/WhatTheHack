import { Container, Text } from '@/components/atoms'
import { StatsGrid } from '@/components/organisms'
import { MissionList } from '@/components/organisms'
import { AchievementList } from '@/components/organisms'
import { ProfileCard } from '@/components/organisms'
import { StatCardProps } from '@/components/molecules'
import { MissionCardProps } from '@/components/molecules'
import { AchievementCardProps } from '@/components/molecules'
import { QuickActions } from '@/components/dashboard'

export interface DashboardTemplateProps {
  stats: StatCardProps[]
  missions: MissionCardProps[]
  achievements: AchievementCardProps[]
  profileData: {
    rank: string
    level: number
    xp: number
    xpToNext: number
    hacksCompleted: number
    streakDays: number
    totalPoints: number
  }
}

export const DashboardTemplate = ({
  stats,
  missions,
  achievements,
  profileData,
}: DashboardTemplateProps) => {
  return (
    <Container className="py-4 sm:py-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <Text variant="h1" size="xl" weight="bold" orbitron glow className="mb-1">
          Mission Control
        </Text>
        <Text color="muted" mono size="sm">
          Track your progress and continue your hacking journey
        </Text>
      </div>

      {/* Stats Row - Full Width */}
      <div className="mb-4 sm:mb-6">
        <StatsGrid stats={stats} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          <MissionList missions={missions} />
          <AchievementList achievements={achievements} />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <ProfileCard {...profileData} />
          <QuickActions />
        </div>
      </div>
    </Container>
  )
}
