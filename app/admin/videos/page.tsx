import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { deleteVideo } from "@/app/admin/videos/actions";
import { formatViewCount } from "@/lib/format";

export default async function AdminVideosPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  requireAdmin();

  const { data: categories } = await supabaseAdmin
    .from("categories")
    .select("id, slug, name")
    .order("sort_order");

  const selected = (categories ?? []).find((c) => c.slug === searchParams.category) ?? categories?.[0];

  const { data: videos } = selected
    ? await supabaseAdmin
        .from("videos")
        .select("id, title, channel_title, view_count, rank, youtube_id")
        .eq("category_id", selected.id)
        .order("rank")
    : { data: [] };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400">
          ← 관리자
        </Link>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">영상 관리</h1>
      </div>

      <nav className="flex flex-wrap gap-1.5">
        {(categories ?? []).map((c) => (
          <Link
            key={c.id}
            href={`/admin/videos?category=${c.slug}`}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              c.slug === selected?.slug
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-2">
        {(videos ?? []).map((video) => (
          <div
            key={video.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                #{video.rank} {video.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {video.channel_title} · {formatViewCount(video.view_count)}
              </p>
            </div>
            <form action={deleteVideo}>
              <input type="hidden" name="video_id" value={video.id} />
              <button
                type="submit"
                className="shrink-0 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
              >
                삭제
              </button>
            </form>
          </div>
        ))}
        {(videos ?? []).length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">이 카테고리에 영상이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
