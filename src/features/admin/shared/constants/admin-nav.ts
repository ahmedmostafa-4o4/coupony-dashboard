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
        key: "banners",
        label: "Banners",
        description: "Manage and approve store promotional banners.",
        href: (lang) => createAdminHref(lang, "banners"),
      },
      {
        key: "travelBanners",
        label: "Travel Banners",
        description: "Manage and create banners for travel products.",
        href: (lang) => createAdminHref(lang, "travelBanners"),
      },
      {
        key: "products",
        label: "Products",
        description: "Create, update, and inspect live catalog products.",
        href: (lang) => createAdminHref(lang, "products"),
      },
      {
        key: "productRevisions",
        label: "Product Revisions",
        description:
          "Review seller-submitted product changes awaiting approval.",
        href: (lang) => createAdminHref(lang, "productRevisions"),
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
        key: "offerClaims",
        label: "Offer Claims",
        description: "Manage and audit customer offer claims.",
        href: (lang) => createAdminHref(lang, "offerClaims"),
      },
      {
        key: "bannerClaims",
        label: "Banner Claims",
        description: "Manage and audit store banner claims.",
        href: (lang) => createAdminHref(lang, "bannerClaims"),
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
        key: "notificationCenter",
        label: "Notification Center",
        description: "View and manage admin notifications.",
        href: (lang) => createAdminHref(lang, "notificationCenter"),
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
