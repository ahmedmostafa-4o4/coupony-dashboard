# Admin Subscription Management API Documentation

This document details the internal Admin REST API for managing subscriptions, plans, payments, and analytics. All endpoints require the `auth:sanctum` and `role:admin` middlewares.

**Base URL:** `/api/v1/admin`

---

## 1. Subscription Plans

### List Subscription Plans
Retrieve a list of subscription plans.

**Endpoint:** `GET /subscription-plans`

**Query Parameters (Filters):**
- `is_active` (boolean, optional): Filter by active or inactive plans. Defaults to `true` if not provided.

**Response (200 OK):**
```json
{
  "message": "Subscription plans retrieved successfully.",
  "data": [
    {
      "id": "uuid",
      "name": "Premium",
      "slug": "premium",
      "price_monthly": "29.99",
      "price_yearly": "299.99",
      "features": ["ai_assistant", "priority_support"],
      "is_active": true
      // ...
    }
  ]
}
```

### Create Subscription Plan
Create a new subscription plan.

**Endpoint:** `POST /subscription-plans`

**Validation Rules:**
- `name` (required, string, max:255)
- `slug` (required, string, max:255, unique in `subscription_plans`)
- `description` (nullable, string, max:1000)
- `price_monthly` (required, numeric, min:0)
- `price_yearly` (required, numeric, min:0)
- `currency` (required, string, size:3)
- `max_products` (nullable, integer, min:0)
- `max_employees` (nullable, integer, min:0)
- `max_branches` (nullable, integer, min:0)
- `features` (nullable, array)
- `grace_period_days` (required, integer, min:0)
- `degraded_period_days` (required, integer, min:0)
- `is_active` (boolean)
- `sort_order` (integer, min:0)

### Update Subscription Plan (Versioning Logic)
Update an existing plan.

**Endpoint:** `PATCH /subscription-plans/{id}`

> [!IMPORTANT]
> **Versioning Logic:** This endpoint does *not* modify the existing row in place. Instead, it renames the old plan's slug, marks it as `is_active = false`, and creates a brand new plan with the updated details. This safely grandfathers any stores currently subscribed to the old plan.

**Validation Rules:**
Same as `POST`, but `sometimes` is applied (all fields optional). The `slug` does not enforce uniqueness in the request to allow the versioning logic to inherit it smoothly.

### Delete Subscription Plan
Soft-deletes a plan.

**Endpoint:** `DELETE /subscription-plans/{id}`

> [!NOTE]
> **Logic:** Sets `is_active = false` and appends a `-deleted-{timestamp}` suffix to the slug. This prevents constraint errors and keeps foreign keys intact for historical subscriptions.

---

## 2. Store Subscriptions

### List Subscriptions
Retrieve all active and historical store subscriptions.

**Endpoint:** `GET /subscriptions`

**Query Parameters (Filters):**
- `status` (string, optional): e.g., `active`, `suspended`, `cancelled`.
- `store_id` (uuid, optional): Filter by a specific store.
- `plan_id` (uuid, optional): Filter by a specific plan.
- `per_page` (integer, optional): Pagination size (default: 15).

**Response (200 OK):** Includes pagination metadata and nested `store` and `plan` resources.

### Show Subscription
Retrieve detailed subscription information including audit logs.

**Endpoint:** `GET /subscriptions/{id}`

### Assign Subscription to Store (Admin Override)
Force-assign a specific subscription plan to a store, bypassing normal payments.

**Endpoint:** `POST /subscriptions/{store_id}/assign`

**Validation Rules:**
- `plan_id` (required, string, exists in `subscription_plans`)
- `billing_cycle` (required, string, in: `monthly`, `yearly`)

> [!TIP]
> **Logic:** This endpoint generates a `$0` payment session marked as `PAID` with the Paymob reference `ADMIN_OVERRIDE_{timestamp}`. It immediately activates the subscription and logs it in the `SubscriptionHistory`.

### Suspend Subscription
Force suspend a store's subscription.

**Endpoint:** `POST /subscriptions/{id}/suspend`

**Validation Rules:**
- `reason` (nullable, string, max:1000)

**Logic:** Triggers the `TransitionSubscriptionAction` to safely halt subscription features without deleting historical records.

### Cancel Subscription
Force cancel a store's subscription.

**Endpoint:** `POST /subscriptions/{id}/cancel`

**Validation Rules:**
- `reason` (nullable, string, max:1000)

---

## 3. Payment Sessions

### List Payment Sessions
Retrieve all generated payment sessions (both automated and manual).

**Endpoint:** `GET /payment-sessions`

**Query Parameters (Filters):**
- `status` (string, optional): e.g., `pending`, `paid`, `failed`.
- `store_id` (uuid, optional): Filter by a specific store.
- `search` (string, optional): Search by Paymob order ID, transaction ID, or store name.
- `per_page` (integer, optional): Pagination size (default: 15).

### Approve Pending Payment (Manual Payment)
Manually approve a payment session that was paid outside the system (e.g. Bank Transfer).

**Endpoint:** `POST /payment-sessions/{session_id}/approve`

**Validation Rules:**
- `payment_method` (required, string, max:50) - e.g., "Bank Transfer", "Cash".
- `notes` (nullable, string, max:1000)

> [!IMPORTANT]
> **Logic:** Validates that the session is `PENDING`. Updates the session to `PAID`, sets the `paid_at` timestamp, appends the notes to the system records, and triggers `ConfirmPaymentAction` to activate the store's subscription immediately.

### Fail Pending Payment
Manually mark a pending payment session as failed.

**Endpoint:** `POST /payment-sessions/{session_id}/fail`

**Validation Rules:**
- `reason` (nullable, string, max:1000)

**Logic:** Validates that the session is `PENDING`. Updates the status to `FAILED`.

---

## 4. Subscription Analytics

### Retrieve Statistics
Dashboard endpoint for subscription-related metrics.

**Endpoint:** `GET /subscription-analytics`

**Logic / Metrics Returned:**
- `active_subscribers` (int): Total subscriptions currently in the `ACTIVE` state.
- `total_revenue` (float): Sum of `amount` across all `PAID` payment sessions.
- `mrr` (float): Monthly Recurring Revenue. Calculated dynamically by summing the `price_monthly` of the plans attached to all currently active subscriptions.
- `churn_last_30_days` (int): Count of subscriptions that transitioned to `CANCELLED` or `SUSPENDED` in the last 30 days.

**Response (200 OK):**
```json
{
  "message": "Subscription analytics retrieved successfully.",
  "data": {
    "active_subscribers": 142,
    "total_revenue": 15400.50,
    "mrr": 4250.00,
    "churn_last_30_days": 3
  }
}
```
