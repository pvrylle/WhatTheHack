import { StatCard, StatCardProps } from "@/components/molecules"

export interface StatsGridProps {
  stats: StatCardProps[]
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
