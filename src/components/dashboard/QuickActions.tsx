import Link from 'next/link'
import { Zap, Trophy, Users, BarChart3, Settings, Play } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

export const QuickActions = () => {
  const actions = [
    {
      icon: Play,
      label: 'Start',
      color: 'bg-primary/10 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground',
      href: ROUTES.DASHBOARD.LEARNING_PATHS,
    },
    {
      icon: Trophy,
      label: 'Rank',
      color: 'bg-secondary/10 border-secondary/20 text-secondary hover:bg-secondary hover:text-secondary-foreground',
      href: ROUTES.DASHBOARD.ACHIEVEMENTS,
    },
    {
      icon: Users,
      label: 'Team',
      color: 'bg-accent/10 border-accent/20 text-accent hover:bg-accent hover:text-accent-foreground',
      href: '#',
    },
    {
      icon: BarChart3,
      label: 'Stats',
      color: 'bg-success/10 border-success/20 text-success hover:bg-success hover:text-success-foreground',
      href: ROUTES.DASHBOARD.HOME,
    },
    {
      icon: Settings,
      label: 'Config',
      color: 'bg-muted border-border text-muted-foreground hover:bg-muted-foreground hover:text-muted',
      href: ROUTES.DASHBOARD.SETTINGS,
    },
  ]

  return (
    <Card className="border-0 bg-card/50">
      <CardHeader className="pb-3 pt-4 px-4">
        <CardTitle className="font-orbitron text-base text-foreground flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="grid grid-cols-5 gap-2">
          {actions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-lg border transition-all',
                action.color
              )}
            >
              <action.icon className="w-4 h-4 mb-1" />
              <span className="text-[9px] font-mono font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
