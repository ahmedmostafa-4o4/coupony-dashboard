# Admin Endpoint Map

## Dashboard

- `GET /admin/dashboard` -> `src/features/admin/dashboard`

## Access

- `GET /admin/users`
- `POST /admin/users`
- `GET /admin/users/{userId}`
- `PATCH /admin/users/{userId}`
- `POST /admin/users/{userId}/activate`
- `POST /admin/users/{userId}/suspend`
- `POST /admin/users/{userId}/delete`
- `POST /admin/users/{userId}/roles`
- `DELETE /admin/users/{userId}/roles/{assignmentId}`
  Routed to `src/features/admin/users`

- `GET /admin/roles`
- `POST /admin/roles`
- `PATCH /admin/roles/{roleId}`
- `DELETE /admin/roles/{roleId}`
- `PUT /admin/roles/{roleId}/permissions`
  Routed to `src/features/admin/roles`

- `GET /admin/permissions`
  Routed to `src/features/admin/permissions`

- `GET /admin/audit-logs`
  Routed to `src/features/admin/audit-logs`

## Catalog

- `GET /admin/categories`
- `POST /admin/categories`
- `PATCH /admin/categories/{categoryId}`
- `DELETE /admin/categories/{categoryId}`
  Routed to `src/features/admin/categories`

- `GET /admin/store-categories`
- `POST /admin/store-categories`
- `PATCH /admin/store-categories/{storeCategoryId}`
- `DELETE /admin/store-categories/{storeCategoryId}`
  Routed to `src/features/admin/store-categories`

- `GET /admin/offers`
- `GET /admin/offers/{offerId}`
- `POST /admin/offers/{offerId}/approve`
- `POST /admin/offers/{offerId}/reject`
- `POST /admin/offers/{offerId}/publish`
- `POST /admin/offers/{offerId}/archive`
  Routed to `src/features/admin/offers`

- `GET /admin/coupons`
- `PATCH /admin/coupons/{couponId}`
  Routed to `src/features/admin/coupons`

- `GET /admin/recommendations`
- `POST /admin/recommendations`
  Routed to `src/features/admin/recommendations`

## Stores

- `GET /admin/stores`
- `GET /admin/stores/{storeId}`
- `PATCH /admin/stores/{storeId}`
- `POST /admin/stores/{storeId}/approve`
- `POST /admin/stores/{storeId}/reject`
- `POST /admin/stores/{storeId}/suspend`
- `POST /admin/stores/{storeId}/close`
- `PUT /admin/stores/{storeId}/billing/profile`
  Routed to `src/features/admin/stores`

- `GET /admin/store-verifications`
- `GET /admin/store-verifications/{verificationId}`
- `POST /admin/store-verifications/{verificationId}/approve`
- `POST /admin/store-verifications/{verificationId}/reject`
  Routed to `src/features/admin/store-verifications`

## Operations

- `GET /admin/redemptions`
- `GET /admin/redemptions/{redemptionId}`
- `GET /admin/redemptions/{redemptionId}/timeline`
- `POST /admin/redemptions/{redemptionId}/fraud-block`
  Routed to `src/features/admin/redemptions`

- `GET /admin/inventory/transactions`
  Routed to `src/features/admin/billing/inventory`

- `GET /admin/payments`
  Routed to `src/features/admin/billing/payments`

## Billing

- `GET /admin/billing/profiles`
  Routed to `src/features/admin/billing/billing-profiles`

- `GET /admin/invoices`
- `GET /admin/invoices/{invoiceId}`
- `POST /admin/invoices/{invoiceId}/issue`
- `POST /admin/invoices/{invoiceId}/mark-paid`
- `POST /admin/invoices/{invoiceId}/void`
  Routed to `src/features/admin/billing/invoices`

- `GET /admin/commissions`
- `POST /admin/commissions/{commissionId}/mark-invoiced`
- `POST /admin/commissions/{commissionId}/mark-paid`
- `POST /admin/commissions/{commissionId}/waive`
  Routed to `src/features/admin/billing/commissions`

- `GET /admin/subscriptions`
- `PATCH /admin/subscriptions/{subscriptionId}`
  Routed to `src/features/admin/billing/subscriptions`

- `GET /admin/subscription-plans`
- `POST /admin/subscription-plans`
- `PATCH /admin/subscription-plans/{planId}`
- `DELETE /admin/subscription-plans/{planId}`
  Routed to `src/features/admin/billing/subscription-plans`

## Support

- `GET /admin/contact/customer`
- `PATCH /admin/contact/customer/{ticketId}`
  Routed to `src/features/admin/contact/customer-tickets`

- `GET /admin/contact/seller`
- `PATCH /admin/contact/seller/{ticketId}`
  Routed to `src/features/admin/contact/seller-tickets`

- `POST /admin/notifications/broadcast`
  Routed to `src/features/admin/notifications`

- `GET /admin/notify-me`
  Routed to `src/features/admin/notify-me`

- `GET /admin/chatbot/sessions`
- `GET /admin/chatbot/sessions/{sessionId}`
  Routed to `src/features/admin/chatbot`

## Fallback Notes

- Where the provided inventory did not include a dedicated details endpoint but the requested route tree did include a details page, the scaffold currently uses a list-scan fallback in the corresponding `get-*-by-id.ts` file.
- JSON payload forms are intentionally used for ambiguous request bodies until the backend request contracts are confirmed.
