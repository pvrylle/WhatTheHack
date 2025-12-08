-- =====================================================
-- WhatTheHack Database Migration
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE difficulty_level AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Expert');
CREATE TYPE rarity_level AS ENUM ('Common', 'Rare', 'Epic', 'Legendary');
CREATE TYPE question_type AS ENUM (
  'code-analysis', 
  'payload-craft', 
  'multiple-choice', 
  'vulnerability-spot',
  'vulnerability-analysis',
  'defense-identify',
  'attack-vector',
  'mitigation',
  'logic-flaw',
  'session-analysis',
  'bypass-technique',
  'secure-implementation'
);

-- =====================================================
-- TABLES
-- =====================================================

-- 1. User Profiles (extends auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  avatar_url TEXT,
  rank VARCHAR(50) DEFAULT 'Recruit',
  bio TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Stats
CREATE TABLE user_stats (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  xp_to_next INTEGER DEFAULT 1000,
  challenges_completed INTEGER DEFAULT 0,
  achievements_earned INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_time_spent INTEGER DEFAULT 0,
  accuracy_percentage DECIMAL(5,2) DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Missions
CREATE TABLE missions (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50),
  color VARCHAR(50) DEFAULT 'primary',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Challenges
CREATE TABLE challenges (
  id VARCHAR(100) PRIMARY KEY,
  mission_id VARCHAR(100) REFERENCES missions(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  difficulty difficulty_level DEFAULT 'Beginner',
  xp_reward INTEGER DEFAULT 100,
  time_estimate VARCHAR(50),
  category VARCHAR(100),
  order_index INTEGER DEFAULT 0,
  prerequisites JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Challenge Questions
CREATE TABLE challenge_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id VARCHAR(100) REFERENCES challenges(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  type question_type NOT NULL,
  code_snippet TEXT,
  context TEXT,
  options JSONB,
  correct_answer TEXT NOT NULL,
  hint TEXT,
  explanation TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. User Challenge Progress
CREATE TABLE user_challenge_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id VARCHAR(100) REFERENCES challenges(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  is_unlocked BOOLEAN DEFAULT false,
  xp_earned INTEGER DEFAULT 0,
  time_taken INTEGER,
  attempts INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  answers_history JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, challenge_id)
);

-- 7. Achievements
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50),
  category VARCHAR(100),
  rarity rarity_level DEFAULT 'Common',
  xp_reward INTEGER DEFAULT 50,
  points INTEGER DEFAULT 100,
  requirement JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. User Achievements
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id INTEGER REFERENCES achievements(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  earned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, achievement_id)
);

-- 9. User Active Missions
CREATE TABLE user_active_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mission_id VARCHAR(100) REFERENCES missions(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  deadline_at TIMESTAMPTZ,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, mission_id)
);

-- 10. Daily Streaks
CREATE TABLE daily_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL,
  challenges_completed INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, activity_date)
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_user_profiles_username ON user_profiles(username);
CREATE INDEX idx_user_stats_total_xp ON user_stats(total_xp DESC);
CREATE INDEX idx_user_stats_level ON user_stats(level DESC);
CREATE INDEX idx_challenges_mission ON challenges(mission_id);
CREATE INDEX idx_challenges_difficulty ON challenges(difficulty);
CREATE INDEX idx_questions_challenge ON challenge_questions(challenge_id);
CREATE INDEX idx_progress_user ON user_challenge_progress(user_id);
CREATE INDEX idx_progress_challenge ON user_challenge_progress(challenge_id);
CREATE INDEX idx_progress_completed ON user_challenge_progress(user_id, is_completed);
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_achievements_rarity ON achievements(rarity);
CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_earned ON user_achievements(user_id, earned_at);
CREATE INDEX idx_active_missions_user ON user_active_missions(user_id);
CREATE INDEX idx_streaks_user_date ON daily_streaks(user_id, activity_date DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_active_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_streaks ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view all profiles" 
  ON user_profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can update own profile" 
  ON user_profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON user_profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- User Stats Policies
CREATE POLICY "Users can view all stats" 
  ON user_stats FOR SELECT 
  USING (true);

CREATE POLICY "Users can update own stats" 
  ON user_stats FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own stats" 
  ON user_stats FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Missions Policies (public read)
CREATE POLICY "Anyone can view missions" 
  ON missions FOR SELECT 
  USING (true);

-- Challenges Policies (public read for active)
CREATE POLICY "Anyone can view active challenges" 
  ON challenges FOR SELECT 
  USING (is_active = true);

-- Challenge Questions Policies
CREATE POLICY "Authenticated users can view questions" 
  ON challenge_questions FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- User Challenge Progress Policies
CREATE POLICY "Users can view own progress" 
  ON user_challenge_progress FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" 
  ON user_challenge_progress FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" 
  ON user_challenge_progress FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Achievements Policies (public read)
CREATE POLICY "Anyone can view achievements" 
  ON achievements FOR SELECT 
  USING (true);

-- User Achievements Policies
CREATE POLICY "Users can view own achievements" 
  ON user_achievements FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view earned achievements" 
  ON user_achievements FOR SELECT 
  USING (earned_at IS NOT NULL);

CREATE POLICY "Users can update own achievement progress" 
  ON user_achievements FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements" 
  ON user_achievements FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- User Active Missions Policies
CREATE POLICY "Users can manage own active missions" 
  ON user_active_missions FOR ALL 
  USING (auth.uid() = user_id);

-- Daily Streaks Policies
CREATE POLICY "Users can view own streaks" 
  ON daily_streaks FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own streaks" 
  ON daily_streaks FOR ALL 
  USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Update timestamps automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Calculate level from XP
CREATE OR REPLACE FUNCTION calculate_level(xp INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN GREATEST(1, FLOOR(xp / 1000) + 1);
END;
$$ LANGUAGE plpgsql;

-- Calculate XP needed for next level
CREATE OR REPLACE FUNCTION calculate_xp_to_next(xp INTEGER)
RETURNS INTEGER AS $$
DECLARE
  current_level INTEGER;
BEGIN
  current_level := calculate_level(xp);
  RETURN (current_level * 1000) - xp;
END;
$$ LANGUAGE plpgsql;

-- Get rank based on level
CREATE OR REPLACE FUNCTION get_rank_from_level(lvl INTEGER)
RETURNS VARCHAR AS $$
BEGIN
  RETURN CASE
    WHEN lvl >= 50 THEN 'Legendary Hacker'
    WHEN lvl >= 40 THEN 'Master Hacker'
    WHEN lvl >= 30 THEN 'Expert Hacker'
    WHEN lvl >= 20 THEN 'Elite Hacker'
    WHEN lvl >= 15 THEN 'Senior Hacker'
    WHEN lvl >= 10 THEN 'Skilled Hacker'
    WHEN lvl >= 5 THEN 'Junior Hacker'
    WHEN lvl >= 2 THEN 'Apprentice'
    ELSE 'Recruit'
  END;
END;
$$ LANGUAGE plpgsql;

-- Handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create user profile
  INSERT INTO user_profiles (id, username)
  VALUES (
    NEW.id, 
    COALESCE(
      NEW.raw_user_meta_data->>'username', 
      'Agent_' || substring(NEW.id::text, 1, 8)
    )
  );
  
  -- Create user stats
  INSERT INTO user_stats (id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update user stats on challenge completion
CREATE OR REPLACE FUNCTION update_user_stats_on_completion()
RETURNS TRIGGER AS $$
DECLARE
  new_xp INTEGER;
  new_level INTEGER;
  new_rank VARCHAR;
BEGIN
  IF NEW.is_completed = true AND (OLD IS NULL OR OLD.is_completed = false) THEN
    -- Calculate new XP
    SELECT total_xp + NEW.xp_earned INTO new_xp
    FROM user_stats WHERE id = NEW.user_id;
    
    -- Calculate new level and rank
    new_level := calculate_level(new_xp);
    new_rank := get_rank_from_level(new_level);
    
    -- Update user stats
    UPDATE user_stats
    SET 
      total_xp = new_xp,
      total_points = total_points + NEW.xp_earned,
      challenges_completed = challenges_completed + 1,
      level = new_level,
      xp_to_next = calculate_xp_to_next(new_xp),
      last_activity_at = NOW()
    WHERE id = NEW.user_id;
    
    -- Update user rank in profile
    UPDATE user_profiles
    SET rank = new_rank
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update streak on daily activity
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
DECLARE
  yesterday_exists BOOLEAN;
  current_streak_val INTEGER;
BEGIN
  -- Check if this is the first activity of the day for this user
  IF NOT EXISTS (
    SELECT 1 FROM daily_streaks 
    WHERE user_id = NEW.user_id 
    AND activity_date = NEW.activity_date
    AND id != NEW.id
  ) THEN
    -- Check if user was active yesterday
    SELECT EXISTS(
      SELECT 1 FROM daily_streaks 
      WHERE user_id = NEW.user_id 
      AND activity_date = NEW.activity_date - INTERVAL '1 day'
    ) INTO yesterday_exists;
    
    SELECT current_streak INTO current_streak_val
    FROM user_stats WHERE id = NEW.user_id;
    
    IF yesterday_exists THEN
      -- Continue streak
      UPDATE user_stats
      SET 
        current_streak = current_streak + 1,
        longest_streak = GREATEST(longest_streak, current_streak + 1)
      WHERE id = NEW.user_id;
    ELSE
      -- Reset streak to 1
      UPDATE user_stats
      SET current_streak = 1
      WHERE id = NEW.user_id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Auto-create profile and stats on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update timestamps
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at
  BEFORE UPDATE ON user_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_challenge_progress_updated_at
  BEFORE UPDATE ON user_challenge_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_challenges_updated_at
  BEFORE UPDATE ON challenges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_missions_updated_at
  BEFORE UPDATE ON missions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update stats on challenge completion
CREATE TRIGGER on_challenge_completed
  AFTER INSERT OR UPDATE ON user_challenge_progress
  FOR EACH ROW EXECUTE FUNCTION update_user_stats_on_completion();

-- Update streak on daily activity
CREATE TRIGGER on_daily_activity
  AFTER INSERT ON daily_streaks
  FOR EACH ROW EXECUTE FUNCTION update_user_streak();

-- =====================================================
-- VIEWS
-- =====================================================

-- Leaderboard view
CREATE VIEW leaderboard_view AS
SELECT 
  ROW_NUMBER() OVER (ORDER BY us.total_xp DESC) as rank,
  up.id as user_id,
  up.username,
  up.avatar_url,
  up.rank as user_rank,
  us.total_xp,
  us.level,
  us.current_streak,
  us.challenges_completed,
  us.achievements_earned
FROM user_profiles up
JOIN user_stats us ON up.id = us.id
WHERE up.is_active = true
ORDER BY us.total_xp DESC;

-- Mission progress view
CREATE VIEW user_mission_progress AS
SELECT 
  ucp.user_id,
  c.mission_id,
  m.title as mission_title,
  m.icon,
  m.color,
  COUNT(c.id) as total_challenges,
  COUNT(CASE WHEN ucp.is_completed THEN 1 END) as completed_challenges,
  ROUND(
    (COUNT(CASE WHEN ucp.is_completed THEN 1 END)::numeric / NULLIF(COUNT(c.id), 0)::numeric) * 100, 
    2
  ) as progress_percentage,
  SUM(COALESCE(ucp.xp_earned, 0)) as xp_earned
FROM challenges c
JOIN missions m ON c.mission_id = m.id
LEFT JOIN user_challenge_progress ucp ON c.id = ucp.challenge_id
WHERE c.is_active = true
GROUP BY ucp.user_id, c.mission_id, m.title, m.icon, m.color;

-- =====================================================
-- GRANT PERMISSIONS FOR VIEWS
-- =====================================================

GRANT SELECT ON leaderboard_view TO authenticated;
GRANT SELECT ON leaderboard_view TO anon;
GRANT SELECT ON user_mission_progress TO authenticated;
