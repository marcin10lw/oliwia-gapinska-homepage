import { createClient, SupabaseClient } from '@supabase/supabase-js';

const projectUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const globalForSupabase = globalThis as unknown as {
  supabase: SupabaseClient | undefined;
};

const supabase = globalForSupabase.supabase ?? createClient(projectUrl || '', supabaseAnonKey || '');

if (process.env.NODE_ENV !== 'production') globalForSupabase.supabase = supabase;

export const supa = supabase;
