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

  return (
    <a
      href={ad.link_url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`block overflow-hidden rounded-xl border border-gray-200 bg-gray-50 ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ad.image_url} alt={ad.alt_text ?? ad.name} className="w-full h-auto object-cover" />
    </a>
  );
}
