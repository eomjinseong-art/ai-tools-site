"use client";

import { useRef } from "react";
import ContactForm from "@/components/ContactForm";

export default function ContactModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        문의하기
      </button>
      <dialog
        ref={dialogRef}
        className="rounded-xl p-0 backdrop:bg-black/50 dark:bg-gray-900"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="w-[90vw] max-w-sm p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">문의하기</h3>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="닫기"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <ContactForm />
        </div>
      </dialog>
    </>
  );
}
