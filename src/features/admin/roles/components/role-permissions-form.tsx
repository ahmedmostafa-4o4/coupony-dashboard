"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  rolePermissionsFormSchema,
  type RolePermissionsFormValues,
} from "../schemas/role-form.schema";
import type { UpdateRolePermissionsRequest } from "../types/role.types";

const fields: AdminFormField<RolePermissionsFormValues>[] = [
  {
    key: "permissionIds",
    label: "Permission IDs",
    description: "Comma or newline separated permission UUIDs.",
    placeholder: "permission-uuid-1, permission-uuid-2",
    type: "textarea",
  },
];

export function RolePermissionsForm({
  description,
  isSubmitting,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  isSubmitting?: boolean;
  onSubmit: (payload: UpdateRolePermissionsRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  return (
    <AdminSchemaForm
      description={description}
      fields={fields}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={rolePermissionsFormSchema}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
