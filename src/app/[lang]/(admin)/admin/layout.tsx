import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <AppShell lang={lang}>{children}</AppShell>;
}
