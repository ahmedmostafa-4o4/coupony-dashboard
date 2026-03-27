import Link from "next/link";

import { siteConfig } from "@/config/site";
import { AdminNavigation } from "@/components/navigation/admin-nav";
import { LogoutButton } from "@/components/layout/logout-button";
import { createAdminHref } from "@/features/admin/shared";

export function Topbar({ lang }: { lang: string }) {
  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/90 px-6 py-4 backdrop-blur xl:px-8">
      <div>
        <p className="text-sm font-medium text-slate-500">{siteConfig.name}</p>
        <h1 className="text-lg font-semibold tracking-tight text-slate-950">
          Operations command center
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <details className="xl:hidden">
          <summary className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
            Menu
          </summary>
          <div className="absolute right-6 top-20 z-20 w-[min(22rem,calc(100vw-3rem))] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
            <AdminNavigation lang={lang} />
          </div>
        </details>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          {lang}
        </span>
        <Link
          href={createAdminHref(lang, "dashboard")}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Dashboard
        </Link>
        <LogoutButton className="rounded-full" />
      </div>
    </header>
  );
}
