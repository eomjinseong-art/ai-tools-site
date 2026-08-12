import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "나두AI - 대한민국 AI 도구 사용법 모음",
  description:
    "챗GPT, 클로드, 미드저니 등 인기 AI 툴의 사용법을 유튜브 영상 요약으로 빠르게 배워보세요. 나두AI에서 매일 업데이트되는 AI 툴 가이드를 확인하세요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
