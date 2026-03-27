"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  createRoleFormSchema,
  toRoleFormValues,
  type RoleFormValues,
} from "../schemas/role-form.schema";
import type { CreateRoleRequest, Role, UpdateRoleRequest } from "../types/role.types";

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
];

export function RoleForm({
  description,
  initialValues,
  isSubmitting,
  mode,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  initialValues?: Role | null;
  isSubmitting?: boolean;
  mode: "create";
  onSubmit: (payload: CreateRoleRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
} | {
  description: string;
  initialValues?: Role | null;
  isSubmitting?: boolean;
  mode: "update";
  onSubmit: (payload: UpdateRoleRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
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
