import type { AdminNavigationGroup } from "@/features/admin/shared/types/admin-common.types";
import { createAdminHref } from "@/features/admin/shared/constants/admin-routes";

export const adminNavigation: AdminNavigationGroup[] = [
  {
    title: "Overview",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        description: "High-level KPIs and operational pulse.",
        href: (lang) => createAdminHref(lang, "dashboard"),
      },
    ],
  },
  {
    title: "Access",
    items: [
      {
        key: "users",
        label: "Users",
        description: "Manage admin and platform user accounts.",
        href: (lang) => createAdminHref(lang, "users"),
      },
      {
        key: "roles",
        label: "Roles",
        description: "Control role definitions and permission bundles.",
        href: (lang) => createAdminHref(lang, "roles"),
      },
      {
        key: "permissions",
        label: "Permissions",
        description: "Review the available authorization surface.",
        href: (lang) => createAdminHref(lang, "permissions"),
      },
      {
        key: "auditLogs",
        label: "Audit Logs",
        description: "Trace sensitive actions and change history.",
        href: (lang) => createAdminHref(lang, "auditLogs"),
      },
    ],
  },
  {
    title: "Catalog",
    items: [
      {
        key: "categories",
        label: "Categories",
        description: "Organize customer-facing offer categories.",
        href: (lang) => createAdminHref(lang, "categories"),
      },
      {
        key: "storeCategories",
        label: "Store Categories",
        description: "Manage merchant store classification.",
        href: (lang) => createAdminHref(lang, "storeCategories"),
      },
      {
        key: "offers",
        label: "Offers",
        description: "Review approval, publish, and archival states.",
        href: (lang) => createAdminHref(lang, "offers"),
      },
      {
        key: "coupons",
        label: "Coupons",
        description: "Inspect and patch coupon-level configuration.",
        href: (lang) => createAdminHref(lang, "coupons"),
      },
      {
        key: "recommendations",
        label: "Recommendations",
        description: "Curate promoted content and placements.",
        href: (lang) => createAdminHref(lang, "recommendations"),
      },
    ],
  },
  {
    title: "Stores",
    items: [
      {
        key: "stores",
        label: "Stores",
        description: "Approve, suspend, and bill merchants.",
        href: (lang) => createAdminHref(lang, "stores"),
      },
      {
        key: "storeVerifications",
        label: "Store Verifications",
        description: "Process merchant verification reviews.",
        href: (lang) => createAdminHref(lang, "storeVerifications"),
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        key: "redemptions",
        label: "Redemptions",
        description: "Investigate redemption activity and fraud flags.",
        href: (lang) => createAdminHref(lang, "redemptions"),
      },
      {
        key: "inventory",
        label: "Inventory",
        description: "Review inventory transaction movements.",
        href: (lang) => createAdminHref(lang, "inventory"),
      },
      {
        key: "payments",
        label: "Payments",
        description: "Monitor payment activity and anomalies.",
        href: (lang) => createAdminHref(lang, "payments"),
      },
    ],
  },
  {
    title: "Billing",
    items: [
      {
        key: "billingProfiles",
        label: "Billing Profiles",
        description: "Reference store billing profile data.",
        href: (lang) => createAdminHref(lang, "billingProfiles"),
      },
      {
        key: "invoices",
        label: "Invoices",
        description: "Issue, void, and reconcile invoices.",
        href: (lang) => createAdminHref(lang, "invoices"),
      },
      {
        key: "commissions",
        label: "Commissions",
        description: "Track payout status and invoicing workflow.",
        href: (lang) => createAdminHref(lang, "commissions"),
      },
      {
        key: "subscriptions",
        label: "Subscriptions",
        description: "Manage merchant subscription lifecycle state.",
        href: (lang) => createAdminHref(lang, "subscriptions"),
      },
      {
        key: "subscriptionPlans",
        label: "Subscription Plans",
        description: "Maintain plan catalog and pricing definitions.",
        href: (lang) => createAdminHref(lang, "subscriptionPlans"),
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        key: "contactCustomer",
        label: "Contact / Customer",
        description: "Handle customer support tickets.",
        href: (lang) => createAdminHref(lang, "contactCustomer"),
      },
      {
        key: "contactSeller",
        label: "Contact / Seller",
        description: "Handle seller support tickets.",
        href: (lang) => createAdminHref(lang, "contactSeller"),
      },
      {
        key: "notifyMe",
        label: "Notify Me",
        description: "Review notify-me requests and follow-ups.",
        href: (lang) => createAdminHref(lang, "notifyMe"),
      },
      {
        key: "notificationsBroadcast",
        label: "Notifications / Broadcast",
        description: "Send broadcast notifications across the platform.",
        href: (lang) => createAdminHref(lang, "notificationsBroadcast"),
      },
      {
        key: "chatbotSessions",
        label: "Chatbot Sessions",
        description: "Inspect support chatbot conversations.",
        href: (lang) => createAdminHref(lang, "chatbotSessions"),
      },
    ],
  },
];
