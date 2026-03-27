"use client";

import type { ReactNode } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNavigation } from "@/features/admin/shared";
import { cn } from "@/lib/utils/cn";

function Glyph({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
    >
      {children}
    </svg>
  );
}

function NavIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
      {children}
    </span>
  );
}

function RailIcon({ title }: { title: string }) {
  switch (title) {
    case "Overview":
      return (
        <Glyph>
          <circle cx="12" cy="12" r="7" />
          <path d="M12 5v7l4 2" />
        </Glyph>
      );
    case "Access":
      return (
        <Glyph>
          <circle cx="8" cy="8" r="2.5" />
          <circle cx="16" cy="16" r="2.5" />
          <path d="M10 10l4 4" />
        </Glyph>
      );
    case "Catalog":
      return (
        <Glyph>
          <path d="M12 4l7 8-7 8-7-8 7-8Z" />
        </Glyph>
      );
    case "Stores":
      return (
        <Glyph>
          <path d="M4 9.5 6 5h12l2 4.5" />
          <path d="M5 9h14v10H5z" />
          <path d="M9 19v-4h6v4" />
        </Glyph>
      );
    case "Operations":
      return (
        <Glyph>
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="1.5" />
        </Glyph>
      );
    case "Billing":
      return (
        <Glyph>
          <rect x="5" y="6" width="14" height="12" rx="2.5" />
          <path d="M5 10h14" />
        </Glyph>
      );
    case "Support":
      return (
        <Glyph>
          <path d="M12 4.5 14 9l4.5 2-4.5 2-2 4.5-2-4.5-4.5-2L10 9l2-4.5Z" />
        </Glyph>
      );
    default:
      return (
        <Glyph>
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        </Glyph>
      );
  }
}

function ItemIcon({ itemKey }: { itemKey: string }) {
  switch (itemKey) {
    case "dashboard":
      return (
        <Glyph>
          <rect x="4" y="4" width="7" height="7" rx="1.5" />
          <rect x="13" y="4" width="7" height="5" rx="1.5" />
          <rect x="13" y="11" width="7" height="9" rx="1.5" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" />
        </Glyph>
      );
    case "users":
      return (
        <Glyph>
          <circle cx="9" cy="9" r="2.5" />
          <circle cx="16.5" cy="8.5" r="2" />
          <path d="M5.5 18c.8-2 2.4-3 4.5-3s3.7 1 4.5 3" />
          <path d="M14 17.5c.5-1.3 1.5-2 3-2 1.2 0 2.2.5 3 1.5" />
        </Glyph>
      );
    case "roles":
      return (
        <Glyph>
          <path d="M8 5h8v14H8z" />
          <path d="M10.5 9h3" />
          <path d="M10.5 12h3" />
          <path d="M10.5 15h3" />
        </Glyph>
      );
    case "permissions":
      return (
        <Glyph>
          <path d="M12 4l6 2v5c0 4-2.5 6.8-6 9-3.5-2.2-6-5-6-9V6l6-2Z" />
          <path d="m9.5 12 1.5 1.5 3.5-3.5" />
        </Glyph>
      );
    case "auditLogs":
      return (
        <Glyph>
          <path d="M7 5h7l3 3v11H7z" />
          <path d="M14 5v3h3" />
          <path d="M10 12h4" />
          <path d="M10 15h4" />
        </Glyph>
      );
    case "categories":
      return (
        <Glyph>
          <path d="M12 4l7 8-7 8-7-8 7-8Z" />
        </Glyph>
      );
    case "storeCategories":
      return (
        <Glyph>
          <path d="M12 5l6 4-6 4-6-4 6-4Z" />
          <path d="M6 12l6 4 6-4" />
        </Glyph>
      );
    case "offers":
      return (
        <Glyph>
          <path d="M12 4.5 14 9l4.5 2-4.5 2-2 4.5-2-4.5-4.5-2L10 9l2-4.5Z" />
        </Glyph>
      );
    case "coupons":
      return (
        <Glyph>
          <path d="M7 7h10v4a2 2 0 0 0 0 2v4H7v-4a2 2 0 0 0 0-2V7Z" />
          <path d="M12 7v10" />
        </Glyph>
      );
    case "recommendations":
      return (
        <Glyph>
          <path d="m12 5 2.2 4.5 4.8.7-3.5 3.4.8 4.9-4.3-2.3-4.3 2.3.8-4.9-3.5-3.4 4.8-.7L12 5Z" />
        </Glyph>
      );
    case "stores":
      return (
        <Glyph>
          <path d="M4 9.5 6 5h12l2 4.5" />
          <path d="M5 9h14v10H5z" />
          <path d="M9 19v-4h6v4" />
        </Glyph>
      );
    case "storeVerifications":
      return (
        <Glyph>
          <rect x="7" y="4" width="10" height="16" rx="2" />
          <path d="m9.5 12 1.5 1.5 3.5-3.5" />
        </Glyph>
      );
    case "redemptions":
      return (
        <Glyph>
          <circle cx="12" cy="12" r="7" />
          <path d="m10.5 12 1 1 2.5-2.5" />
        </Glyph>
      );
    case "inventory":
      return (
        <Glyph>
          <path d="M6 7.5A2.5 2.5 0 0 1 8.5 5h7A2.5 2.5 0 0 1 18 7.5v9A2.5 2.5 0 0 1 15.5 19h-7A2.5 2.5 0 0 1 6 16.5v-9Z" />
          <path d="M9 9h6" />
          <path d="M9 12h6" />
          <path d="M9 15h4" />
        </Glyph>
      );
    case "payments":
      return (
        <Glyph>
          <circle cx="12" cy="12" r="7" />
          <path d="M12 8v8" />
          <path d="M9.5 10c0-1 1-2 2.5-2s2.5.8 2.5 2-1 1.7-2.5 2-2.5 1-2.5 2 1 2 2.5 2 2.5-1 2.5-2" />
        </Glyph>
      );
    case "billingProfiles":
      return (
        <Glyph>
          <rect x="5" y="6" width="14" height="12" rx="2.5" />
          <path d="M5 10h14" />
        </Glyph>
      );
    case "invoices":
      return (
        <Glyph>
          <path d="M8 4h8v16l-2-1.5L12 20l-2-1.5L8 20V4Z" />
          <path d="M10 9h4" />
          <path d="M10 12h4" />
        </Glyph>
      );
    case "commissions":
      return (
        <Glyph>
          <path d="M6 18 18 6" />
          <circle cx="8" cy="8" r="2" />
          <circle cx="16" cy="16" r="2" />
        </Glyph>
      );
    case "subscriptions":
      return (
        <Glyph>
          <path d="M6 7h12" />
          <path d="M6 12h12" />
          <path d="M6 17h8" />
        </Glyph>
      );
    case "subscriptionPlans":
      return (
        <Glyph>
          <path d="M12 4l6 3v5c0 4-2.3 6.6-6 8-3.7-1.4-6-4-6-8V7l6-3Z" />
          <path d="M9.5 12h5" />
        </Glyph>
      );
    case "contactCustomer":
    case "contactSeller":
      return (
        <Glyph>
          <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6A2.5 2.5 0 0 1 16.5 16H11l-4 3v-3H7.5A2.5 2.5 0 0 1 5 13.5v-6Z" />
        </Glyph>
      );
    case "notifyMe":
      return (
        <Glyph>
          <path d="M12 5v4" />
          <path d="M17 10a5 5 0 1 0-10 0c0 2.4-1 3.4-2 4.5h14c-1-1.1-2-2.1-2-4.5Z" />
          <path d="M10 18a2 2 0 0 0 4 0" />
        </Glyph>
      );
    case "notificationsBroadcast":
      return (
        <Glyph>
          <path d="M5 13.5V10a7 7 0 0 1 14 0v3.5" />
          <path d="M7 16h10" />
          <path d="M10 19h4" />
        </Glyph>
      );
    case "chatbotSessions":
      return (
        <Glyph>
          <path d="M7 7.5A2.5 2.5 0 0 1 9.5 5h5A2.5 2.5 0 0 1 17 7.5v5A2.5 2.5 0 0 1 14.5 15H12l-3 3v-3H9.5A2.5 2.5 0 0 1 7 12.5v-5Z" />
          <circle cx="10" cy="10" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="12" cy="10" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="14" cy="10" r="0.7" fill="currentColor" stroke="none" />
        </Glyph>
      );
    default:
      return (
        <Glyph>
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        </Glyph>
      );
  }
}

export function AdminNavigation({
  lang,
  collapsed = false,
}: {
  lang: string;
  collapsed?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full min-h-0 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)] transition-all duration-300 ease-in-out">
      <div
        className={cn(
          "flex shrink-0 flex-col items-center gap-3 bg-[#fbfbfa] px-3 py-5 transition-all duration-300 ease-in-out",
          collapsed ? "w-full" : "w-[78px] border-r border-slate-200",
        )}
      >
        {adminNavigation.map((group) => {
          const href = group.items[0]?.href(lang) ?? `/${lang}/admin`;
          const groupIsActive = group.items.some((item) => {
            const itemHref = item.href(lang);
            return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
          });

          return (
            <Link
              key={group.title}
              href={href}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200 ease-in-out",
                groupIsActive
                  ? "bg-slate-900 text-white! shadow-lg shadow-slate-900/15"
                  : "text-slate-500 hover:bg-slate-100",
              )}
              title={group.title}
              aria-label={group.title}
            >
              <RailIcon title={group.title} />
            </Link>
          );
        })}
      </div>

      <div
        className={cn(
          "min-h-0 flex-1 overflow-hidden bg-[#fcfcfb] transition-all duration-300 ease-in-out",
          collapsed
            ? "pointer-events-none max-w-0 opacity-0"
            : "pointer-events-auto max-w-[380px] opacity-100",
        )}
      >
        <div className="h-full overflow-y-auto">
          <div className="border-b border-slate-200 px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              Workspace
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              Navigation
            </h2>
          </div>

          <nav className="space-y-7 px-4 py-4">
            {adminNavigation.map((group) => (
              <div key={group.title} className="space-y-2">
                <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  {group.title}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const href = item.href(lang);
                    const isActive =
                      pathname === href ||
                      (href !== `/${lang}/admin` &&
                        pathname.startsWith(`${href}/`));

                    return (
                      <Link
                        key={item.key}
                        href={href}
                        className={cn(
                          "group flex items-center gap-3 rounded-2xl px-3 py-3 transition",
                          isActive
                            ? "bg-slate-100 text-slate-950"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                        )}
                      >
                        <NavIcon>
                          <ItemIcon itemKey={item.key} />
                        </NavIcon>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {item.label}
                          </p>
                          <p className="truncate text-xs text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
