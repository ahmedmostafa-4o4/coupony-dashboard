"use client";

import Link from "next/link";

import { LogoutButton } from "@/components/layout/logout-button";
import { siteConfig } from "@/config/site";
import { createAdminHref } from "@/features/admin/shared";

export function Topbar({
  lang,
  onOpenSidebar,
}: {
  lang: string;
  onOpenSidebar: () => void;
}) {
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
          <div>
            <p className="text-sm font-medium text-slate-500">
              {siteConfig.name}
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Operations command center
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            {lang}
          </span>
          <Link
            href={createAdminHref(lang, "dashboard")}
            className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-medium text-white! transition hover:bg-slate-800"
          >
            Dashboard
          </Link>
          <LogoutButton className="rounded-2xl" />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex min-w-[16rem] flex-1 items-center gap-3 rounded-[22px] border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="6" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            aria-label="Search"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="Search users, stores, offers..."
            type="search"
          />
        </div>
        <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
          Quick access enabled
        </div>
      </div>
    </header>
  );
}
