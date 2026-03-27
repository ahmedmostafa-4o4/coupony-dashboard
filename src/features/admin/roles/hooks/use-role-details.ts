"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getRoleById } from "../api/get-role-by-id";
import type { Role } from "../types/role.types";

export function useRoleDetails(roleId: string) {
  return useAdminResource<Role>({
    id: roleId,
    getItem: getRoleById,
  });
}
