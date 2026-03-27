"use client";

import { useEffect, useState, type ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { cn } from "@/lib/utils/cn";

export function AppShell({
  children,
  lang,
}: {
  children: ReactNode;
  lang: string;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] =
    useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6f4ef_0%,#f3f2ee_100%)] text-slate-950">
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-[2px] transition xl:hidden",
          isSidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[min(26rem,100vw)] -translate-x-full transition-transform duration-300 ease-out xl:hidden",
          isSidebarOpen && "translate-x-0"
        )}
      >
        <Sidebar
          lang={lang}
          className="h-dvh max-w-none border-r-0 shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
          headerAction={
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
              aria-label="Close navigation menu"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6 6 18" />
              </svg>
            </button>
          }
        />
      </div>

      <div className="flex min-h-screen">
        <div className="hidden xl:block">
          <Sidebar
            lang={lang}
            collapsed={isDesktopSidebarCollapsed}
            onToggleCollapse={() =>
              setIsDesktopSidebarCollapsed((current) => !current)
            }
          />
        </div>
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Topbar lang={lang} onOpenSidebar={() => setIsSidebarOpen(true)} />
          <main className="flex-1 px-6 py-6 xl:px-8 xl:py-8">
            <div className="min-h-full rounded-[32px] border border-slate-200 bg-[#fcfcfb] p-4 shadow-[0_24px_60px_rgba(15,23,42,0.05)] xl:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
