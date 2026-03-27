import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { AUTH_ACCESS_TOKEN_COOKIE } from "@/lib/auth/session";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const cookieStore = await cookies();
  const hasAccessToken = Boolean(
    cookieStore.get(AUTH_ACCESS_TOKEN_COOKIE)?.value
  );

  if (!hasAccessToken) {
    redirect(`/${lang}/login`);
  }

  return <AppShell lang={lang}>{children}</AppShell>;
}
