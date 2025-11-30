import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Next.js Middleware for Advanced Routing Logic
 * 
 * Features:
 * - Authentication protection for dashboard routes
 * - Locale-based redirects
 * - Rate limiting headers
 * - Security headers
 */

// Routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/challenges',
  '/achievements',
  '/learning-paths',
  '/settings',
]

// Routes that are only for non-authenticated users
const AUTH_ROUTES = ['/auth']

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/', '/about']

// Cookie name for authentication token
const AUTH_COOKIE_NAME = 'whathehack_auth'

/**
 * Check if the current path matches any protected route
 */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
}

/**
 * Check if the current path is an auth route
 */
function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
}

/**
 * Check if user is authenticated
 * In a real app, this would validate a JWT or session token
 */
function isAuthenticated(request: NextRequest): boolean {
  // Check for auth cookie (set by client-side auth)
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME)
  
  // Also check localStorage via cookie sync
  // The client will set this cookie when user logs in
  return !!authCookie?.value
}

/**
 * Get preferred locale from request headers
 */
function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return 'en'
  
  // Parse accept-language header
  const locales = acceptLanguage
    .split(',')
    .map(lang => {
      const [locale, q = 'q=1'] = lang.trim().split(';')
      const quality = parseFloat(q.replace('q=', '')) || 1
      return { locale: locale.split('-')[0], quality }
    })
    .sort((a, b) => b.quality - a.quality)
  
  return locales[0]?.locale || 'en'
}

/**
 * Add security headers to response
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
  )
  
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY')
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  // Enable XSS protection
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Permissions policy
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )
  
  return response
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isUserAuthenticated = isAuthenticated(request)
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Static files like .svg, .png, etc.
  ) {
    return NextResponse.next()
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute(pathname) && isUserAuthenticated) {
    const dashboardUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  // Protect dashboard routes
  if (isProtectedRoute(pathname) && !isUserAuthenticated) {
    const authUrl = new URL('/auth', request.url)
    // Store the intended destination for redirect after login
    authUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(authUrl)
  }

  // Create response
  let response = NextResponse.next()

  // Add locale header for client-side usage
  const locale = getPreferredLocale(request)
  response.headers.set('x-locale', locale)

  // Add security headers
  response = addSecurityHeaders(response)

  // Add request timing header for performance monitoring
  response.headers.set('x-request-time', Date.now().toString())

  return response
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
}
