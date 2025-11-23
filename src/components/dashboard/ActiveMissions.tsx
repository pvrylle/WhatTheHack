import { MissionList } from '@/components/organisms'

interface Mission {
  id: number
  title: string
  progress: number
  reward: string
  difficulty: string
  timeLeft: string
}

interface ActiveMissionsProps {
  missions: Mission[]
}

export const ActiveMissions = ({ missions }: ActiveMissionsProps) => {
  return <MissionList missions={missions} />
}
