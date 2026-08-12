"use client";

import { useEffect, useState } from "react";

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
}

export default function ThemeToggle() {
  // Starts null so the button renders identically on server and first client
  // paint (the blocking script in layout.tsx already set the real class on
  // <html> before hydration) — avoids a hydration mismatch flash.
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  if (isDark === null) {
    return <span className="inline-block h-8 w-8" aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(!isDark);
        setIsDark(!isDark);
      }}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
