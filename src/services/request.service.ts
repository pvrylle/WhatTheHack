

import { API_URL, REQUEST_TIMEOUT } from '@/constants/api'
import type { ApiResponse, ApiError } from '@/interfaces/api'


interface RequestConfig extends RequestInit {
  timeout?: number
  skipAuth?: boolean
}


const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('access_token') || localStorage.getItem('whathehack_token')
}


const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('refresh_token')
}


export const setAuthTokens = (access: string, refresh?: string): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('access_token', access)
  if (refresh) {
    localStorage.setItem('refresh_token', refresh)
  }
}


export const clearAuthTokens = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('whathehack_user')
}


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


const handleApiError = async (response: Response): Promise<ApiError> => {
  let errorData: ApiError

  try {
    errorData = await response.json()
  } catch {
    errorData = {
      detail: response.statusText || 'An error occurred',
    }
  }


  if (response.status === 401 && !errorData.detail?.includes('token')) {
    const newToken = await refreshAccessToken()
    if (newToken) {

      throw new Error('RETRY_REQUEST')
    }
    clearAuthTokens()
    if (typeof window !== 'undefined') {
      window.location.href = '/auth'
    }
  }

  return errorData
}


const createRequestWithTimeout = (
  url: string,
  config: RequestConfig
): Promise<Response> => {
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


const request = async <T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  const { skipAuth = false, timeout, ...fetchConfig } = config


  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`


  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchConfig.headers,
  }


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


    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      if (response.ok) {
        return { data: await response.text() as any }
      }
      throw new Error(response.statusText)
    }

    const data = await response.json()


    if (!response.ok) {
      const error = await handleApiError(response)
      throw error
    }


    return {
      data: data.results || data,
      results: data.results,
      count: data.count,
      next: data.next,
      previous: data.previous,
    }
  } catch (error: any) {

    if (error.message === 'RETRY_REQUEST') {
      return request<T>(endpoint, config)
    }


    if (error.name === 'AbortError') {
      throw {
        detail: 'Request timeout. Please try again.',
        message: 'Request timeout',
      } as ApiError
    }


    if (error.detail || error.message) {
      throw error
    }


    throw {
      detail: error.message || 'An unexpected error occurred',
      message: 'Network error',
    } as ApiError
  }
}


export const httpService = {
  
  get: <T = any>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      ...config,
      method: 'GET',
    })
  },

  
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

  
  put: <T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  
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

  
  delete: <T = any>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      ...config,
      method: 'DELETE',
    })
  },
}

export default httpService
