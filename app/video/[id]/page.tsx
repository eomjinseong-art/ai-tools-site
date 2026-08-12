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
          className="text-sm text-brand-600 hover:underline w-fit dark:text-brand-400"
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
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{video.title}</h1>
          {video.difficulty && (
            <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
              {video.difficulty}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
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

      {video.hook && (
        <p className="rounded-xl border border-brand-100 bg-brand-50 px-5 py-4 text-brand-700 font-medium leading-relaxed dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-400">
          {video.hook}
        </p>
      )}

      {video.summary && (
        <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 dark:text-gray-100">AI 요약</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap dark:text-gray-300">{video.summary}</p>

          {video.summary_points && video.summary_points.length > 0 && (
            <ul className="mt-4 flex flex-col gap-2">
              {video.summary_points.map((point, i) => (
                <li key={i} className="flex gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-brand-600 font-semibold dark:text-brand-400">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {video.tool_features && video.tool_features.length > 0 && (
        <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 dark:text-gray-100">주요 기능</h2>
          <ul className="flex flex-col gap-2">
            {video.tool_features.map((feature, i) => (
              <li key={i} className="flex gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-brand-600 font-semibold dark:text-brand-400">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {video.takeaway && (
        <p className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-700 italic dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
          &ldquo;{video.takeaway}&rdquo;
        </p>
      )}

      <AdBanner placement="video_inline" />
    </div>
  );
}
