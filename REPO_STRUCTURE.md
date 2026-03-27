# Admin Dashboard Structure

## Routing

- `src/app/[lang]/(admin)/admin/layout.tsx`
  Shared admin shell using `AppShell`.
- `src/app/[lang]/(admin)/admin/page.tsx`
  Dashboard landing page.
- `src/app/[lang]/(admin)/admin/**/page.tsx`
  Thin route files that only pass route params into feature views.
- `src/app/[lang]/(admin)/admin/**/loading.tsx`
  Lightweight route-level loading UI for the dashboard, users, and stores.

## Features

- `src/features/admin/dashboard`
  Dashboard overview API, hook, and view.
- `src/features/admin/users`, `roles`, `permissions`, `audit-logs`, `categories`, `store-categories`, `stores`, `store-verifications`, `offers`, `coupons`, `redemptions`
  Admin entity modules with feature-local API wrappers, hooks, components, types, and views.
- `src/features/admin/billing/*`
  Billing sub-features for profiles, invoices, commissions, subscriptions, plans, payments, and inventory.
- `src/features/admin/contact/*`
  Customer and seller ticket admin modules.
- `src/features/admin/notifications`
  Broadcast-only admin workflow.
- `src/features/admin/shared`
  Shared admin primitives: headers, tables, filters, status badges, routes, nav config, and generic admin hooks.

## Shared App Layers

- `src/components/layout`
  `app-shell.tsx`, `sidebar.tsx`, `topbar.tsx`.
- `src/components/navigation`
  `admin-nav.tsx`.
- `src/components/shared`
  Cross-feature loading UI.
- `src/components/ui`
  Minimal button, card, input, select, and textarea primitives.
- `src/lib/api`
  API client wrapper and endpoint catalog.
- `src/providers`
  Root provider entry point.
- `src/config`
  Site metadata and locale config.
- `src/messages`
  Base message bundle placeholder.

## Notes

- Detail pages for `roles`, `categories`, `store-categories`, `coupons`, `commissions`, `subscriptions`, and `subscription-plans` currently use safe list-scan fallbacks because the provided API surface did not include dedicated `GET by id` endpoints.
- Create/update flows that lacked a confirmed backend DTO are scaffolded with JSON payload forms and inline TODO comments in the type files.
