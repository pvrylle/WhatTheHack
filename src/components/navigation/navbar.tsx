'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Home,
  Target,
  Trophy,
  BookOpen,
  Settings,
  Menu,
  LogIn,
  LogOut,
  User,
  ChevronDown,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/components/providers/auth-provider'

export const Navigation = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { isLoggedIn, logout, user } = useAuth()

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  const publicNavigation = [{ name: 'Home', href: '/', icon: Home }]

  const privateNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Target },
    { name: 'Missions', href: '/learning-paths', icon: BookOpen },
    { name: 'Achievements', href: '/achievements', icon: Trophy },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/98 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Image
                src="/logo-wth 1.svg"
                alt="WhatTheHack Logo"
                width={32}
                height={32}
                className="transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <span className="font-orbitron font-bold text-xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
              WhatTheHack
            </span>
          </Link>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 px-3 gap-2.5 hover:bg-muted/50"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-1 ring-primary/20">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium leading-none">{user?.username}</span>
                        <span className="text-[10px] text-muted-foreground leading-none mt-0.5">
                          {user?.rank}
                        </span>
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuLabel className="font-mono p-0">
                      <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">{user?.username}</div>
                          <div className="text-xs text-muted-foreground truncate mt-0.5">
                            {user?.email}
                          </div>
                          <Badge
                            variant="outline"
                            className="mt-2 text-xs border-primary/30 text-primary"
                          >
                            {user?.rank}
                          </Badge>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1.5">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 px-2">
                        Navigation
                      </div>
                    </div>
                    {privateNavigation.map((item) => {
                      const Icon = item.icon
                      return (
                        <DropdownMenuItem
                          key={item.name}
                          asChild
                          className={`font-mono cursor-pointer ${
                            isActive(item.href) ? 'bg-muted' : ''
                          }`}
                        >
                          <Link href={item.href} className="flex items-center gap-2.5 w-full py-2">
                            <Icon className="w-4 h-4" />
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      )
                    })}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="font-mono cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 py-2"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Button
                  asChild
                  variant="default"
                  size="sm"
                  className="font-mono bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg hover:scale-105 transition-all px-5 font-semibold"
                >
                  <Link href="/auth" className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    <span>Get Started</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader className="mb-6 pb-4 border-b">
                  <div className="flex items-center gap-2.5">
                    <Image src="/logo-wth 1.svg" alt="WhatTheHack Logo" width={28} height={28} />
                    <SheetTitle className="font-orbitron font-bold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      WhatTheHack
                    </SheetTitle>
                  </div>
                </SheetHeader>

                {isLoggedIn ? (
                  <>
                    {/* User Profile */}
                    <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-mono font-semibold text-sm truncate">
                            {user?.username}
                          </div>
                          <div className="font-mono text-xs text-muted-foreground truncate mt-0.5">
                            {user?.email}
                          </div>
                          <Badge
                            variant="outline"
                            className="mt-2 text-xs border-primary/30 text-primary"
                          >
                            {user?.rank}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-1 mb-4">
                      {privateNavigation.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                              isActive(item.href)
                                ? 'bg-background text-foreground shadow-sm border border-border/50'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span>{item.name}</span>
                          </Link>
                        )
                      })}
                    </nav>

                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="w-full justify-start font-mono text-destructive border-destructive/30 hover:bg-destructive/10"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="pt-2">
                      <Button
                        asChild
                        variant="default"
                        className="w-full justify-center font-mono bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all py-6 text-base"
                      >
                        <Link
                          href="/auth"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2"
                        >
                          <LogIn className="w-5 h-5" />
                          <span>Get Started</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
