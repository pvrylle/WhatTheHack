import { AchievementList } from '@/components/organisms'

interface Achievement {
  id: number
  title: string
  description: string
  earned: string
  rarity: string
}

interface RecentAchievementsProps {
  achievements: Achievement[]
}

export const RecentAchievements = ({ achievements }: RecentAchievementsProps) => {
  return <AchievementList achievements={achievements} />
}
