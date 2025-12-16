import { createClient } from "@supabase/supabase-js";

let supabase: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (typeof window === "undefined") {
    throw new Error("Supabase must be used on client only");
  }

  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error("Missing Supabase env variables");
    }

    supabase = createClient(url, key);
  }

  return supabase;
}
