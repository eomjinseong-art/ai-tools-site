import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-16 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex flex-col gap-3">
          <p>
            &copy; {new Date().getFullYear()} 나두AI. 모든 영상 콘텐츠의 저작권은 각 원저작자에게
            있으며, 본 사이트는 AI로 재구성한 요약 정보만 제공합니다.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed dark:text-gray-500">
            나두AI가 제공하는 AI 요약 정보는 정확성이나 최신성을 보장하지 않습니다. 정확한 내용은
            반드시 원본 영상을 통해 직접 확인해 주세요.
          </p>
          <div className="flex gap-4 pt-1">
            <Link href="/privacy" className="hover:text-brand-600 dark:hover:text-brand-500">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="hover:text-brand-600 dark:hover:text-brand-500">
              이용약관
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-3 dark:text-gray-200">문의하기</h3>
          <ContactForm />
        </div>
      </div>
    </footer>
  );
}
