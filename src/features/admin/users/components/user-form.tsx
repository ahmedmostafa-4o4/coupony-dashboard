"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  createUserFormSchema,
  toUserFormValues,
  type UserFormValues,
} from "../schemas/user-form.schema";
import type {
  CreateUserRequest,
  UpdateUserRequest,
  User,
} from "../types/user.types";

const baseFields: AdminFormField<UserFormValues>[] = [
  {
    key: "email",
    label: "Email",
    placeholder: "admin@example.com",
    type: "email",
  },
  {
    key: "phoneNumber",
    label: "Phone number",
    placeholder: "+1 555 0100",
  },
  {
    key: "firstName",
    label: "First name",
    placeholder: "Sara",
  },
  {
    key: "lastName",
    label: "Last name",
    placeholder: "Ali",
  },
  {
    key: "status",
    label: "Status",
    placeholder: "active",
  },
  {
    key: "language",
    label: "Language",
    placeholder: "en",
  },
  {
    key: "timezone",
    label: "Timezone",
    placeholder: "Africa/Cairo",
  },
  {
    key: "roleNames",
    label: "Role names",
    description: "Comma or newline separated role names for create flows.",
    placeholder: "admin, support",
    type: "textarea",
  },
  {
    key: "twoFactorEnabled",
    label: "Two-factor enabled",
    placeholder: "Require two-factor authentication",
    type: "checkbox",
  },
];

const createFields: AdminFormField<UserFormValues>[] = [
  baseFields[0],
  {
    key: "password",
    label: "Password",
    placeholder: "Temporary password",
    type: "password",
  },
  baseFields[1],
  baseFields[2],
  baseFields[3],
  baseFields[4],
  baseFields[7],
];

const updateFields: AdminFormField<UserFormValues>[] = [
  baseFields[0],
  baseFields[1],
  baseFields[2],
  baseFields[3],
  baseFields[4],
  baseFields[5],
  baseFields[6],
  baseFields[8],
];

export function UserForm({
  description,
  initialValues,
  isSubmitting,
  mode,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  initialValues?: User | null;
  isSubmitting?: boolean;
  mode: "create";
  onSubmit: (payload: CreateUserRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
} | {
  description: string;
  initialValues?: User | null;
  isSubmitting?: boolean;
  mode: "update";
  onSubmit: (payload: UpdateUserRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  if (mode === "create") {
    return (
      <AdminSchemaForm
        description={description}
        fields={createFields}
        initialValues={toUserFormValues(initialValues)}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        schema={createUserFormSchema("create")}
        submitLabel={submitLabel}
        title={title}
      />
    );
  }

  return (
    <AdminSchemaForm
      description={description}
      fields={updateFields}
      initialValues={toUserFormValues(initialValues)}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={createUserFormSchema("update")}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
