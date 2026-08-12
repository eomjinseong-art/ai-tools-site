import Link from "next/link";
import type { Category } from "@/lib/types";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-brand-500"
    >
      {category.is_trend && (
        <span className="absolute -top-2 -right-2 rounded-full bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white shadow">
          트렌드
        </span>
      )}
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600">
        {category.name}
      </h3>
      {category.description && (
        <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{category.description}</p>
      )}
    </Link>
  );
}
