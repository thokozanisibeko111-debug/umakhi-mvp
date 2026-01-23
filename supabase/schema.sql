-- uMakhi MVP database schema

-- This file contains the SQL statements required to set up the tables
-- used by the uMakhi MVP.  Run it in the Supabase SQL editor after
-- creating your project.  You may modify the schema to suit your
-- application (e.g. adding indexes or additional columns).

-- Enable the uuid extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table to store user profiles and roles.  The id column must match
-- the auth.users.id for each user.  The role column is used in the
-- application to differentiate between learners and admins.
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'user',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Table of topics.  Each topic corresponds to a Grade 12 Mathematics
-- concept and groups videos and quizzes together.
CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Table of videos.  A video belongs to a topic and references
-- a file in the Supabase storage bucket.  The `url` column should
-- contain the public URL or path to the file in your storage bucket.
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  title text NOT NULL,
  url text NOT NULL,
  source text,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Table of topic notes.  Each topic can store rich notes content and
-- JSON visuals to render on the topic page.
CREATE TABLE IF NOT EXISTS topic_notes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  introduction text NOT NULL,
  notes_md text NOT NULL,
  visuals_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Table of quizzes.  A quiz is associated with a topic and can
-- contain many questions.
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  title text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Table of questions.  Each question belongs to a quiz.  The
-- correct_option column stores the letter of the correct answer
-- (e.g. 'A', 'B', 'C', 'D').
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id uuid NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question text NOT NULL,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  option_d text NOT NULL,
  correct_option char(1) NOT NULL,
  explanation text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Basic row level security (RLS) policies.  These policies allow
-- authenticated users to read topics, videos, quizzes and questions.
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read to authenticated users" ON topics FOR SELECT USING (auth.role() IS NOT NULL);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read to authenticated users" ON videos FOR SELECT USING (auth.role() IS NOT NULL);

ALTER TABLE topic_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read to authenticated users" ON topic_notes FOR SELECT USING (auth.role() IS NOT NULL);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read to authenticated users" ON quizzes FOR SELECT USING (auth.role() IS NOT NULL);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read to authenticated users" ON questions FOR SELECT USING (auth.role() IS NOT NULL);

-- Profiles table RLS: allow users to read and update their own profile.
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
