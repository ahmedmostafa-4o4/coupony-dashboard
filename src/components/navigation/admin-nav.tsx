"use client";

import type { ReactNode } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNavigation } from "@/features/admin/shared";
import { cn } from "@/lib/utils/cn";
import type { GlobalDictionary } from "@/messages/get-dictionary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
    case "Stores":
      return (
        <Glyph>
          <path d="M4 9.5 6 5h12l2 4.5" />
          <path d="M5 9h14v10H5z" />
          <path d="M9 19v-4h6v4" />
        </Glyph>
      );
    case "Catalog":
      return (
        <Glyph>
          <path d="M12 4l7 8-7 8-7-8 7-8Z" />
        </Glyph>
      );
    case "Products":
      return (
        <Glyph>
          <rect x="6" y="5" width="12" height="14" rx="2" />
          <path d="M9 9h6" />
          <path d="M9 12h6" />
          <path d="M9 15h4" />
        </Glyph>
      );
    case "Banners":
      return (
        <Glyph>
          <path d="M12 4.5 14 9l4.5 2-4.5 2-2 4.5-2-4.5-4.5-2L10 9l2-4.5Z" />
        </Glyph>
      );
    case "Finance":
      return (
        <Glyph>
          <rect x="5" y="6" width="14" height="12" rx="2.5" />
          <path d="M5 10h14" />
        </Glyph>
      );
    case "Claims":
      return (
        <Glyph>
          <path d="M7 7h10v4a2 2 0 0 0 0 2v4H7v-4a2 2 0 0 0 0-2V7Z" />
          <path d="M12 7v10" />
        </Glyph>
      );
    case "Notifications":
      return (
        <Glyph>
          <path d="M12 5v4" />
          <path d="M17 10a5 5 0 1 0-10 0c0 2.4-1 3.4-2 4.5h14c-1-1.1-2-2.1-2-4.5Z" />
          <path d="M10 18a2 2 0 0 0 4 0" />
        </Glyph>
      );
    case "Support":
      return (
        <Glyph>
          <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6A2.5 2.5 0 0 1 16.5 16H11l-4 3v-3H7.5A2.5 2.5 0 0 1 5 13.5v-6Z" />
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
    case "products":
      return (
        <Glyph>
          <rect x="6" y="5" width="12" height="14" rx="2" />
          <path d="M9 9h6" />
          <path d="M9 12h6" />
          <path d="M9 15h4" />
        </Glyph>
      );
    case "productRevisions":
      return (
        <Glyph>
          <path d="M7 5h7l3 3v11H7z" />
          <path d="M14 5v3h3" />
          <path d="M10 12h4" />
          <path d="M10 15h4" />
          <path d="m9.5 9.5 1 1 2-2" />
        </Glyph>
      );
    case "coupons":
      return (
        <Glyph>
          <path d="M7 7h10v4a2 2 0 0 0 0 2v4H7v-4a2 2 0 0 0 0-2V7Z" />
          <path d="M12 7v10" />
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
    case "payments":
      return (
        <Glyph>
          <circle cx="12" cy="12" r="7" />
          <path d="M12 8v8" />
          <path d="M9.5 10c0-1 1-2 2.5-2s2.5.8 2.5 2-1 1.7-2.5 2-2.5 1-2.5 2 1 2 2.5 2 2.5-1 2.5-2" />
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

    case "notificationCenter":
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
  dict,
}: {
  lang: string;
  collapsed?: boolean;
  dict: GlobalDictionary;
}) {
  const pathname = usePathname();

  // Determine the default opened accordion group based on the active path
  const activeGroup = adminNavigation.find((group) =>
    group.items.some((item) => {
      const itemHref = item.href(lang);
      return (
        pathname === itemHref ||
        (itemHref !== `/${lang}/admin` && pathname.startsWith(`${itemHref}/`))
      );
    }),
  )?.title;

  return (
    <div
      className={cn(
        "flex h-full w-full min-h-0 flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-[#fcfcfb] shadow-[0_20px_50px_rgba(15,23,42,0.06)] transition-all duration-300 ease-in-out",
        collapsed ? "w-[78px]" : "w-[280px]",
      )}
    >
      <div
        className={cn(
          "border-b border-slate-200 transition-all duration-300",
          collapsed ? "p-5 flex justify-center" : "px-5 py-5",
        )}
      >
        {!collapsed ? (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              {dict.nav.workspace}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 truncate">
              {dict.nav.navigation}
            </h2>
          </>
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/15 shrink-0">
            <Glyph>
              <circle cx="12" cy="12" r="7" />
            </Glyph>
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden no-scrollbar",
          collapsed ? "px-3 py-5" : "px-4 py-4",
        )}
      >
        {collapsed ? (
          <div className="flex flex-col items-center gap-3">
            {adminNavigation.map((group) => {
              const groupIsActive = group.items.some((item) => {
                const itemHref = item.href(lang);
                return (
                  pathname === itemHref ||
                  (itemHref !== `/${lang}/admin` &&
                    pathname.startsWith(`${itemHref}/`))
                );
              });

              return (
                <HoverCard key={group.title} openDelay={200} closeDelay={200}>
                  <HoverCardTrigger asChild>
                    <Link
                      href={group.items[0]?.href(lang) ?? `/${lang}/admin`}
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200 ease-in-out shrink-0",
                        groupIsActive
                          ? "bg-slate-900 text-white! shadow-lg shadow-slate-900/15"
                          : "text-slate-500 hover:bg-slate-100",
                      )}
                      title={group.title}
                      aria-label={group.title}
                    >
                      <RailIcon title={group.title} />
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent
                    side="right"
                    align="start"
                    sideOffset={12}
                    className="w-64 p-3 shadow-xl border-slate-200 rounded-2xl z-50 bg-white"
                  >
                    <div className="mb-2 px-2 pb-2 border-b border-slate-100">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                        {dict.groups[group.title as keyof typeof dict.groups] ||
                          group.title}
                      </p>
                    </div>
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
                              "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition",
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
                                {dict.items[item.key as keyof typeof dict.items]
                                  ?.label || item.label}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </div>
        ) : (
          <Accordion
            type="single"
            collapsible
            defaultValue={activeGroup}
            className="w-full space-y-2"
          >
            {adminNavigation.map((group) => {
              const groupIsActive = group.items.some((item) => {
                const itemHref = item.href(lang);
                return (
                  pathname === itemHref ||
                  (itemHref !== `/${lang}/admin` &&
                    pathname.startsWith(`${itemHref}/`))
                );
              });

              return (
                <AccordionItem
                  value={group.title}
                  key={group.title}
                  className="border-none"
                >
                  <AccordionTrigger
                    className={cn(
                      "px-2 py-3 hover:no-underline rounded-2xl transition hover:bg-slate-50 data-[state=open]:bg-slate-50",
                      groupIsActive && "bg-slate-50",
                    )}
                  >
                    <div className="flex items-center gap-3 text-slate-600">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-xl transition",
                          groupIsActive
                            ? "bg-slate-900 text-white"
                            : "bg-white border border-slate-200",
                        )}
                      >
                        <RailIcon title={group.title} />
                      </div>
                      <span className="text-sm font-semibold">
                        {dict.groups[group.title as keyof typeof dict.groups] ||
                          group.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 pt-1 pl-4 pr-1">
                    <div className="space-y-1 ml-4 border-l border-slate-100 pl-4">
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
                              "group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition",
                              isActive
                                ? "bg-slate-100 text-slate-950"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-950",
                            )}
                          >
                            <NavIcon>
                              <ItemIcon itemKey={item.key} />
                            </NavIcon>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[13px] font-medium">
                                {dict.items[item.key as keyof typeof dict.items]
                                  ?.label || item.label}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>
    </div>
  );
}
