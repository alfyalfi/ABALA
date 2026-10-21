-- Supabase SQL Schema for ABALA (Aplikasi Belajar Anak Lili Alpi)
-- Run this in your Supabase SQL Editor if you want cloud sync & multi-device tracking.

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Reza',
  avatar_theme TEXT DEFAULT 'superhero_black_red',
  grade TEXT DEFAULT 'TK A',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Daily Sessions Tracking
CREATE TABLE IF NOT EXISTS daily_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL DEFAULT 'Reza',
  day_id INT NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL DEFAULT 15,
  passed BOOLEAN NOT NULL DEFAULT true,
  answers_summary JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Learning Pillars Mastery (Radar 5 Pilar)
CREATE TABLE IF NOT EXISTS learning_pillars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL DEFAULT 'Reza',
  pillar_name TEXT NOT NULL, -- 'Berhitung', 'Membaca', 'Menyimak', 'Nalar', 'Bentuk/Pola', 'Kemandirian'
  accuracy_rate NUMERIC(5,2) DEFAULT 0.00,
  total_attempts INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Superhero Badges & Unlocks
CREATE TABLE IF NOT EXISTS superhero_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL DEFAULT 'Reza',
  badge_code TEXT NOT NULL UNIQUE,
  badge_title TEXT NOT NULL,
  badge_icon TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE daily_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE superhero_badges ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads and inserts for simple family usage
CREATE POLICY "Allow public insert to daily_sessions" ON daily_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on daily_sessions" ON daily_sessions FOR SELECT USING (true);
