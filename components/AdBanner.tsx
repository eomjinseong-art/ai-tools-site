import { getActiveAd } from "@/lib/ads";
import type { AdPlacement } from "@/lib/types";

export default async function AdBanner({
  placement,
  className,
}: {
  placement: AdPlacement;
  className?: string;
}) {
  const ad = await getActiveAd(placement);
  if (!ad) return null;

  // No creative uploaded yet for this slot — show a text banner instead of a
  // broken <img> so the slot is still usable before real artwork arrives.
  if (!ad.image_url) {
    return (
      <a
        href={ad.link_url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`flex items-center justify-center rounded-xl bg-brand-600 px-4 py-6 text-center text-sm font-semibold text-white hover:bg-brand-700 ${className ?? ""}`}
      >
        {ad.name}
      </a>
    );
  }

  return (
    <a
      href={ad.link_url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`block overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ad.image_url} alt={ad.alt_text ?? ad.name} className="w-full h-auto object-cover" />
    </a>
  );
}
