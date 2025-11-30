/**
 * Generic API Response Types
 * Used across all features
 */

export interface ApiResponse<T = unknown> {
  data?: T
  results?: T[]
  count?: number
  next?: string | null
  previous?: string | null
  detail?: string
  message?: string
  status?: number
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ApiError {
  detail?: string
  message?: string
  errors?: Record<string, string[]>
  non_field_errors?: string[]
  [key: string]: string | string[] | Record<string, string[]> | undefined
}
