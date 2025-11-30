/**
 * Authentication Cookie Utilities
 * 
 * This module provides utilities for managing authentication cookies
 * that work with the Next.js middleware for route protection.
 */

const AUTH_COOKIE_NAME = 'whathehack_auth'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days in seconds

/**
 * Set the authentication cookie when user logs in
 */
export function setAuthCookie(userId: string): void {
  if (typeof document === 'undefined') return
  
  const expires = new Date()
  expires.setTime(expires.getTime() + COOKIE_MAX_AGE * 1000)
  
  document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(userId)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`
}

/**
 * Remove the authentication cookie when user logs out
 */
export function removeAuthCookie(): void {
  if (typeof document === 'undefined') return
  
  document.cookie = `${AUTH_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
}

/**
 * Check if the auth cookie exists
 */
export function hasAuthCookie(): boolean {
  if (typeof document === 'undefined') return false
  
  return document.cookie.split(';').some(cookie => 
    cookie.trim().startsWith(`${AUTH_COOKIE_NAME}=`)
  )
}

/**
 * Get the user ID from the auth cookie
 */
export function getAuthCookieValue(): string | null {
  if (typeof document === 'undefined') return null
  
  const cookie = document.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${AUTH_COOKIE_NAME}=`))
  
  if (!cookie) return null
  
  const value = cookie.split('=')[1]
  return value ? decodeURIComponent(value) : null
}
