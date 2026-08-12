import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { AD_PLACEMENTS } from "@/lib/types";
import type { Ad } from "@/lib/types";
import AdEditForm from "@/components/admin/AdEditForm";

export default async function AdminAdsPage() {
  requireAdmin();

  const { data } = await supabaseAdmin.from("ads").select("*");
  const adsByPlacement = new Map<string, Ad>();
  ((data ?? []) as Ad[]).forEach((ad) => adsByPlacement.set(ad.placement, ad));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400">
          ← 관리자
        </Link>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">광고 슬롯 관리</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AD_PLACEMENTS.map((placement) => (
          <AdEditForm key={placement} placement={placement} ad={adsByPlacement.get(placement) ?? null} />
        ))}
      </div>
    </div>
  );
}
