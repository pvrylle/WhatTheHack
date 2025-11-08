"use client"

import { Navigation } from "@/components/navigation/navbar"
import { useAuth } from "@/components/providers/auth-provider"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to auth page if not logged in
      router.push("/auth")
    }
  }, [isLoggedIn, router, pathname])

  // Don't render dashboard content if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-muted-foreground">Verifying credentials...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {children}
      </main>
    </>
  )
}

