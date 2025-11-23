/**
 * HTTP Request Service
 * Centralized service for making API requests
 * Compatible with Django REST Framework
 */

import { API_URL, REQUEST_TIMEOUT } from '@/constants/api'
import type { ApiResponse, ApiError } from '@/types'

/**
 * Request Configuration
 */
interface RequestConfig extends RequestInit {
  timeout?: number
  skipAuth?: boolean
}

/**
 * Get authentication token from storage
 */
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('access_token') || localStorage.getItem('whathehack_token')
}

/**
 * Get refresh token from storage
 */
const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('refresh_token')
}

/**
 * Set authentication tokens
 */
export const setAuthTokens = (access: string, refresh?: string): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('access_token', access)
  if (refresh) {
    localStorage.setItem('refresh_token', refresh)
  }
}

/**
 * Clear authentication tokens
 */
export const clearAuthTokens = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('whathehack_user')
}

/**
 * Refresh access token
 */
const refreshAccessToken = async (): Promise<string | null> => {
  const refresh = getRefreshToken()
  if (!refresh) return null

  try {
    const response = await fetch(`${API_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh }),
    })

    if (response.ok) {
      const data = await response.json()
      setAuthTokens(data.access)
      return data.access
    }
  } catch (error) {
    console.error('Token refresh failed:', error)
  }

  return null
}

/**
 * Handle API errors
 */
const handleApiError = async (response: Response): Promise<ApiError> => {
  let errorData: ApiError

  try {
    errorData = await response.json()
  } catch {
    errorData = {
      detail: response.statusText || 'An error occurred',
    }
  }

  // Handle 401 Unauthorized - Try to refresh token
  if (response.status === 401 && !errorData.detail?.includes('token')) {
    const newToken = await refreshAccessToken()
    if (newToken) {
      // Retry the request with new token
      throw new Error('RETRY_REQUEST')
    }
    clearAuthTokens()
    if (typeof window !== 'undefined') {
      window.location.href = '/auth'
    }
  }

  return errorData
}

/**
 * Create request with timeout
 */
const createRequestWithTimeout = (url: string, config: RequestConfig): Promise<Response> => {
  const timeout = config.timeout || REQUEST_TIMEOUT
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  return fetch(url, {
    ...config,
    signal: controller.signal,
  }).finally(() => {
    clearTimeout(timeoutId)
  })
}

/**
 * Base request function
 */
const request = async <T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  const { skipAuth = false, timeout, ...fetchConfig } = config

  // Build full URL
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`

  // Set default headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchConfig.headers,
  }

  // Add authentication token if available
  if (!skipAuth) {
    const token = getAuthToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  try {
    const response = await createRequestWithTimeout(url, {
      ...fetchConfig,
      headers,
      timeout,
    })

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      if (response.ok) {
        return { data: (await response.text()) as any }
      }
      throw new Error(response.statusText)
    }

    const data = await response.json()

    // Handle error responses
    if (!response.ok) {
      const error = await handleApiError(response)
      throw error
    }

    // Django REST Framework returns data directly or in 'results' for pagination
    return {
      data: data.results || data,
      results: data.results,
      count: data.count,
      next: data.next,
      previous: data.previous,
    }
  } catch (error: any) {
    // Handle retry after token refresh
    if (error.message === 'RETRY_REQUEST') {
      return request<T>(endpoint, config)
    }

    // Handle network errors
    if (error.name === 'AbortError') {
      throw {
        detail: 'Request timeout. Please try again.',
        message: 'Request timeout',
      } as ApiError
    }

    // Re-throw API errors
    if (error.detail || error.message) {
      throw error
    }

    // Handle unknown errors
    throw {
      detail: error.message || 'An unexpected error occurred',
      message: 'Network error',
    } as ApiError
  }
}

/**
 * HTTP Service Methods
 */
export const httpService = {
  /**
   * GET request
   */
  get: <T = any>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      ...config,
      method: 'GET',
    })
  },

  /**
   * POST request
   */
  post: <T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  /**
   * PUT request
   */
  put: <T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  /**
   * PATCH request
   */
  patch: <T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  /**
   * DELETE request
   */
  delete: <T = any>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      ...config,
      method: 'DELETE',
    })
  },
}

export default httpService
