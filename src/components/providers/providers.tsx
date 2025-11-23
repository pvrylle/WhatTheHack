'use client'

import type { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import { AuthProvider } from './auth-provider'
import { QueryProvider } from './query-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

/**
 * Root providers component
 * Wraps the entire application with all required providers
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <QueryProvider>
          <TooltipProvider>
            {children}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
