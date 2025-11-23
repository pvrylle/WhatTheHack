import { Text } from '@/components/atoms'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  color?: 'primary' | 'secondary' | 'accent' | 'success'
}

const colorClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  success: 'text-success',
}

export const StatCard = ({
  label,
  value,
  icon: IconComponent,
  color = 'primary',
}: StatCardProps) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-3">
        <IconComponent className={cn('w-5 h-5', colorClasses[color])} />
      </div>
      <div className={cn('text-3xl font-orbitron font-medium mb-1', colorClasses[color])}>
        {value}
      </div>
      <Text size="sm" color="muted" mono>
        {label}
      </Text>
    </div>
  )
}
