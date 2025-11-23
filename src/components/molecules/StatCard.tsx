import { memo, useMemo } from 'react'
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

export const StatCard = memo(({
  label,
  value,
  icon: IconComponent,
  color = 'primary',
}: StatCardProps) => {
  const iconClassName = useMemo(() => cn('w-5 h-5', colorClasses[color]), [color])
  const valueClassName = useMemo(() => cn('text-3xl font-orbitron font-medium mb-1', colorClasses[color]), [color])

  return (
    <div className="text-center" role="region" aria-label={`${label}: ${value}`}>
      <div className="flex items-center justify-center mb-3" aria-hidden="true">
        <IconComponent className={iconClassName} />
      </div>
      <div className={valueClassName} aria-label={String(value)}>
        {value}
      </div>
      <Text size="sm" color="muted" mono>
        {label}
      </Text>
    </div>
  )
})

StatCard.displayName = 'StatCard'
