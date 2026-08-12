import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";

async function login(formData: FormData) {
  "use server";
  const password = formData.get("password");
  const token = process.env.ADMIN_SESSION_TOKEN;

  if (password && token && password === process.env.ADMIN_PASSWORD) {
    cookies().set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    redirect("/admin");
  }
  redirect("/admin/login?error=1");
}

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="mx-auto max-w-sm py-16">
      <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">관리자 로그인</h1>
      <form action={login} className="flex flex-col gap-3">
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          required
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
        <button
          type="submit"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          로그인
        </button>
        {searchParams.error && (
          <p className="text-sm text-red-500">비밀번호가 올바르지 않습니다.</p>
        )}
      </form>
    </div>
  );
}
