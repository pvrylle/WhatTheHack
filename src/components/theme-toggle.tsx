"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative group hover:bg-accent/20 border border-border/50 hover:border-accent/50 transition-all duration-300"
      >
        {theme === "dark" ? (
          <div className="relative">
            <Moon className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
          </div>
        ) : (
          <div className="relative">
            <Sun className="h-5 w-5 text-accent group-hover:text-muted-foreground transition-colors animate-spin" style={{ animationDuration: '8s' }} />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Badge 
        variant="outline" 
        className={`font-mono text-xs border transition-all duration-300 ${
          theme === "dark" 
            ? "bg-primary/10 text-primary border-primary/30" 
            : "bg-accent/10 text-accent border-accent/30"
        }`}
      >
        {theme === "dark" ? "▸ STEALTH MODE" : "▸ DAY SHIFT"}
      </Badge>
    </div>
  )
}
