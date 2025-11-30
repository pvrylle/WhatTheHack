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

const bgClasses = {
  primary: 'bg-primary/10 border-primary/20',
  secondary: 'bg-secondary/10 border-secondary/20',
  accent: 'bg-accent/10 border-accent/20',
  success: 'bg-success/10 border-success/20',
}

export const StatCard = memo(({
  label,
  value,
  icon: IconComponent,
  color = 'primary',
}: StatCardProps) => {
  const iconClassName = useMemo(() => cn('w-4 h-4', colorClasses[color]), [color])
  const valueClassName = useMemo(() => cn('text-xl sm:text-2xl font-orbitron font-bold', colorClasses[color]), [color])
  const cardClassName = useMemo(() => cn('p-3 sm:p-4 rounded-xl border backdrop-blur-sm', bgClasses[color]), [color])

  return (
    <div className={cardClassName} role="region" aria-label={`${label}: ${value}`}>
      <div className="flex items-center gap-2 mb-2" aria-hidden="true">
        <IconComponent className={iconClassName} />
        <Text size="xs" color="muted" mono className="uppercase tracking-wider">
          {label}
        </Text>
      </div>
      <div className={valueClassName} aria-label={String(value)}>
        {value}
      </div>
    </div>
  )
})

StatCard.displayName = 'StatCard'
