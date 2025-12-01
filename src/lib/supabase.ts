import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Supabase client for client-side operations
 * Uses the anon key - respects RLS policies
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

/**
 * Supabase admin client for server-side operations
 * Uses the service role key - bypasses RLS
 * ONLY use in API routes, never expose to client
 */
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
