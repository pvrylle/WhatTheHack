'use client'

import { useState } from 'react'
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Lock,
  Camera,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Container, Text } from '@/components/atoms'

export default function SettingsContent() {
  const [activeSection, setActiveSection] = useState('profile')

  const sections = [
    { id: 'profile', label: 'Agent Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'missions', label: 'Mission Preferences', icon: Globe },
  ]

  return (
    <Container>
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-primary/15 border border-primary/25">
            <SettingsIcon className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>
          <Text variant="h1" size="3xl" weight="bold" orbitron glow>
            Settings
          </Text>
        </div>
        <Text color="muted" mono size="lg">
          Configure your agent profile and mission preferences
        </Text>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <nav aria-label="Settings navigation">
          <Card className="lg:col-span-1 h-fit border-border/50 bg-card/80 backdrop-blur">
            <CardContent className="p-6">
              <ul className="space-y-2" role="list">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors font-mono ${
                          activeSection === section.id
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        aria-current={activeSection === section.id ? 'page' : undefined}
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                        {section.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        </nav>

        {/* Settings Content */}
        <main className="lg:col-span-3 space-y-6">
          {activeSection === 'profile' && (
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                    <User className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="font-orbitron text-xl">Agent Profile</CardTitle>
                </div>
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
                      aria-label="Change profile picture"
                    >
                      <Camera className="w-4 h-4" aria-hidden="true" />
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
                      aria-describedby="rank-description"
                    />
                    <span id="rank-description" className="sr-only">This field is read-only</span>
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization" className="font-mono">
                    Primary Specialization
                  </Label>
                  <Select defaultValue="web-security">
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

          {activeSection === 'notifications' && (
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/20 border border-accent/30">
                    <Bell className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>
                  <CardTitle className="font-orbitron text-xl">Notification Preferences</CardTitle>
                </div>
                <CardDescription className="font-mono">
                  Control when and how you receive mission updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <fieldset className="space-y-4">
                  <legend className="sr-only">Notification settings</legend>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="mission-completions" className="font-mono">Mission Completions</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        Get notified when missions are completed
                      </p>
                    </div>
                    <Switch id="mission-completions" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-achievements" className="font-mono">New Achievements</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        Celebrate your hacking milestones
                      </p>
                    </div>
                    <Switch id="new-achievements" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="leaderboard-updates" className="font-mono">Leaderboard Updates</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        Weekly ranking changes
                      </p>
                    </div>
                    <Switch id="leaderboard-updates" />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="security-alerts" className="font-mono">Security Alerts</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        Important platform security updates
                      </p>
                    </div>
                    <Switch id="security-alerts" defaultChecked />
                  </div>
                </fieldset>
              </CardContent>
            </Card>
          )}

          {activeSection === 'privacy' && (
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-success/20 border border-success/30">
                    <Shield className="w-5 h-5 text-success" aria-hidden="true" />
                  </div>
                  <CardTitle className="font-orbitron text-xl">Privacy & Security</CardTitle>
                </div>
                <CardDescription className="font-mono">
                  Protect your agent identity and mission data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <fieldset className="space-y-4">
                  <legend className="sr-only">Privacy settings</legend>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="profile-visibility" className="font-mono">Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        Make your profile visible to other agents
                      </p>
                    </div>
                    <Switch id="profile-visibility" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="mission-history" className="font-mono">Mission History</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        Show completed missions on profile
                      </p>
                    </div>
                    <Switch id="mission-history" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="anonymous-mode" className="font-mono">Anonymous Mode</Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        Hide your identity in leaderboards
                      </p>
                    </div>
                    <Switch id="anonymous-mode" />
                  </div>
                </fieldset>

                <section className="space-y-4 pt-4">
                  <h4 className="font-medium flex items-center gap-2 font-mono">
                    <Lock className="w-4 h-4" aria-hidden="true" />
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
                </section>
              </CardContent>
            </Card>
          )}

          {activeSection === 'appearance' && (
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-secondary/20 border border-secondary/30">
                    <Palette className="w-5 h-5 text-secondary" aria-hidden="true" />
                  </div>
                  <CardTitle className="font-orbitron text-xl">Appearance</CardTitle>
                </div>
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
                  <Label htmlFor="density" className="font-mono">
                    Interface Density
                  </Label>
                  <Select defaultValue="comfortable">
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
                  <Label htmlFor="animation" className="font-mono">
                    Animation Speed
                  </Label>
                  <Select defaultValue="normal">
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

          {activeSection === 'missions' && (
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                    <Globe className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="font-orbitron text-xl">Mission Preferences</CardTitle>
                </div>
                <CardDescription className="font-mono">
                  Configure your mission recommendations and difficulty settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="font-mono">
                    Preferred Difficulty
                  </Label>
                  <Select defaultValue="mixed">
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

                <fieldset className="space-y-2">
                  <legend className="font-mono text-sm font-medium">Mission Categories</legend>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {[
                      'Web Security',
                      'Network Security',
                      'Cryptography',
                      'Forensics',
                      'Reverse Engineering',
                      'Social Engineering',
                    ].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={category.toLowerCase().replace(' ', '-')}
                          defaultChecked
                          className="rounded"
                        />
                        <Label htmlFor={category.toLowerCase().replace(' ', '-')} className="text-sm font-mono">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-accept" className="font-mono">Auto-Accept Missions</Label>
                    <p className="text-sm text-muted-foreground font-mono">
                      Automatically join recommended missions
                    </p>
                  </div>
                  <Switch id="auto-accept" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mission-reminders" className="font-mono">Mission Reminders</Label>
                    <p className="text-sm text-muted-foreground font-mono">
                      Get reminded about active missions
                    </p>
                  </div>
                  <Switch id="mission-reminders" defaultChecked />
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </Container>
  )
}
