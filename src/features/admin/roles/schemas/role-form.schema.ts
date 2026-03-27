import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import { splitList, trimOptional } from "@/features/admin/shared/utils/admin-form-schema";

import type {
  CreateRoleRequest,
  Role,
  UpdateRolePermissionsRequest,
  UpdateRoleRequest,
} from "../types/role.types";

export interface RoleFormValues {
  guardName: string;
  name: string;
}

export interface RolePermissionsFormValues {
  permissionIds: string;
}

export function createRoleFormSchema(
  mode: "create"
): AdminFormSchema<RoleFormValues, CreateRoleRequest>;
export function createRoleFormSchema(
  mode: "update"
): AdminFormSchema<RoleFormValues, UpdateRoleRequest>;
export function createRoleFormSchema(
  mode: "create" | "update"
): AdminFormSchema<RoleFormValues, CreateRoleRequest | UpdateRoleRequest> {
  void mode;

  return {
    defaultValues: {
      guardName: "",
      name: "",
    },
    transform(values) {
      return {
        guard_name: trimOptional(values.guardName),
        name: values.name.trim(),
      };
    },
    validate(values) {
      return {
        name: values.name.trim() ? undefined : "Role name is required.",
      };
    },
  };
}

export const rolePermissionsFormSchema: AdminFormSchema<
  RolePermissionsFormValues,
  UpdateRolePermissionsRequest
> = {
  defaultValues: {
    permissionIds: "",
  },
  transform(values) {
    return {
      permission_ids: splitList(values.permissionIds),
    };
  },
  validate(values) {
    return {
      permissionIds: splitList(values.permissionIds).length
        ? undefined
        : "Enter at least one permission ID.",
    };
  },
};

export function toRoleFormValues(role?: Role | null): RoleFormValues {
  return {
    guardName: String(role?.guardName ?? ""),
    name: String(role?.name ?? ""),
  };
}
