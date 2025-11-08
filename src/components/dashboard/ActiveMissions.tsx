import { Target, Clock, Award, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Mission {
  id: number;
  title: string;
  progress: number;
  reward: string;
  difficulty: string;
  timeLeft: string;
}

interface ActiveMissionsProps {
  missions: Mission[];
}

export const ActiveMissions = ({ missions }: ActiveMissionsProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-success border-success/20';
      case 'medium':
        return 'text-secondary border-secondary/20';
      case 'hard':
        return 'text-destructive border-destructive/20';
      default:
        return 'text-muted-foreground border-muted/20';
    }
  };

  return (
    <Card className="border-0 bg-card/50">
      <CardHeader className="pb-6">
        <CardTitle className="font-orbitron text-xl text-foreground flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Active Missions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="border border-border rounded-lg p-6 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-orbitron font-medium text-lg text-foreground mb-3">
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