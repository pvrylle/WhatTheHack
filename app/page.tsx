"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Shield, Target, Trophy, ChevronRight, Terminal, Code, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation/navbar";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const fullText = "INITIATING HACK SEQUENCE...";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Target,
      title: "Hacking Missions",
      description: "Complete real-world cybersecurity challenges and learn penetration testing",
      color: "primary",
    },
    {
      icon: Shield,
      title: "Security Training",
      description: "Master defensive techniques and understand how to protect systems",
      color: "secondary",
    },
    {
      icon: Lock,
      title: "Cryptography",
      description: "Break encryption algorithms and learn the art of digital forensics",
      color: "accent",
    },
  ];

  const stats = [
    { label: "Active Hackers", value: "12,547", icon: Terminal },
    { label: "Challenges Solved", value: "89,234", icon: Code },
    { label: "XP Earned", value: "2.1M", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 diagonal-stripes opacity-30" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-mono mb-4">
                ▸ SYSTEM ONLINE
              </Badge>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-orbitron font-black mb-6 text-foreground dark:glow-text glitch">
              WHAT<span className="text-primary dark:text-accent">THE</span>HACK
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground font-mono mb-4">
              Master the Art of Ethical Hacking
            </p>
            
            <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-4 max-w-2xl mx-auto mb-8">
              <div className="font-mono text-primary text-left">
                <span className="text-success">root@whthehack:~$</span> {typedText}
                <span className="animate-pulse">▊</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-primary hover:bg-muted hover:text-muted-foreground text-primary-foreground font-mono px-8">
                <Link href="/auth">
                  <Terminal className="w-5 h-5 mr-2" />
                  Start Debugging
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-secondary/30 text-secondary hover:bg-secondary/10 font-mono px-8">
                <Link href="/learning-paths">
                  <Target className="w-5 h-5 mr-2" />
                  Explore Quests
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-orbitron font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-mono">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-orbitron font-bold glow-text mb-4">
              Choose Your Path
            </h2>
            <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
              From beginner exploits to advanced penetration testing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border/50 bg-card/80 backdrop-blur hover:border-primary/50 transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className={`mx-auto mb-4 p-4 rounded-lg bg-${feature.color}/20 border border-${feature.color}/30 w-fit group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 text-${feature.color}`} />
                    </div>
                    <CardTitle className="font-orbitron text-xl group-hover:text-muted-foreground transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-mono text-center text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-accent/20 bg-gradient-to-r from-card/80 to-card/60 backdrop-blur">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-orbitron font-bold glow-text mb-6">
                Ready to Start Hacking?
              </h3>
              <p className="text-lg text-muted-foreground font-mono mb-8 max-w-2xl mx-auto">
                Join thousands of ethical hackers learning cybersecurity through hands-on challenges
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-mono px-8">
                  <Link href="/dashboard">
                    <Shield className="w-5 h-5 mr-2" />
                    Enter the Matrix
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-muted hover:text-muted-foreground font-mono px-8">
                  <Link href="/achievements">
                    <Trophy className="w-5 h-5 mr-2" />
                    View Leaderboard
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-xl font-orbitron font-bold text-foreground">
                WHAT<span className="text-primary">THE</span>HACK
              </h3>
              <p className="text-sm text-muted-foreground font-mono">
                Master ethical hacking through hands-on cybersecurity challenges and real-world scenarios.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/learning-paths" className="block text-muted-foreground hover:text-primary transition-colors">
                  Learning Paths
                </Link>
                <Link href="/auth" className="block text-muted-foreground hover:text-primary transition-colors">
                  Login / Sign Up
                </Link>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Support
                </a>
              </div>
            </div>

            {/* Challenges */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Challenges</h4>
              <div className="space-y-2 text-sm">
                <Link href="/challenges/web-security" className="block text-muted-foreground hover:text-primary transition-colors">
                  Web Security
                </Link>
                <Link href="/challenges/network-exploitation" className="block text-muted-foreground hover:text-primary transition-colors">
                  Network Security
                </Link>
                <Link href="/challenges/cryptography" className="block text-muted-foreground hover:text-primary transition-colors">
                  Cryptography
                </Link>
                <Link href="/challenges/database-security" className="block text-muted-foreground hover:text-primary transition-colors">
                  Database Security
                </Link>
              </div>
            </div>

            {/* Community */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Community</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Discord Server
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  GitHub
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Support
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground font-mono">
              © 2024 WhatTheHack. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

