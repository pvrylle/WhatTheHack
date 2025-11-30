import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 * @example
 * cn('px-2 py-1', 'px-3') // => 'py-1 px-3'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
