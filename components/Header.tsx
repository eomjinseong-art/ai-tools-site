import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import VisitorCount from "@/components/VisitorCount";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-40 dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-gray-100">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white text-sm">
            AI
          </span>
          <span>나두AI</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-500">
              홈
            </Link>
            <Link href="/guidebook" className="hover:text-brand-600 dark:hover:text-brand-500">
              가이드북
            </Link>
          </nav>
          <div className="flex items-center gap-3 border-l border-gray-200 pl-4 dark:border-gray-800">
            <VisitorCount />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
