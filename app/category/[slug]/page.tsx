import { redirect } from "next/navigation";

// The category browsing UI now lives in the single 3-panel app at "/".
// This route stays around only so old bookmarked/shared links keep working.
export default function CategoryRedirectPage({ params }: { params: { slug: string } }) {
  redirect(`/?category=${params.slug}`);
}
