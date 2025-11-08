"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { StatsOverview } from "@/components/dashboard/StatsOverview"
import { ActiveMissions } from "@/components/dashboard/ActiveMissions"
import { AgentProfile } from "@/components/dashboard/AgentProfile"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { RecentAchievements } from "@/components/dashboard/RecentAchievements"

export default function DashboardPage() {
  const { user } = useAuth()

  // Default stats if user is not loaded yet
  const userStats = {
    level: user?.level || 1,
    xp: user?.xp || 0,
    xpToNext: 3000,
    hacksCompleted: 47,
    streakDays: 15,
    rank: user?.rank || "Rookie Hacker",
    totalPoints: 15420,
  }

  const activeQuests = [
    { id: 1, title: "SQL Injection Hunter", progress: 60, reward: "250 XP", difficulty: "Medium", timeLeft: "2h 30m" },
    { id: 2, title: "Buffer Overflow Challenge", progress: 30, reward: "400 XP", difficulty: "Hard", timeLeft: "5h 15m" },
    { id: 3, title: "XSS Detector", progress: 85, reward: "150 XP", difficulty: "Easy", timeLeft: "45m" },
  ]

  const recentAchievements = [
    { id: 1, title: "First Blood", description: "Complete first vulnerability", earned: "2 hours ago", rarity: "Common" },
    { id: 2, title: "Script Kiddie", description: "Complete 10 easy challenges", earned: "1 day ago", rarity: "Uncommon" },
    { id: 3, title: "Database Destroyer", description: "Master SQL injection", earned: "3 days ago", rarity: "Rare" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-orbitron font-bold glow-text mb-2">
          Mission Control
        </h1>
        <p className="text-muted-foreground font-mono">
          Track your progress and continue your hacking journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <StatsOverview userStats={userStats} />
          <ActiveMissions missions={activeQuests} />
          <RecentAchievements achievements={recentAchievements} />
        </div>
        
        {/* Sidebar - Right Side (1/3 width on desktop) */}
        <div className="space-y-6">
          <AgentProfile userStats={userStats} />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}

