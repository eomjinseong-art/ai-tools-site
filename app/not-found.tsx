import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">페이지를 찾을 수 없습니다</h1>
      <p className="mt-3 text-gray-500 dark:text-gray-400">요청하신 페이지가 존재하지 않거나 삭제되었습니다.</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
