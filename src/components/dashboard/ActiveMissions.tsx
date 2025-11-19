import { MissionList } from "@/components/organisms"

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
>
                  {mission.title}
                </h4>
                <div className="flex items-center gap-6 text-sm">
                  <Badge 
                    variant="outline" 
                    className={`${getDifficultyColor(mission.difficulty)} font-mono px-3 py-1`}
                  >
                    {mission.difficulty}
                  </Badge>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono">{mission.timeLeft}</span>
                  </div>
                  <div className="flex items-center gap-2 text-accent">
                    <Award className="w-4 h-4" />
                    <span className="font-mono">{mission.reward}</span>
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground ml-4"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-primary font-mono">{mission.progress}%</span>
              </div>
              <Progress value={mission.progress} className="h-2" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};