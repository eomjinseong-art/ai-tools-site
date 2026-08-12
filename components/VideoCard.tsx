import Link from "next/link";
import type { Video } from "@/lib/types";
import { formatViewCount, formatPublishedDate } from "@/lib/format";

export default function VideoCard({
  video,
  categorySlug,
  selected,
}: {
  video: Video;
  categorySlug: string;
  selected?: boolean;
}) {
  return (
    <Link
      href={`/?category=${categorySlug}&video=${video.id}`}
      scroll={false}
      className={`group flex gap-3 overflow-hidden rounded-xl border p-2 transition ${
        selected
          ? "border-brand-500 bg-brand-50 dark:border-brand-500 dark:bg-brand-500/10"
          : "border-gray-200 bg-white hover:border-brand-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand-500/50"
      }`}
    >
      <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        {video.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400 text-xs dark:text-gray-500">
            썸네일 없음
          </div>
        )}
        {video.rank && (
          <span className="absolute top-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            #{video.rank}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 min-w-0 py-0.5">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-brand-600 dark:text-gray-100 dark:group-hover:text-brand-400">
          {video.title}
        </h3>
        {video.channel_title && (
          <p className="truncate text-xs text-gray-500 dark:text-gray-400">{video.channel_title}</p>
        )}
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {formatViewCount(video.view_count)} · {formatPublishedDate(video.published_at)}
        </p>
      </div>
    </Link>
  );
}
