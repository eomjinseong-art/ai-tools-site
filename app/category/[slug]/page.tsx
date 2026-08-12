import { redirect } from "next/navigation";

// The category browsing UI now lives in the single 3-panel app at "/".
// This route stays around only so old links (and internal navigation from
// the carousel/guidebook page) keep working.
export default function CategoryRedirectPage({ params }: { params: { slug: string } }) {
  redirect(`/?category=${params.slug}`);
}
