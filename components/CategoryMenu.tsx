"use client";

import Link from "next/link";
import type { Category } from "@/lib/types";
import { supabase } from "@/lib/supabase";

export default function CategoryMenu({
  categories,
  selectedSlug,
}: {
  categories: Category[];
  selectedSlug: string;
}) {
  function onSelect(slug: string) {
    // Fire-and-forget: don't block navigation on the click-count write.
    supabase.rpc("increment_category_clicks", { p_slug: slug }).then(() => {});
  }

  return (
    <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
      {categories.map((category) => {
        const active = category.slug === selectedSlug;
        return (
          <Link
            key={category.id}
            href={`/?category=${category.slug}`}
            scroll={false}
            onClick={() => onSelect(category.slug)}
            className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition whitespace-nowrap lg:whitespace-normal ${
              active
                ? "bg-brand-600 text-white"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            {category.name}
            {category.is_trend && (
              <span className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold">
                트렌드
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
