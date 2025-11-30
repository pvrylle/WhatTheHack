import { ProfileCard } from '@/components/organisms'

interface AgentProfileProps {
  userStats: {
    level: number
    xp: number
    xpToNext: number
    hacksCompleted: number
    streakDays: number
    rank: string
    totalPoints: number
  }
}

export const AgentProfile = ({ userStats }: AgentProfileProps) => {
  return (
    <ProfileCard
      rank={userStats.rank}
      level={userStats.level}
      xp={userStats.xp}
      xpToNext={userStats.xpToNext}
      hacksCompleted={userStats.hacksCompleted}
      streakDays={userStats.streakDays}
      totalPoints={userStats.totalPoints}
    />
  )
}
