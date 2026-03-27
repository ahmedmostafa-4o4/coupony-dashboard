"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getPermissions } from "../api/get-permissions";
import type { Permission, PermissionsListFilters } from "../types/permission.types";

export function usePermissionsList(filters: PermissionsListFilters) {
  return useAdminCollection<Permission, PermissionsListFilters>({
    filters,
    getItems: getPermissions,
  });
}
