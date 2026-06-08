export const adminRouteSegments = {
  dashboard: "",
  users: "/users",
  roles: "/roles",
  permissions: "/permissions",
  auditLogs: "/audit-logs",
  categories: "/categories",
  storeCategories: "/store-categories",
  stores: "/stores",
  storeVerifications: "/store-verifications",
  products: "/products",
  productRevisions: "/product-revisions",
  offerClaims: "/offer-claims",
  banners: "/banners",
  bannerClaims: "/banner-claims",
  travelBanners: "/travel-banners",

  subscriptions: "/billing/subscriptions",
  subscriptionPlans: "/billing/subscription-plans",
  payments: "/billing/payments",
  contactCustomer: "/contact/customer",
  contactSeller: "/contact/seller",
  notificationsBroadcast: "/notifications/broadcast",
  notificationCenter: "/notifications",

  chatbotSessions: "/chatbot/sessions",
} as const;

export type AdminRouteKey = keyof typeof adminRouteSegments;

export function createAdminHref(lang: string, key: AdminRouteKey) {
  return `/${lang}/admin${adminRouteSegments[key]}`;
}

export function createAdminDetailHref(
  lang: string,
  key: AdminRouteKey,
  id: string,
  childPath = ""
) {
  const base = createAdminHref(lang, key);
  const suffix = childPath ? `/${childPath.replace(/^\//, "")}` : "";
  return `${base}/${encodeURIComponent(id)}${suffix}`;
}
