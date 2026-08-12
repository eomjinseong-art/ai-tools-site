import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Category, GuidebookSection, Video } from "@/lib/types";
import VideoCard from "@/components/VideoCard";
import AdBanner from "@/components/AdBanner";

export const revalidate = 3600;

async function getCategory(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return data as Category;
}

async function getVideos(categoryId: string): Promise<Video[]> {
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

  if (error) {
    console.error("Failed to load guidebook sections", error);
    return [];
  }
  return (data ?? []) as GuidebookSection[];
}

export async function generateStaticParams() {
  const { data } = await supabase.from("categories").select("slug");
  return (data ?? []).map((c: { slug: string }) => ({ slug: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategory(params.slug);
  if (!category) notFound();

  const [videos, guidebookSections] = await Promise.all([
    getVideos(category.id),
    getGuidebookSections(category.id),
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
      <div className="flex flex-col gap-8">
        <header>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{category.name}</h1>
            {category.is_trend && (
              <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                트렌드
              </span>
            )}
          </div>
          {category.description && (
            <p className="mt-2 text-gray-500">{category.description}</p>
          )}
        </header>

        {guidebookSections.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-900">가이드북</h2>
            {guidebookSections.map((section) => (
              <article
                key={section.id}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{section.title}</h3>
                <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-wrap">
                  {section.content_markdown}
                </div>
              </article>
            ))}
          </section>
        )}

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">추천 영상</h2>
          {videos.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
              아직 수집된 영상이 없습니다. 곧 업데이트될 예정입니다.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </section>
      </div>

      <aside className="flex flex-col gap-4">
        <AdBanner placement="category_sidebar" />
      </aside>
    </div>
  );
}
