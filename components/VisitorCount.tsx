"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase.rpc("increment_site_visits");
        if (!error && typeof data === "number") setCount(data);
      } catch {
        // Non-critical — the counter just won't show for this visit.
      }
    }
    load();
  }, []);

  if (count === null) return null;

  return (
    <span className="text-xs text-gray-400 dark:text-gray-500" title="누적 방문자 수">
      👁 {count.toLocaleString("ko-KR")}
    </span>
  );
}
