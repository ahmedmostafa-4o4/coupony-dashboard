"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  type UserRoleAssignmentFormValues,
  userRoleAssignmentFormSchema,
} from "../schemas/user-form.schema";
import type { AssignUserRoleRequest } from "../types/user.types";

const fields: AdminFormField<UserRoleAssignmentFormValues>[] = [
  {
    key: "roleId",
    label: "Role ID",
    placeholder: "Role UUID",
  },
  {
    key: "storeId",
    label: "Store ID",
    placeholder: "Optional store UUID",
  },
  {
    key: "branchId",
    label: "Branch ID",
    placeholder: "Optional branch UUID",
  },
];

export function UserRoleForm({
  description,
  isSubmitting,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  isSubmitting?: boolean;
  onSubmit: (payload: AssignUserRoleRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  return (
    <AdminSchemaForm
      description={description}
      fields={fields}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={userRoleAssignmentFormSchema}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
