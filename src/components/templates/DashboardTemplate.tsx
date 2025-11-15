import { Container, Text } from "@/components/atoms"
import { StatsGrid } from "@/components/organisms"
import { MissionList } from "@/components/organisms"
import { AchievementList } from "@/components/organisms"
import { ProfileCard } from "@/components/organisms"
import { StatCardProps } from "@/components/molecules"
import { MissionCardProps } from "@/components/molecules"
import { AchievementCardProps } from "@/components/molecules"
import { QuickActions } from "@/components/dashboard/QuickActions"

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
    <Container>
      <div className="mb-8">
        <Text variant="h1" size="3xl" weight="bold" orbitron glow className="mb-2">
          Mission Control
        </Text>
        <Text color="muted" mono>
          Track your progress and continue your hacking journey
        </Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <StatsGrid stats={stats} />
          <MissionList missions={missions} />
          <AchievementList achievements={achievements} />
        </div>

        {/* Sidebar - Right Side (1/3 width on desktop) */}
        <div className="space-y-6">
          <ProfileCard {...profileData} />
          <QuickActions />
        </div>
      </div>
    </Container>
  )
}
