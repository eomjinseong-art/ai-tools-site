export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>&copy; {new Date().getFullYear()} AI 툴 교육. 모든 콘텐츠는 유튜브 영상 요약을 기반으로 합니다.</p>
        <p>매일 자동으로 최신 영상을 수집합니다.</p>
      </div>
    </footer>
  );
}
