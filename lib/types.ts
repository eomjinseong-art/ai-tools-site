export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  search_keywords: string[];
  is_trend: boolean;
  sort_order: number;
  icon_url: string | null;
  created_at: string;
}

export type VideoStatus = "published" | "pending" | "excluded";

export interface Video {
  id: string;
  youtube_id: string;
  category_id: string;
  title: string;
  description: string | null;
  channel_title: string | null;
  channel_id: string | null;
  thumbnail_url: string | null;
  published_at: string | null;
  view_count: number;
  like_count: number;
  duration_seconds: number | null;
  summary: string | null;
  summary_points: string[] | null;
  transcript_lang: string | null;
  rank: number | null;
  status: VideoStatus;
  collected_at: string;
  updated_at: string;
}

export interface GuidebookSection {
  id: string;
  category_id: string | null;
  slug: string;
  title: string;
  content_markdown: string;
  source_video_ids: string[];
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type AdPlacement =
  | "home_top"
  | "home_bottom"
  | "category_sidebar"
  | "video_inline"
  | "guidebook_footer";

export interface Ad {
  id: string;
  name: string;
  placement: AdPlacement;
  image_url: string;
  link_url: string;
  alt_text: string | null;
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  sort_order: number;
  created_at: string;
}
