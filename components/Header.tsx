import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white text-sm">
            AI
          </span>
          <span>나두AI</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-brand-600">
            홈
          </Link>
          <Link href="/guidebook" className="hover:text-brand-600">
            가이드북
          </Link>
        </nav>
      </div>
    </header>
  );
}
