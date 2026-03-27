"use client";

import { useAdminAction } from "@/features/admin/shared";

import { createRole } from "../api/create-role";
import { deleteRole } from "../api/delete-role";
import { updateRolePermissions } from "../api/update-role-permissions";
import { updateRole } from "../api/update-role";
import type {
  UpdateRolePermissionsRequest,
  UpdateRoleRequest,
} from "../types/role.types";

export function useRoleActions(onSuccess?: () => Promise<void> | void) {
  return {
    createAction: useAdminAction({
      action: createRole,
      onSuccess,
    }),
    updateAction: useAdminAction({
      action: ({
        roleId,
        payload,
      }: {
        roleId: string;
        payload: UpdateRoleRequest;
      }) => updateRole(roleId, payload),
      onSuccess,
    }),
    updatePermissionsAction: useAdminAction({
      action: ({
        roleId,
        payload,
      }: {
        roleId: string;
        payload: UpdateRolePermissionsRequest;
      }) => updateRolePermissions(roleId, payload),
      onSuccess,
    }),
    deleteAction: useAdminAction({
      action: deleteRole,
      onSuccess,
    }),
  };
}
