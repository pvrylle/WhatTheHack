import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export type IconSize = "xs" | "sm" | "base" | "lg" | "xl"

export type IconColor = 
  | "primary" 
  | "secondary" 
  | "accent" 
  | "success" 
  | "destructive" 
  | "muted" 
  | "foreground"

interface IconProps {
  icon: LucideIcon
  size?: IconSize
  color?: IconColor
  className?: string
}

const sizeClasses: Record<IconSize, string> = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  base: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
}

const colorClasses: Record<IconColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  success: "text-success",
  destructive: "text-destructive",
  muted: "text-muted-foreground",
  foreground: "text-foreground",
}

export const Icon = ({
  icon: IconComponent,
  size = "base",
  color = "foreground",
  className,
}: IconProps) => {
  const classes = cn(
    sizeClasses[size],
    colorClasses[color],
    className
  )

  return <IconComponent className={classes} />
}
