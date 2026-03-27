"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNavigation } from "@/features/admin/shared";
import { cn } from "@/lib/utils/cn";

export function AdminNavigation({ lang }: { lang: string }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-8">
      {adminNavigation.map((group) => (
        <div key={group.title} className="space-y-3">
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            {group.title}
          </p>
          <div className="space-y-1">
            {group.items.map((item) => {
              const href = item.href(lang);
              const isActive =
                pathname === href ||
                (href !== `/${lang}/admin` && pathname.startsWith(`${href}/`));

              return (
                <Link
                  key={item.key}
                  href={href}
                  className={cn(
                    "group flex flex-col rounded-2xl px-3 py-2.5 transition",
                    isActive
                      ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  )}
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  <span
                    className={cn(
                      "text-xs leading-5",
                      isActive ? "text-slate-300" : "text-slate-400"
                    )}
                  >
                    {item.description}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
