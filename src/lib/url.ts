export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return ''
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  return `http://localhost:${process.env.PORT || 3000}`
}

export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL
  }

  return getBaseUrl()
}

export function getFullUrl(path: string): string {
  const baseUrl = getBaseUrl()

  if (path.startsWith('http')) {
    return path
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  return `${baseUrl}${normalizedPath}`
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

export function isVercel(): boolean {
  return !!process.env.VERCEL
}

export function getEnvironmentInfo() {
  return {
    nodeEnv: process.env.NODE_ENV,
    isVercel: isVercel(),
    isProduction: isProduction(),
    baseUrl: getBaseUrl(),
    apiBaseUrl: getApiBaseUrl(),
  }
}
