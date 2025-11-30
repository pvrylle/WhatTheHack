import { Trophy, Zap, Target, Calendar, TrendingUp } from 'lucide-react'

interface StatsOverviewProps {
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

export const StatsOverview = ({ userStats }: StatsOverviewProps) => {
  const stats = [
    {
      label: 'Level',
      value: userStats.level,
      icon: TrendingUp,
      color: 'text-primary',
    },
    {
      label: 'Total XP',
      value: userStats.xp.toLocaleString(),
      icon: Zap,
      color: 'text-secondary',
    },
    {
      label: 'Hacks Completed',
      value: userStats.hacksCompleted,
      icon: Target,
      color: 'text-success',
    },
    {
      label: 'Streak Days',
      value: userStats.streakDays,
      icon: Calendar,
      color: 'text-accent',
    },
    {
      label: 'Total Points',
      value: (userStats.totalPoints / 1000).toFixed(1) + 'K',
      icon: Trophy,
      color: 'text-primary',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="flex items-center justify-center mb-3">
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <div className={`text-3xl font-orbitron font-medium ${stat.color} mb-1`}>
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground font-mono">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
