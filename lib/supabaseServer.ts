import { createClient } from "@supabase/supabase-js";

export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const role = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  return createClient(url, role, {
    auth: { persistSession: false },
  });
}
