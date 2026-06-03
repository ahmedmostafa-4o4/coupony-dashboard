"use client";

import { AdminSchemaForm, AdminSection } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  type UserPasswordFormValues,
  userPasswordFormSchema,
} from "../schemas/user-form.schema";
import type { UsersDictionary } from "../utils/get-dictionary";

export function UserPasswordForm({
  description,
  isSubmitting,
  onSubmit,
  submitLabel,
  title,
  dict,
}: {
  description: string;
  isSubmitting?: boolean;
  onSubmit: (payload: { password: string; passwordConfirmation: string }) => Promise<unknown>;
  submitLabel: string;
  title: string;
  dict: UsersDictionary["form"];
}) {
  const fields: AdminFormField<UserPasswordFormValues>[] = [
    {
      key: "password",
      label: dict.newPassword,
      placeholder: dict.newPasswordPlaceholder,
      type: "password",
    },
    {
      key: "passwordConfirmation",
      label: dict.confirmPassword,
      placeholder: dict.newPasswordPlaceholder,
      type: "password",
    },
  ];

  return (
    <AdminSection
      description={dict.forceChangeDesc}
      title={dict.forceChangeTitle}
    >
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 mb-4">
        <p className="text-sm text-amber-800">
          <strong>{dict.warning}</strong> {dict.warningDesc}
        </p>
      </div>
      <AdminSchemaForm
        description={description}
        fields={fields}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        schema={userPasswordFormSchema}
        submitLabel={submitLabel}
        title={title}
      />
    </AdminSection>
  );
}
