import Link from "next/link";

import { siteConfig } from "@/config/site";
import { AdminNavigation } from "@/components/navigation/admin-nav";

export function Sidebar({ lang }: { lang: string }) {
  return (
    <aside className="sticky top-0 flex h-screen w-full max-w-[320px] flex-col gap-8 overflow-y-auto border-r border-slate-200 bg-white/80 px-5 py-6 backdrop-blur xl:px-6">
      <div className="space-y-2">
        <Link
          href={`/${lang}/admin`}
          className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700"
        >
          Admin
        </Link>
        <div>
          <p className="text-xl font-semibold tracking-tight text-slate-950">
            {siteConfig.adminTitle}
          </p>
          <p className="text-sm leading-6 text-slate-500">
            Feature-based operations console for Coupony staff.
          </p>
        </div>
      </div>
      <AdminNavigation lang={lang} />
    </aside>
  );
}
