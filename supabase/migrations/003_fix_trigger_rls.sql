-- =====================================================
-- FIX: Allow trigger function to bypass RLS
-- Run this in Supabase SQL Editor
-- =====================================================

-- Drop existing trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Recreate the function with proper permissions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create user profile
  INSERT INTO public.user_profiles (id, username, email)
  VALUES (
    NEW.id, 
    COALESCE(
      NEW.raw_user_meta_data->>'username', 
      'Agent_' || substring(NEW.id::text, 1, 8)
    ),
    NEW.email
  );
  
  -- Create user stats
  INSERT INTO public.user_stats (id)
  VALUES (NEW.id);
  
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Username already exists, try with a random suffix
    INSERT INTO public.user_profiles (id, username, email)
    VALUES (
      NEW.id, 
      'Agent_' || substring(NEW.id::text, 1, 8) || '_' || floor(random() * 1000)::text,
      NEW.email
    );
    
    INSERT INTO public.user_stats (id)
    VALUES (NEW.id)
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Grant necessary permissions to the function
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;

-- Alternative: Add policies that allow service_role to insert
-- This allows the trigger (running as service_role) to insert records

CREATE POLICY "Service role can insert profiles" 
  ON user_profiles FOR INSERT 
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can insert stats" 
  ON user_stats FOR INSERT 
  TO service_role
  WITH CHECK (true);

-- If email column doesn't exist in user_profiles, add it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'email'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN email VARCHAR(255);
  END IF;
END $$;
