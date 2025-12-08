'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Terminal,
  Shield,
  Zap,
  Lock,
  Mail,
  User,
  Fingerprint,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/components/providers/auth-provider'
import { cn } from '@/lib/utils'
import { z } from 'zod'

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type LoginFormData = z.infer<typeof loginSchema>
type SignupFormData = z.infer<typeof signupSchema>

const getPasswordStrength = (
  password: string
): { strength: number; label: string; color: string } => {
  if (!password) return { strength: 0, label: '', color: '' }

  let strength = 0
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  if (strength <= 2) return { strength, label: 'Weak', color: 'text-destructive' }
  if (strength <= 4) return { strength, label: 'Medium', color: 'text-warning' }
  return { strength, label: 'Strong', color: 'text-primary' }
}

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [mounted, setMounted] = useState(false)

  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({})
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({})
  const [signupTouched, setSignupTouched] = useState<Record<string, boolean>>({})
  const [passwordStrength, setPasswordStrength] = useState({ strength: 0, label: '', color: '' })
  const [passwordValue, setPasswordValue] = useState('')

  const { login, signup } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoginErrors({})

    const formData = new FormData(e.target as HTMLFormElement)
    const data: LoginFormData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    const result = loginSchema.safeParse(data)
    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message
        }
      })
      setLoginErrors(errors)
      return
    }

    setIsLoading(true)
    const authResult = await login(data.email, data.password)

    if (authResult.success) {
      setSuccess('Access granted! Redirecting...')
      setTimeout(() => router.push('/dashboard'), 1000)
    } else {
      setError(authResult.error || 'Authentication failed')
    }

    setIsLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSignupErrors({})

    const formData = new FormData(e.target as HTMLFormElement)
    const data: SignupFormData = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    }

    const result = signupSchema.safeParse(data)
    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message
        }
      })
      setSignupErrors(errors)
      return
    }

    setIsLoading(true)
    const authResult = await signup(data.username, data.email, data.password)

    if (authResult.success) {
      setSuccess('Account created! Redirecting...')
      setTimeout(() => router.push('/dashboard'), 1000)
    } else {
      setError(authResult.error || 'Registration failed')
    }

    setIsLoading(false)
  }

  const handlePasswordChange = (password: string) => {
    setPasswordValue(password)
    setPasswordStrength(getPasswordStrength(password))
  }



  return (
    <div className="min-h-screen h-screen bg-background flex relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 diagonal-stripes opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 rounded-full blur-[100px] md:blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-accent/10 rounded-full blur-[80px] md:blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Scan Lines Effect */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] pointer-events-none" />

      {/* Left Panel - Branding (Hidden on mobile/tablet) */}
      <div className="hidden xl:flex xl:w-1/2 relative items-center justify-center p-8 2xl:p-12">
        <div className="relative z-10 max-w-md">
          {/* Logo + Title */}
          <div className="mb-8 2xl:mb-10">
            <div className="flex items-center gap-3 mb-4 2xl:mb-5">
              <div className="relative w-12 h-12 2xl:w-14 2xl:h-14 flex-shrink-0">
                <div className="absolute inset-0 bg-primary/30 rounded-xl blur-lg animate-pulse" />
                <Image
                  src="/logo-wth 1.svg"
                  alt="WhatTheHack"
                  width={48}
                  height={48}
                  className="relative drop-shadow-[0_0_20px_hsl(var(--primary)/0.6)] 2xl:w-14 2xl:h-14"
                  priority
                />
              </div>
              <h1 className="text-3xl 2xl:text-4xl font-orbitron font-black tracking-tight text-foreground glow-text">
                WHAT<span className="text-primary dark:text-accent">THE</span>HACK
              </h1>
            </div>
            <p className="text-base 2xl:text-lg text-muted-foreground font-mono">
              Master the Art of Ethical Hacking
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-3 2xl:space-y-4">
            {[
              { icon: Shield, title: 'Learn Security', desc: 'Real-world vulnerability training' },
              { icon: Zap, title: 'Earn XP', desc: 'Level up with every challenge' },
              { icon: Terminal, title: 'Hands-On Labs', desc: 'Interactive hacking environments' },
            ].map((feature, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 2xl:gap-4 p-3 2xl:p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-300"
              >
                <div className="p-2.5 2xl:p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-colors">
                  <feature.icon className="w-4 h-4 2xl:w-5 2xl:h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm 2xl:text-base">{feature.title}</h3>
                  <p className="text-xs 2xl:text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-6 2xl:bottom-8 left-8 right-8 flex items-center gap-2 text-muted-foreground font-mono text-[10px] 2xl:text-xs">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>system status: operational</span>
          <span className="mx-2">|</span>
          <span>latency: 12ms</span>
          <span className="mx-2">|</span>
          <span>encryption: AES-256</span>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full xl:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12">
        <div className="w-full max-w-sm sm:max-w-md relative z-10">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-3 sm:mb-4 lg:mb-6 font-mono text-xs sm:text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Auth Card */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 rounded-2xl blur-xl opacity-50" />
            
            <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-4 sm:p-5 lg:p-6 shadow-2xl">
              {/* Header */}
              <div className="mb-3 sm:mb-4 lg:mb-5">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                    <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] sm:text-xs text-primary font-mono uppercase tracking-wider">
                        {activeTab === 'login' ? 'Secure Terminal' : 'New Agent Registration'}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg lg:text-xl font-orbitron font-bold text-foreground">
                      {activeTab === 'login' ? 'Access Portal' : 'Join the Network'}
                    </h2>
                  </div>
                </div>
                <p className="text-muted-foreground font-mono text-[10px] sm:text-xs pl-10 sm:pl-[52px]">
                  {activeTab === 'login' 
                    ? 'Authenticate to access your dashboard' 
                    : 'Create your agent profile to begin'}
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="flex p-0.5 sm:p-1 bg-muted/30 rounded-lg sm:rounded-xl mb-3 sm:mb-4 border border-border/50">
                {(['login', 'signup'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      'flex-1 py-1.5 sm:py-2 text-xs sm:text-sm font-mono font-medium rounded-md sm:rounded-lg transition-all duration-300',
                      activeTab === tab
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {tab === 'login' ? 'Sign In' : 'Sign Up'}
                  </button>
                ))}
              </div>



              {/* Error/Success Messages */}
              {error && (
                <div className="mb-3 sm:mb-4 flex items-center gap-2 p-2.5 sm:p-3 rounded-lg border border-destructive/30 bg-destructive/10">
                  <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive flex-shrink-0" />
                  <span className="font-mono text-[10px] sm:text-xs text-destructive">{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-3 sm:mb-4 flex items-center gap-2 p-2.5 sm:p-3 rounded-lg border border-primary/30 bg-primary/10">
                  <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                  <span className="font-mono text-[10px] sm:text-xs text-primary">{success}</span>
                </div>
              )}

              {/* Login Form */}
              {activeTab === 'login' && (
                <form onSubmit={handleLogin} className="space-y-2.5 sm:space-y-3 lg:space-y-4">
                  <div className="space-y-1 sm:space-y-1.5">
                    <Label htmlFor="email" className="text-[10px] sm:text-xs font-medium text-muted-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/50" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className={cn(
                          'pl-8 sm:pl-10 h-9 sm:h-10 bg-input/50 border-border rounded-lg sm:rounded-xl font-mono text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50',
                          'focus:border-primary/50 focus:ring-primary/20 focus:bg-input',
                          'transition-all duration-300',
                          loginErrors.email && 'border-destructive/50'
                        )}
                      />
                    </div>
                    {loginErrors.email && (
                      <p className="text-[10px] text-red-400 font-mono flex items-center gap-1">
                        <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {loginErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 sm:space-y-1.5">
                    <Label htmlFor="password" className="text-[10px] sm:text-xs font-medium text-muted-foreground">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/50" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className={cn(
                          'pl-8 sm:pl-10 pr-8 sm:pr-10 h-9 sm:h-10 bg-input/50 border-border rounded-lg sm:rounded-xl font-mono text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50',
                          'focus:border-primary/50 focus:ring-primary/20 focus:bg-input',
                          'transition-all duration-300',
                          loginErrors.password && 'border-destructive/50'
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button type="button" className="text-[10px] sm:text-xs text-muted-foreground hover:text-primary font-mono transition-colors">
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-9 sm:h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span className="text-xs">Authenticating...</span>
                      </div>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Fingerprint className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Access Terminal
                      </span>
                    )}
                  </Button>
                </form>
              )}

              {/* Signup Form */}
              {activeTab === 'signup' && (
                <form onSubmit={handleSignup} data-form="signup" className="space-y-2 sm:space-y-2.5 lg:space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="username" className="text-[10px] sm:text-xs font-medium text-muted-foreground">
                      Agent Codename
                    </Label>
                    <div className="relative">
                      <User className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/50" />
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="CyberNinja42"
                        className={cn(
                          'pl-8 sm:pl-10 h-9 sm:h-10 bg-input/50 border-border rounded-lg sm:rounded-xl font-mono text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50',
                          'focus:border-primary/50 focus:ring-primary/20 focus:bg-input',
                          'transition-all duration-300',
                          signupErrors.username && 'border-destructive/50'
                        )}
                      />
                    </div>
                    {signupErrors.username && (
                      <p className="text-[10px] text-red-400 font-mono">{signupErrors.username}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="signup-email" className="text-[10px] sm:text-xs font-medium text-muted-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/50" />
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="agent@whatthehack.dev"
                        className={cn(
                          'pl-8 sm:pl-10 h-9 sm:h-10 bg-input/50 border-border rounded-lg sm:rounded-xl font-mono text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50',
                          'focus:border-primary/50 focus:ring-primary/20 focus:bg-input',
                          'transition-all duration-300',
                          signupErrors.email && 'border-destructive/50'
                        )}
                      />
                    </div>
                    {signupErrors.email && (
                      <p className="text-[10px] text-red-400 font-mono">{signupErrors.email}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="signup-password" className="text-[10px] sm:text-xs font-medium text-muted-foreground">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/50" />
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        className={cn(
                          'pl-8 sm:pl-10 pr-8 sm:pr-10 h-9 sm:h-10 bg-input/50 border-border rounded-lg sm:rounded-xl font-mono text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50',
                          'focus:border-primary/50 focus:ring-primary/20 focus:bg-input',
                          'transition-all duration-300',
                          signupErrors.password && 'border-destructive/50'
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      </button>
                    </div>
                    {passwordStrength.label && (
                      <div className="flex items-center justify-between">
                        <span className={cn('text-[10px] font-mono', passwordStrength.color)}>
                          {passwordStrength.label}
                        </span>
                        <div className="flex gap-0.5">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className={cn(
                                'h-0.5 sm:h-1 w-3 sm:w-4 rounded-full transition-all',
                                i < passwordStrength.strength
                                  ? passwordStrength.strength <= 2
                                    ? 'bg-destructive'
                                    : passwordStrength.strength <= 4
                                      ? 'bg-warning'
                                      : 'bg-primary'
                                  : 'bg-muted'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {signupErrors.password && (
                      <p className="text-[10px] text-red-400 font-mono">{signupErrors.password}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="confirmPassword" className="text-[10px] sm:text-xs font-medium text-muted-foreground">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/50" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className={cn(
                          'pl-8 sm:pl-10 pr-8 sm:pr-10 h-9 sm:h-10 bg-input/50 border-border rounded-lg sm:rounded-xl font-mono text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50',
                          'focus:border-primary/50 focus:ring-primary/20 focus:bg-input',
                          'transition-all duration-300',
                          signupErrors.confirmPassword && 'border-destructive/50'
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      </button>
                    </div>
                    {signupErrors.confirmPassword && (
                      <p className="text-[10px] text-red-400 font-mono">{signupErrors.confirmPassword}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-9 sm:h-10 bg-accent hover:bg-accent/90 text-accent-foreground font-mono text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl shadow-lg shadow-accent/25 transition-all duration-300 hover:shadow-accent/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="text-xs">Creating Account...</span>
                      </div>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Initialize Agent
                      </span>
                    )}
                  </Button>

                  <p className="text-center text-[9px] sm:text-[10px] text-muted-foreground font-mono">
                    By signing up, you agree to our{' '}
                    <Link href="#" className="text-primary hover:underline">Terms</Link>
                    {' '}and{' '}
                    <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Terminal Status Bar */}
          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 sm:gap-3 text-muted-foreground font-mono text-[9px] sm:text-[10px]">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <div className={cn(
                'w-1.5 h-1.5 rounded-full',
                isLoading ? 'bg-warning animate-pulse' : success ? 'bg-primary' : 'bg-primary/50'
              )} />
              <span>
                {isLoading ? 'processing...' : success ? 'authenticated' : 'ready'}
              </span>
            </div>
            <span className="text-gray-700">|</span>
            <span>TLS 1.3</span>
            <span className="text-gray-700 hidden sm:inline">|</span>
            <span className="hidden sm:inline">v2.0.1</span>
          </div>
        </div>
      </div>
    </div>
  )
}
