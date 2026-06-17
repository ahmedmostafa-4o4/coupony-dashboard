"use client";

import Link from "next/link";

import { LogoutButton } from "@/components/layout/logout-button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { NotificationBell } from "@/features/admin/notifications/components/notification-bell";
import { siteConfig } from "@/config/site";
import { createAdminHref } from "@/features/admin/shared";
import { getGlobalDictionary } from "@/messages/get-dictionary";

export function Topbar({
  lang,
  onOpenSidebar,
  onOpenSearch,
}: {
  lang: string;
  onOpenSidebar: () => void;
  onOpenSearch: () => void;
}) {
  const dict = getGlobalDictionary(lang);

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-[#fbfbfa]/90 px-6 py-4 backdrop-blur xl:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 xl:hidden"
            aria-label="Open navigation menu"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </button>
          <div className="sm:inline-block hidden">
            <p className="text-sm font-medium text-slate-500">
              {dict.app.name}
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              {dict.admin.subtitle}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <LanguageSwitcher currentLang={lang} />
          <button
            type="button"
            onClick={onOpenSearch}
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
            aria-label="Open global search"
            title="Search (Ctrl+K)"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="6" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <NotificationBell lang={lang} />
          <LogoutButton compact className="rounded-2xl" dict={dict.nav} />
        </div>
      </div>
    </header>
  );
}
