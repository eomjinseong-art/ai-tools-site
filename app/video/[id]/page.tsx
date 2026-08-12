import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Category, Video } from "@/lib/types";
import AdBanner from "@/components/AdBanner";
import { formatViewCount, formatPublishedDate, formatDuration } from "@/lib/format";

export const revalidate = 3600;

async function getVideo(id: string): Promise<Video | null> {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  return data as Video;
}

async function getCategory(id: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data as Category;
}

export default async function VideoPage({ params }: { params: { id: string } }) {
  const video = await getVideo(params.id);
  if (!video) notFound();

  const category = await getCategory(video.category_id);

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto">
      {category && (
        <Link
          href={`/category/${category.slug}`}
          className="text-sm text-brand-600 hover:underline w-fit"
        >
          ← {category.name} 카테고리로 돌아가기
        </Link>
      )}

      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${video.youtube_id}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
          {video.channel_title && <span>{video.channel_title}</span>}
          <span>·</span>
          <span>{formatViewCount(video.view_count)}</span>
          <span>·</span>
          <span>{formatPublishedDate(video.published_at)}</span>
          {video.duration_seconds && (
            <>
              <span>·</span>
              <span>{formatDuration(video.duration_seconds)}</span>
            </>
          )}
        </div>
      </header>

      {video.summary && (
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">AI 요약</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{video.summary}</p>

          {video.summary_points && video.summary_points.length > 0 && (
            <ul className="mt-4 flex flex-col gap-2">
              {video.summary_points.map((point, i) => (
                <li key={i} className="flex gap-2 text-gray-700">
                  <span className="text-brand-600 font-semibold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <AdBanner placement="video_inline" />
    </div>
  );
}
