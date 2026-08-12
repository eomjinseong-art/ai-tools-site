import { supabase } from "@/lib/supabase";
import type { Category, GuidebookSection, Video } from "@/lib/types";
import AdBanner from "@/components/AdBanner";
import TopCarousel, { type CarouselVideo } from "@/components/TopCarousel";
import CategoryMenu from "@/components/CategoryMenu";
import VideoCard from "@/components/VideoCard";
import SummaryPanel from "@/components/SummaryPanel";

async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("click_count", { ascending: false })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load categories", error);
    return [];
  }
  return (data ?? []) as Category[];
}

async function getVideosForCategory(categoryId: string): Promise<Video[]> {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("category_id", categoryId)
    .eq("status", "published")
    .order("rank", { ascending: true })
    .limit(10);

  if (error) {
    console.error("Failed to load videos", error);
    return [];
  }
  return (data ?? []) as Video[];
}

async function getGuidebookSections(categoryId: string): Promise<GuidebookSection[]> {
  const { data, error } = await supabase
    .from("guidebook_sections")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data ?? []) as GuidebookSection[];
}

// Recency-first: pull the most recently published videos across every
// category, then rank that recent pool by view count so the carousel favors
// fresh AND popular content rather than old viral hits.
async function getCarouselVideos(): Promise<CarouselVideo[]> {
  const { data, error } = await supabase
    .from("videos")
    .select("id, title, thumbnail_url, view_count, published_at, categories(slug, name)")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(40);

  if (error || !data) {
    console.error("Failed to load carousel videos", error);
    return [];
  }

  return data
    .map((v) => {
      const category = Array.isArray(v.categories) ? v.categories[0] : v.categories;
      if (!category) return null;
      return {
        id: v.id as string,
        title: v.title as string,
        thumbnail_url: v.thumbnail_url as string | null,
        view_count: (v.view_count as number) ?? 0,
        category_slug: category.slug as string,
        category_name: category.name as string,
      };
    })
    .filter((v): v is CarouselVideo => v !== null)
    .sort((a, b) => b.view_count - a.view_count)
    .slice(0, 12);
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; video?: string };
}) {
  const [categories, carouselVideos] = await Promise.all([getCategories(), getCarouselVideos()]);

  const selectedCategory =
    categories.find((c) => c.slug === searchParams.category) ?? categories[0] ?? null;

  const videos = selectedCategory ? await getVideosForCategory(selectedCategory.id) : [];
  const selectedVideo = videos.find((v) => v.id === searchParams.video) ?? videos[0] ?? null;
  const guidebookSections = selectedCategory ? await getGuidebookSections(selectedCategory.id) : [];

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

      <TopCarousel videos={carouselVideos} />

      <AdBanner placement="home_top" />

      {categories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
          <p className="font-medium">아직 등록된 카테고리가 없습니다.</p>
          <p className="mt-1 text-sm">
            수집기가 첫 실행되면 카테고리와 영상이 자동으로 채워집니다.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[180px_1fr_400px]">
          <div className="lg:border-r lg:border-gray-100 lg:pr-4 dark:lg:border-gray-800">
            <CategoryMenu categories={categories} selectedSlug={selectedCategory?.slug ?? ""} />
          </div>

          <div className="flex flex-col gap-3">
            {selectedCategory && (
              <div className="flex items-center gap-2 pb-1">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {selectedCategory.name}
                </h2>
                {selectedCategory.is_trend && (
                  <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white">
                    트렌드
                  </span>
                )}
              </div>
            )}
            {videos.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                아직 수집된 영상이 없습니다. 곧 업데이트될 예정입니다.
              </div>
            ) : (
              videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  categorySlug={selectedCategory!.slug}
                  selected={video.id === selectedVideo?.id}
                />
              ))
            )}
          </div>

          <div className="lg:border-l lg:border-gray-100 lg:pl-4 dark:lg:border-gray-800">
            <SummaryPanel video={selectedVideo} guidebookSections={guidebookSections} />
          </div>
        </section>
      )}

      <AdBanner placement="home_bottom" />
    </div>
  );
}
