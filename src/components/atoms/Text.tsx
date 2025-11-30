import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label'

export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold'

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'destructive'
  | 'muted'
  | 'foreground'

export interface TextProps {
  variant?: TextVariant
  size?: TextSize
  weight?: TextWeight
  color?: TextColor
  className?: string
  children: ReactNode
  glow?: boolean
  mono?: boolean
  orbitron?: boolean
  id?: string
}

const sizeClasses: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
}

const weightClasses: Record<TextWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const colorClasses: Record<TextColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  success: 'text-success',
  destructive: 'text-destructive',
  muted: 'text-muted-foreground',
  foreground: 'text-foreground',
}

export const Text = ({
  variant = 'p',
  size = 'base',
  weight = 'normal',
  color = 'foreground',
  className,
  children,
  glow = false,
  mono = false,
  orbitron = false,
  id,
}: TextProps) => {
  const Component = variant

  const classes = cn(
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[color],
    glow && 'glow-text',
    mono && 'font-mono',
    orbitron && 'font-orbitron',
    className
  )

  return <Component className={classes} id={id}>{children}</Component>
}
