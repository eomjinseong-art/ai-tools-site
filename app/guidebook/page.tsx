import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Category, GuidebookSection } from "@/lib/types";
import AdBanner from "@/components/AdBanner";

export const revalidate = 3600;

async function getGeneralSections(): Promise<GuidebookSection[]> {
  const { data, error } = await supabase
    .from("guidebook_sections")
    .select("*")
    .is("category_id", null)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load general guidebook sections", error);
    return [];
  }
  return (data ?? []) as GuidebookSection[];
}

async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data ?? []) as Category[];
}

export default async function GuidebookPage() {
  const [generalSections, categories] = await Promise.all([
    getGeneralSections(),
    getCategories(),
  ]);

  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">가이드북</h1>
        <p className="mt-2 text-gray-500">AI 툴을 처음 시작하는 분들을 위한 안내입니다.</p>
      </header>

      {generalSections.length === 0 && categories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
          아직 등록된 가이드북 콘텐츠가 없습니다.
        </div>
      ) : (
        <>
          {generalSections.length > 0 && (
            <section className="flex flex-col gap-4">
              {generalSections.map((section) => (
                <article
                  key={section.id}
                  className="rounded-xl border border-gray-200 bg-white p-6"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {section.title}
                  </h2>
                  <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-wrap">
                    {section.content_markdown}
                  </div>
                </article>
              ))}
            </section>
          )}

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              카테고리별 가이드
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-brand-500 hover:text-brand-600 text-center"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      <AdBanner placement="guidebook_footer" />
    </div>
  );
}
