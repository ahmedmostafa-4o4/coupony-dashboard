import { resolveItemFromCollectionFallback } from "@/features/admin/shared/utils/admin-fallback";

import type { Role, RolesListResult } from "../types/role.types";

export function adaptRoleDetailsFallback(
  roleId: string,
  collection: RolesListResult
) {
  // TODO: Replace this role fallback with a dedicated GET /admin/roles/{roleId} endpoint when available.
  return resolveItemFromCollectionFallback<Role>({
    getItemId: (item) =>
      typeof item.id === "string" ? item.id : item.id ? String(item.id) : null,
    items: collection.items,
    requestedId: roleId,
    raw: collection.raw,
  });
}
