import type { ReactNode } from "react";

import Link from "next/link";

import { LogoutButton } from "@/components/layout/logout-button";
import { AdminNavigation } from "@/components/navigation/admin-nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

function SidebarLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M7 5.5C4.79086 5.5 3 8.18629 3 11.5C3 14.8137 4.79086 17.5 7 17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 4C9.23858 4 7 7.35786 7 11.5C7 15.6421 9.23858 19 12 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M17 5.5C14.7909 5.5 13 8.18629 13 11.5C13 14.8137 14.7909 17.5 17 17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ToggleIcon({ collapsed }: { collapsed: boolean }) {
  return (
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
      {collapsed ? <path d="m9 6 6 6-6 6" /> : <path d="m15 6-6 6 6 6" />}
    </svg>
  );
}

export function Sidebar({
  lang,
  className,
  headerAction,
  collapsed = false,
  onToggleCollapse,
}: {
  lang: string;
  className?: string;
  headerAction?: ReactNode;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen w-full flex-col gap-4 overflow-hidden border-r border-slate-200 bg-[#f7f6f3] px-3 py-4 transition-[max-width,padding] duration-300 ease-in-out",
        collapsed ? "max-w-[96px]" : "max-w-[420px] px-4",
        className
      )}
    >
      <div
        className={cn(
          "rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300 ease-in-out",
          collapsed ? "px-2 py-3" : "px-4 py-4"
        )}
      >
        <div
          className={cn(
            "flex transition-all duration-300 ease-in-out",
            collapsed
              ? "flex-col items-center gap-3"
              : "items-center justify-between"
          )}
        >
          <div
            className={cn(
              "flex items-center transition-all duration-300 ease-in-out",
              collapsed ? "gap-0" : "gap-3"
            )}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
              <SidebarLogo />
            </div>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200 ease-in-out",
                collapsed
                  ? "max-w-0 translate-x-[-8px] opacity-0"
                  : "max-w-[220px] translate-x-0 opacity-100"
              )}
            >
              <div>
                <p className="text-lg font-semibold tracking-tight text-slate-950">
                  {siteConfig.adminTitle}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Admin workspace
                </p>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "flex items-center gap-2 transition-all duration-300 ease-in-out",
              collapsed ? "flex-col" : ""
            )}
          >
            {headerAction}
            {onToggleCollapse ? (
              <button
                type="button"
                onClick={onToggleCollapse}
                className={cn(
                  "flex items-center justify-center border border-slate-200 text-slate-500 transition-all duration-300 ease-in-out hover:bg-slate-50",
                  collapsed
                    ? "h-11 w-11 rounded-2xl bg-white text-slate-700 shadow-sm"
                    : "h-9 w-9 rounded-full bg-white"
                )}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <ToggleIcon collapsed={collapsed} />
              </button>
            ) : null}
            <div
              className={cn(
                "overflow-hidden transition-all duration-200 ease-in-out",
                collapsed
                  ? "max-w-0 translate-x-2 opacity-0"
                  : "max-w-[64px] translate-x-0 opacity-100"
              )}
            >
              <Link
                href={`/${lang}/admin`}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500"
              >
                {lang}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <AdminNavigation lang={lang} collapsed={collapsed} />
      </div>

      <div
        className={cn(
          "shrink-0 rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300 ease-in-out",
          collapsed ? "px-2 py-2" : "p-3"
        )}
      >
        <div
          className={cn(
            "overflow-hidden transition-all duration-200 ease-in-out",
            collapsed ? "mb-0 max-h-0 opacity-0" : "mb-3 max-h-8 opacity-100 px-2"
          )}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Session
          </p>
        </div>
        <div className={cn(collapsed ? "flex justify-center" : "")}>
          <LogoutButton
            className={cn(
              "justify-center rounded-2xl transition-all duration-300 ease-in-out",
              collapsed ? "h-11 w-11 px-0" : "w-full"
            )}
            compact={collapsed}
          />
        </div>
      </div>
    </aside>
  );
}
