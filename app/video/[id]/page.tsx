import { redirect, notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

// The video detail UI now lives in the summary panel of the 3-panel app at
// "/". This route stays around only so old links (guidebook source links,
// shared URLs) keep working.
export default async function VideoRedirectPage({ params }: { params: { id: string } }) {
  const { data: video } = await supabase
    .from("videos")
    .select("category_id")
    .eq("id", params.id)
    .maybeSingle();
  if (!video) notFound();

  const { data: category } = await supabase
    .from("categories")
    .select("slug")
    .eq("id", video.category_id)
    .maybeSingle();
  if (!category) notFound();

  redirect(`/?category=${category.slug}&video=${params.id}`);
}
