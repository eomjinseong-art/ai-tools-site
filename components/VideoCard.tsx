import Link from "next/link";
import type { Video } from "@/lib/types";
import { formatViewCount, formatPublishedDate } from "@/lib/format";

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Link
      href={`/video/${video.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {video.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400 text-sm dark:text-gray-500">
            썸네일 없음
          </div>
        )}
        {video.rank && (
          <span className="absolute top-2 left-2 rounded bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">
            #{video.rank}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="line-clamp-2 font-semibold text-gray-900 group-hover:text-brand-600 dark:text-gray-100 dark:group-hover:text-brand-400">
          {video.title}
        </h3>
        {video.channel_title && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{video.channel_title}</p>
        )}
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {formatViewCount(video.view_count)} · {formatPublishedDate(video.published_at)}
        </p>
        {video.summary && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{video.summary}</p>
        )}
      </div>
    </Link>
  );
}
