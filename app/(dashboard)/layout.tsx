'use client'

import { Navigation } from '@/components/navigation'
import { useAuth } from '@/components/providers/auth-provider'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/auth')
    }
  }, [isLoggedIn, isLoading, router, pathname])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-muted-foreground">Verifying credentials...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">{children}</main>
    </>
  )
}
