import { supabase } from "@/lib/supabase";
import type { Ad, AdPlacement } from "@/lib/types";

export async function getActiveAd(placement: AdPlacement): Promise<Ad | null> {
  const nowIso = new Date().toISOString();

  const { data, error } = await supabase
    .from("ads")
    .select("*")
    .eq("placement", placement)
    .eq("is_active", true)
    .or(`starts_at.is.null,starts_at.lte.${nowIso}`)
    .or(`ends_at.is.null,ends_at.gte.${nowIso}`)
    .order("sort_order", { ascending: true })
    .limit(1);

  if (error || !data || data.length === 0) return null;
  return data[0] as Ad;
}
