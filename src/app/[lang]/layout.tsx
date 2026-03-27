import type { ReactNode } from "react";

import { notFound } from "next/navigation";

import { isSupportedLocale, supportedLocales } from "@/config/locales";

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSupportedLocale(lang)) {
    notFound();
  }

  return <>{children}</>;
}
