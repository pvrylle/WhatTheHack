import { Trophy, Star, Crown, Medal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: number;
  title: string;
  description: string;
  earned: string;
  rarity: string;
}

interface RecentAchievementsProps {
  achievements: Achievement[];
}

export const RecentAchievements = ({ achievements }: RecentAchievementsProps) => {
  const getRarityIcon = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common':
        return <Medal className="w-4 h-4" />;
      case 'uncommon':
        return <Star className="w-4 h-4" />;
      case 'rare':
        return <Trophy className="w-4 h-4" />;
      case 'legendary':
        return <Crown className="w-4 h-4" />;
      default:
        return <Medal className="w-4 h-4" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common':
        return 'text-muted-foreground';
      case 'uncommon':
        return 'text-success';
      case 'rare':
        return 'text-secondary';
      case 'legendary':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className="border-0 bg-card/50">
      <CardHeader className="pb-6">
        <CardTitle className="font-orbitron text-xl text-foreground flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Recent Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-start gap-4 py-4 border-b border-border last:border-b-0"
            >
              <div className={`${getRarityColor(achievement.rarity)} p-3 border border-current/20 rounded-lg`}>
                {getRarityIcon(achievement.rarity)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-orbitron font-medium text-lg text-foreground">
                    {achievement.title}
                  </h4>
                  <Badge 
                    variant="outline" 
                    className={`${getRarityColor(achievement.rarity)} border-current/20 font-mono text-xs ml-3`}
                  >
                    {achievement.rarity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {achievement.description}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {achievement.earned}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};