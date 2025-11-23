import { Zap, Trophy, Users, BarChart3, Settings, Play } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const QuickActions = () => {
  const actions = [
    {
      icon: Play,
      label: 'Start Challenge',
      color: 'text-primary',
    },
    {
      icon: Trophy,
      label: 'Leaderboard',
      color: 'text-secondary',
    },
    {
      icon: Users,
      label: 'Community',
      color: 'text-accent',
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      color: 'text-success',
    },
    {
      icon: Settings,
      label: 'Settings',
      color: 'text-muted-foreground',
    },
  ]

  return (
    <Card className="border-0 bg-card/50">
      <CardHeader className="pb-4">
        <CardTitle className="font-orbitron text-lg text-foreground flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start py-4 px-4 hover:bg-muted/50"
          >
            <action.icon className={`w-4 h-4 ${action.color} mr-3`} />
            <span className="font-orbitron font-medium text-foreground">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
