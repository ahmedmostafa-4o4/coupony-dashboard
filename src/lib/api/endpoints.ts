function segment(value: string) {
  return encodeURIComponent(value);
}

export const apiEndpoints = {
  admin: {
    dashboard: "/admin/dashboard",
    users: {
      list: "/admin/users",
      detail: (userId: string) => `/admin/users/${segment(userId)}`,
      activate: (userId: string) => `/admin/users/${segment(userId)}/activate`,
      suspend: (userId: string) => `/admin/users/${segment(userId)}/suspend`,
      delete: (userId: string) => `/admin/users/${segment(userId)}/delete`,
      roles: (userId: string) => `/admin/users/${segment(userId)}/roles`,
      roleAssignment: (userId: string, assignmentId: string) =>
        `/admin/users/${segment(userId)}/roles/${segment(assignmentId)}`,
    },
    roles: {
      list: "/admin/roles",
      detail: (roleId: string) => `/admin/roles/${segment(roleId)}`,
      permissions: (roleId: string) =>
        `/admin/roles/${segment(roleId)}/permissions`,
    },
    permissions: {
      list: "/admin/permissions",
    },
    auditLogs: {
      list: "/admin/audit-logs",
    },
    categories: {
      list: "/admin/categories",
      detail: (categoryId: string) =>
        `/admin/categories/${segment(categoryId)}`,
    },
    storeCategories: {
      list: "/admin/store-categories",
      detail: (storeCategoryId: string) =>
        `/admin/store-categories/${segment(storeCategoryId)}`,
    },
    stores: {
      list: "/admin/stores",
      detail: (storeId: string) => `/admin/stores/${segment(storeId)}`,
      approve: (storeId: string) => `/admin/stores/${segment(storeId)}/approve`,
      reject: (storeId: string) => `/admin/stores/${segment(storeId)}/reject`,
      suspend: (storeId: string) => `/admin/stores/${segment(storeId)}/suspend`,
      close: (storeId: string) => `/admin/stores/${segment(storeId)}/close`,
      billingProfile: (storeId: string) =>
        `/admin/stores/${segment(storeId)}/billing/profile`,
    },
    storeVerifications: {
      list: "/admin/store-verifications",
      detail: (verificationId: string) =>
        `/admin/store-verifications/${segment(verificationId)}`,
      approve: (verificationId: string) =>
        `/admin/store-verifications/${segment(verificationId)}/approve`,
      reject: (verificationId: string) =>
        `/admin/store-verifications/${segment(verificationId)}/reject`,
    },
    offers: {
      list: "/admin/offers",
      detail: (offerId: string) => `/admin/offers/${segment(offerId)}`,
      approve: (offerId: string) => `/admin/offers/${segment(offerId)}/approve`,
      reject: (offerId: string) => `/admin/offers/${segment(offerId)}/reject`,
      publish: (offerId: string) => `/admin/offers/${segment(offerId)}/publish`,
      archive: (offerId: string) => `/admin/offers/${segment(offerId)}/archive`,
    },
    coupons: {
      list: "/admin/coupons",
      detail: (couponId: string) => `/admin/coupons/${segment(couponId)}`,
    },
    redemptions: {
      list: "/admin/redemptions",
      detail: (redemptionId: string) =>
        `/admin/redemptions/${segment(redemptionId)}`,
      timeline: (redemptionId: string) =>
        `/admin/redemptions/${segment(redemptionId)}/timeline`,
      fraudBlock: (redemptionId: string) =>
        `/admin/redemptions/${segment(redemptionId)}/fraud-block`,
    },
    billing: {
      profiles: {
        list: "/admin/billing/profiles",
      },
      invoices: {
        list: "/admin/invoices",
        detail: (invoiceId: string) => `/admin/invoices/${segment(invoiceId)}`,
        issue: (invoiceId: string) => `/admin/invoices/${segment(invoiceId)}/issue`,
        markPaid: (invoiceId: string) =>
          `/admin/invoices/${segment(invoiceId)}/mark-paid`,
        void: (invoiceId: string) => `/admin/invoices/${segment(invoiceId)}/void`,
      },
      commissions: {
        list: "/admin/commissions",
        detail: (commissionId: string) =>
          `/admin/commissions/${segment(commissionId)}`,
        markInvoiced: (commissionId: string) =>
          `/admin/commissions/${segment(commissionId)}/mark-invoiced`,
        markPaid: (commissionId: string) =>
          `/admin/commissions/${segment(commissionId)}/mark-paid`,
        waive: (commissionId: string) =>
          `/admin/commissions/${segment(commissionId)}/waive`,
      },
      subscriptions: {
        list: "/admin/subscriptions",
        detail: (subscriptionId: string) =>
          `/admin/subscriptions/${segment(subscriptionId)}`,
      },
      subscriptionPlans: {
        list: "/admin/subscription-plans",
        detail: (planId: string) => `/admin/subscription-plans/${segment(planId)}`,
      },
      payments: {
        list: "/admin/payments",
      },
      inventory: {
        list: "/admin/inventory/transactions",
      },
    },
    recommendations: {
      list: "/admin/recommendations",
    },
    contact: {
      customer: {
        list: "/admin/contact/customer",
        detail: (ticketId: string) =>
          `/admin/contact/customer/${segment(ticketId)}`,
      },
      seller: {
        list: "/admin/contact/seller",
        detail: (ticketId: string) =>
          `/admin/contact/seller/${segment(ticketId)}`,
      },
    },
    notifications: {
      broadcast: "/admin/notifications/broadcast",
    },
    notifyMe: {
      list: "/admin/notify-me",
    },
    chatbot: {
      sessions: {
        list: "/admin/chatbot/sessions",
        detail: (sessionId: string) =>
          `/admin/chatbot/sessions/${segment(sessionId)}`,
      },
    },
  },
} as const;
