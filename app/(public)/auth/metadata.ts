import { generatePageMetadata } from '@/lib/seo'

export const metadata = generatePageMetadata({
  title: 'Sign In',
  description: 'Access your WhatTheHack account. Sign in or create a new account to start your cybersecurity learning journey.',
  keywords: ['login', 'sign in', 'register', 'account', 'authentication'],
  path: '/auth',
})
