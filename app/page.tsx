import { supabase } from "@/lib/supabase";
import type { Category } from "@/lib/types";
import CategoryCard from "@/components/CategoryCard";
import AdBanner from "@/components/AdBanner";

export const revalidate = 3600;

async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load categories", error);
    return [];
  }
  return (data ?? []) as Category[];
}

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-10">
      <section className="text-center py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          대한민국 AI 툴, 한눈에 배우기
        </h1>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto dark:text-gray-400">
          챗GPT부터 미드저니, 커서까지 — 매일 업데이트되는 유튜브 영상을 AI가 요약해
          핵심만 빠르게 알려드립니다.
        </p>
      </section>

      <AdBanner placement="home_top" />

      {categories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
          <p className="font-medium">아직 등록된 카테고리가 없습니다.</p>
          <p className="mt-1 text-sm">
            수집기가 첫 실행되면 카테고리와 영상이 자동으로 채워집니다.
          </p>
        </div>
      ) : (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-gray-100">카테고리</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      <AdBanner placement="home_bottom" />
    </div>
  );
}
