import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

// Read-only client: RLS policies restrict every table to public, published rows.
// Falls back to placeholder values so the client can construct (and the build can
// collect page data) even when env vars aren't set yet; queries will simply fail
// and each page's error handling renders its empty state.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: { persistSession: false },
    // Next.js persists its fetch Data Cache across builds/deployments; without
    // this, a request made once during an early build (e.g. before some rows
    // existed) can keep being served from that stale cache indefinitely.
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  }
);
