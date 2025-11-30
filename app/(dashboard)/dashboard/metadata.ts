import { generatePageMetadata } from '@/lib/seo'

export const metadata = generatePageMetadata({
  title: 'Dashboard',
  description: 'Your WhatTheHack command center. Track your progress, view active missions, recent achievements, and stats.',
  keywords: ['dashboard', 'progress', 'stats', 'missions', 'achievements', 'cybersecurity'],
  path: '/dashboard',
})
