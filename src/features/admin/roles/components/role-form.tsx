"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  createRoleFormSchema,
  toRoleFormValues,
  type RoleFormValues,
} from "../schemas/role-form.schema";
import type { CreateRoleRequest, Role, UpdateRoleRequest } from "../types/role.types";

import type { PermissionDto } from "../types/roles.dto";

export function RoleForm({
  description,
  initialValues,
  isSubmitting,
  permissionsList,
  mode,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  initialValues?: Role | null;
  isSubmitting?: boolean;
  permissionsList: PermissionDto[];
  mode: "create";
  onSubmit: (payload: CreateRoleRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
} | {
  description: string;
  initialValues?: Role | null;
  isSubmitting?: boolean;
  permissionsList: PermissionDto[];
  mode: "update";
  onSubmit: (payload: UpdateRoleRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  const fields: AdminFormField<RoleFormValues>[] = [
    {
      key: "name",
      label: "Role name",
      placeholder: "operations-admin",
    },
    {
      key: "guardName",
      label: "Guard name",
      placeholder: "web",
    },
    {
      key: "permissions",
      label: "Permissions",
      type: "checkbox-group",
      options: permissionsList.map((p) => ({
        label: p.name,
        value: p.name,
      })),
    },
  ];
  if (mode === "create") {
    return (
      <AdminSchemaForm
        description={description}
        fields={fields}
        initialValues={toRoleFormValues(initialValues)}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        schema={createRoleFormSchema("create")}
        submitLabel={submitLabel}
        title={title}
      />
    );
  }

  return (
    <AdminSchemaForm
      description={description}
      fields={fields}
      initialValues={toRoleFormValues(initialValues)}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={createRoleFormSchema("update")}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
