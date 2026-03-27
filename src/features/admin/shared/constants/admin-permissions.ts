export const adminPermissions = {
  dashboard: ["admin.dashboard.read"],
  users: [
    "admin.users.read",
    "admin.users.create",
    "admin.users.update",
    "admin.users.manage-status",
  ],
  roles: [
    "admin.roles.read",
    "admin.roles.create",
    "admin.roles.update",
    "admin.roles.delete",
  ],
  catalog: [
    "admin.categories.read",
    "admin.store-categories.read",
    "admin.offers.read",
    "admin.coupons.read",
  ],
  stores: [
    "admin.stores.read",
    "admin.store-verifications.read",
    "admin.stores.billing",
  ],
  billing: [
    "admin.billing.read",
    "admin.invoices.issue",
    "admin.commissions.manage",
    "admin.subscriptions.manage",
  ],
  support: [
    "admin.contact.read",
    "admin.notifications.broadcast",
    "admin.chatbot.read",
  ],
} as const;
