import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({
  children,
  lang,
}: {
  children: ReactNode;
  lang: string;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="flex min-h-screen">
        <div className="hidden xl:block">
          <Sidebar lang={lang} />
        </div>
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Topbar lang={lang} />
          <main className="flex-1 px-6 py-6 xl:px-8 xl:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
