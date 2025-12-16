"use client";

import { createClient } from "@supabase/supabase-js";

let supabase: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // ⛔️ PAS DE THROW
    if (!url || !key) {
      console.warn("Supabase env vars not available yet");
      return null;
    }

    supabase = createClient(url, key);
  }

  return supabase;
}
