import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import { trimOptional } from "@/features/admin/shared/utils/admin-form-schema";

import type {
  CreateRoleRequest,
  Role,
  UpdateRoleRequest,
} from "../types/role.types";

export interface RoleFormValues {
  guardName: string;
  name: string;
  permissions: string[];
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
      permissions: [],
    },
    transform(values) {
      return {
        guard_name: trimOptional(values.guardName),
        name: values.name.trim(),
        permissions: values.permissions,
      };
    },
    validate(values) {
      return {
        name: values.name.trim() ? undefined : "Role name is required.",
        permissions: values.permissions.length > 0 ? undefined : "At least one permission is required.",
      };
    },
  };
}

export function toRoleFormValues(role?: Role | null): RoleFormValues {
  return {
    guardName: String(role?.guardName ?? ""),
    name: String(role?.name ?? ""),
    permissions: role?.permissions?.map(p => p.name) ?? [],
  };
}
