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
import type { UsersDictionary } from "../utils/get-dictionary";

export function UserForm({
  description,
  initialValues,
  isSubmitting,
  mode,
  onSubmit,
  rolesList = [],
  submitLabel,
  title,
  dict,
}: {
  description: string;
  initialValues?: User | null;
  isSubmitting?: boolean;
  mode: "create";
  onSubmit: (payload: CreateUserRequest) => Promise<unknown>;
  rolesList?: { name: string }[];
  submitLabel: string;
  title: string;
  dict: UsersDictionary["form"];
} | {
  description: string;
  initialValues?: User | null;
  isSubmitting?: boolean;
  mode: "update";
  onSubmit: (payload: UpdateUserRequest) => Promise<unknown>;
  rolesList?: { name: string }[];
  submitLabel: string;
  title: string;
  dict: UsersDictionary["form"];
}) {
  const baseFields: AdminFormField<UserFormValues>[] = [
    {
      key: "email",
      label: dict.email,
      placeholder: dict.emailPlaceholder,
      type: "email",
    },
    {
      key: "phoneNumber",
      label: dict.phone,
      placeholder: dict.phonePlaceholder,
    },
    {
      key: "firstName",
      label: dict.firstName,
      placeholder: dict.firstNamePlaceholder,
    },
    {
      key: "lastName",
      label: dict.lastName,
      placeholder: dict.lastNamePlaceholder,
    },
    {
      key: "dateOfBirth",
      label: dict.dateOfBirth,
      placeholder: dict.dateOfBirthPlaceholder,
      type: "date",
    },
    {
      key: "gender",
      label: dict.gender,
      placeholder: dict.gender,
      type: "select",
      options: [
        { label: dict.genderMale, value: "male" },
        { label: dict.genderFemale, value: "female" },
      ],
    },
    {
      key: "status",
      label: dict.status,
      placeholder: "active",
      type: "select",
      options: [
        { label: dict.statusActive, value: "active" },
        { label: dict.statusSuspended, value: "suspended" },
        { label: dict.statusDeleted, value: "deleted" },
      ],
    },
    {
      key: "language",
      label: dict.language,
      placeholder: "en",
    },
    {
      key: "timezone",
      label: dict.timezone,
      placeholder: "Africa/Cairo",
    },
    {
      key: "role",
      label: dict.role,
      placeholder: dict.rolePlaceholder,
      type: "select",
      options: rolesList.map((r) => ({ label: r.name, value: r.name })),
    },
    {
      key: "bio",
      label: dict.bio,
      placeholder: dict.bioPlaceholder,
      type: "textarea",
    },
    {
      key: "twoFactorEnabled",
      label: dict.twoFactor,
      placeholder: dict.twoFactorPlaceholder,
      type: "checkbox",
    },
  ];

  const createFields: AdminFormField<UserFormValues>[] = [
    baseFields[0], // email
    {
      key: "password",
      label: dict.password,
      placeholder: dict.passwordPlaceholder,
      type: "password",
    },
    {
      key: "passwordConfirmation",
      label: dict.passwordConfirmation,
      placeholder: dict.passwordConfirmationPlaceholder,
      type: "password",
    },
    baseFields[1], // phone
    baseFields[2], // first name
    baseFields[3], // last name
    baseFields[4], // date of birth
    baseFields[5], // gender
    baseFields[6], // status
    baseFields[9], // role
    baseFields[10], // bio
  ];

  const updateFields: AdminFormField<UserFormValues>[] = [
    baseFields[0], // email
    baseFields[1], // phone
    baseFields[2], // first name
    baseFields[3], // last name
    baseFields[4], // date of birth
    baseFields[5], // gender
    baseFields[6], // status
    baseFields[7], // language
    baseFields[8], // timezone
    baseFields[9], // role
    baseFields[10], // bio
    baseFields[11], // twoFactorEnabled
  ];

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
