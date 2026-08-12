import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_SESSION_COOKIE = "admin_session";

export function isAdminSession(): boolean {
  const token = process.env.ADMIN_SESSION_TOKEN;
  if (!token) return false;
  return cookies().get(ADMIN_SESSION_COOKIE)?.value === token;
}

/** Call at the top of any admin server component/action. Redirects if not logged in. */
export function requireAdmin(): void {
  if (!isAdminSession()) redirect("/admin/login");
}
