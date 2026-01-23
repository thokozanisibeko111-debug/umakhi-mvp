// utils/supabaseClient.ts
// A thin wrapper around the Supabase client.  Import this file whenever
// you need to interact with your Supabase project.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigError =
  !supabaseUrl || !supabaseAnonKey
    ? 'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your deployment environment (client-visible variables are required).'
    : null;

export const supabase = supabaseConfigError ? null : createClient(supabaseUrl, supabaseAnonKey);
