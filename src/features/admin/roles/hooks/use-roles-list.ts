"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getRoles } from "../api/get-roles";
import type { Role, RolesListFilters } from "../types/role.types";

export function useRolesList(filters: RolesListFilters) {
  return useAdminCollection<Role, RolesListFilters>({
    filters,
    getItems: getRoles,
  });
}
