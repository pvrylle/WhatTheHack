import { ProfileCard } from "@/components/organisms"

interface AgentProfileProps {
  userStats: {
    level: number
    xp: number
    xpToNext: number
    hacksCompleted: number
    streakDays: number
    rank: string
    totalPoints: number
  }
}

export const AgentProfile = ({ userStats }: AgentProfileProps) => {
  return (
    <ProfileCard
      rank={userStats.rank}
      level={userStats.level}
      xp={userStats.xp}
      xpToNext={userStats.xpToNext}
      hacksCompleted={userStats.hacksCompleted}
      streakDays={userStats.streakDays}
      totalPoints={userStats.totalPoints}
    />
  )
}
        {/* Simple Avatar */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-orbitron font-medium text-xl text-foreground">{userStats.rank}</h3>
          <p className="text-muted-foreground text-sm font-mono flex items-center justify-center gap-1 mt-1">
            <Star className="w-3 h-3" />
            Level {userStats.level}
          </p>
        </div>

        {/* Clean XP Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Experience</span>
            <span className="text-primary font-mono">
              {userStats.xp.toLocaleString()}/{userStats.xpToNext.toLocaleString()}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            {(userStats.xpToNext - userStats.xp).toLocaleString()} XP to next level
          </p>
        </div>

        {/* Clean Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center py-3 border border-secondary/10 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="w-4 h-4 text-secondary" />
              <span className="text-xl font-orbitron font-medium text-secondary">
                {userStats.hacksCompleted}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Hacks</div>
          </div>
          <div className="text-center py-3 border border-accent/10 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-xl font-orbitron font-medium text-accent">
                {Math.round(userStats.totalPoints / 1000)}K
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Points</div>
          </div>
        </div>

        {/* Simple Streak */}
        <div className="text-center py-2 border border-primary/10 rounded-lg">
          <span className="text-primary font-mono text-sm">
            🔥 {userStats.streakDays} day streak
          </span>
        </div>
      </CardContent>
    </Card>
  );
};