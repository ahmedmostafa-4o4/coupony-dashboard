"use client";

import { useAdminAction } from "@/features/admin/shared";

import { createRole } from "../api/create-role";
import { deleteRole } from "../api/delete-role";
import { updateRole } from "../api/update-role";
import type {
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

    deleteAction: useAdminAction({
      action: deleteRole,
      onSuccess,
    }),
  };
}
