"use client"

import { useState } from "react"
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Lock,
  Camera,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile")

  const sections = [
    { id: "profile", label: "Agent Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "missions", label: "Mission Preferences", icon: Globe },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-orbitron font-bold glow-text">
            Settings
          </h1>
        </div>
        <p className="text-muted-foreground font-mono">
          Configure your agent profile and mission preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <Card className="lg:col-span-1 h-fit border-border/50 bg-card/80 backdrop-blur">
          <CardContent className="p-6">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors font-mono ${
                      activeSection === section.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {section.label}
                  </button>
                )
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === "profile" && (
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron">
                  <User className="w-5 h-5" />
                  Agent Profile
                </CardTitle>
                <CardDescription className="font-mono">
                  Manage your agent identity and public information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="" alt="Profile picture" />
                      <AvatarFallback className="text-lg">AN</AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium font-mono">Profile Picture</h4>
                    <p className="text-sm text-muted-foreground font-mono">
                      Upload a profile picture to personalize your agent identity
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="font-mono">
                        Upload Image
                      </Button>
                      <Button variant="ghost" size="sm" className="font-mono">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="codename" className="font-mono">
                      Agent Codename
                    </Label>
                    <Input
                      id="codename"
                      placeholder="CyberAgent007"
                      defaultValue="Anonymous"
                      className="font-mono"
                      aria-label="Agent Codename"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rank" className="font-mono">
                      Current Rank
                    </Label>
                    <Input
                      id="rank"
                      value="Elite Hacker"
                      disabled
                      className="font-mono"
                      aria-label="Current Rank (Read-only)"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="font-mono">
                    Agent Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell other agents about your specialties..."
                    className="min-h-20 font-mono"
                    defaultValue="Specialized in web application security and penetration testing."
                    aria-label="Agent Bio"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization" className="font-mono">
                    Primary Specialization
                  </Label>
                  <Select defaultValue="web-security" aria-label="Primary Specialization">
                    <SelectTrigger className="font-mono" id="specialization">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-security" className="font-mono">
                        Web Application Security
                      </SelectItem>
                      <SelectItem value="network-security" className="font-mono">
                        Network Security
                      </SelectItem>
                      <SelectItem value="malware-analysis" className="font-mono">
                        Malware Analysis
                      </SelectItem>
                      <SelectItem value="forensics" className="font-mono">
                        Digital Forensics
                      </SelectItem>
                      <SelectItem value="social-engineering" className="font-mono">
                        Social Engineering
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="font-mono">Update Profile</Button>
              </CardContent>
            </Card>
          )}

          {activeSection === "notifications" && (
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="font-mono">
                  Control when and how you receive mission updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-mono">Mission Completions</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        Get notified when missions are completed
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-mono">New Achievements</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        Celebrate your hacking milestones
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-mono">Leaderboard Updates</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        Weekly ranking changes
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-mono">Security Alerts</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        Important platform security updates
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "privacy" && (
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron">
                  <Shield className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription className="font-mono">
                  Protect your agent identity and mission data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-mono">Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        Make your profile visible to other agents
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-mono">Mission History</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        Show completed missions on profile
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-mono">Anonymous Mode</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        Hide your identity in leaderboards
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h4 className="font-medium flex items-center gap-2 font-mono">
                    <Lock className="w-4 h-4" />
                    Account Security
                  </h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full font-mono">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full font-mono">
                      Enable Two-Factor Authentication
                    </Button>
                    <Button variant="destructive" className="w-full font-mono">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "appearance" && (
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron">
                  <Palette className="w-5 h-5" />
                  Appearance
                </CardTitle>
                <CardDescription className="font-mono">
                  Customize your agent interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-mono">Theme</Label>
                    <p className="text-sm text-muted-foreground font-mono">
                      Switch between light and dark mode
                    </p>
                  </div>
                  <ThemeToggle />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="density" className="font-mono">Interface Density</Label>
                  <Select defaultValue="comfortable" aria-label="Interface Density">
                    <SelectTrigger className="font-mono" id="density">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact" className="font-mono">
                        Compact
                      </SelectItem>
                      <SelectItem value="comfortable" className="font-mono">
                        Comfortable
                      </SelectItem>
                      <SelectItem value="spacious" className="font-mono">
                        Spacious
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="animation" className="font-mono">Animation Speed</Label>
                  <Select defaultValue="normal" aria-label="Animation Speed">
                    <SelectTrigger className="font-mono" id="animation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fast" className="font-mono">
                        Fast
                      </SelectItem>
                      <SelectItem value="normal" className="font-mono">
                        Normal
                      </SelectItem>
                      <SelectItem value="slow" className="font-mono">
                        Slow
                      </SelectItem>
                      <SelectItem value="disabled" className="font-mono">
                        Disabled
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "missions" && (
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron">
                  <Globe className="w-5 h-5" />
                  Mission Preferences
                </CardTitle>
                <CardDescription className="font-mono">
                  Configure your mission recommendations and difficulty settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="font-mono">Preferred Difficulty</Label>
                  <Select defaultValue="mixed" aria-label="Preferred Difficulty">
                    <SelectTrigger className="font-mono" id="difficulty">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy" className="font-mono">
                        Easy Only
                      </SelectItem>
                      <SelectItem value="medium" className="font-mono">
                        Medium Only
                      </SelectItem>
                      <SelectItem value="hard" className="font-mono">
                        Hard Only
                      </SelectItem>
                      <SelectItem value="mixed" className="font-mono">
                        Mixed Difficulty
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="font-mono">Mission Categories</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2" role="group" aria-label="Mission Categories">
                    {[
                      "Web Security",
                      "Network Security",
                      "Cryptography",
                      "Forensics",
                      "Reverse Engineering",
                      "Social Engineering",
                    ].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={category}
                          defaultChecked
                          className="rounded"
                          aria-label={`Include ${category} missions`}
                        />
                        <Label htmlFor={category} className="text-sm font-mono">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-mono">Auto-Accept Missions</Label>
                    <p className="text-sm text-muted-foreground font-mono">
                      Automatically join recommended missions
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-mono">Mission Reminders</Label>
                    <p className="text-sm text-muted-foreground font-mono">
                      Get reminded about active missions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

