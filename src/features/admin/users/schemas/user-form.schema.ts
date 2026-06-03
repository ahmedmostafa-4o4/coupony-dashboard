import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import {
  splitList,
  trimOptional,
  validateEmail,
} from "@/features/admin/shared/utils/admin-form-schema";

import type {
  CreateUserRequest,
  UpdateUserRequest,
  User,
} from "../types/user.types";

export interface UserFormValues {
  email: string;
  firstName: string;
  language: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
  phoneNumber: string;
  role: string;
  status: string;
  timezone: string;
  dateOfBirth: string;
  gender: string;
  bio: string;
  twoFactorEnabled: boolean;
}

export interface UserPasswordFormValues {
  password: string;
  passwordConfirmation: string;
}

export function createUserFormSchema(
  mode: "create"
): AdminFormSchema<UserFormValues, CreateUserRequest>;
export function createUserFormSchema(
  mode: "update"
): AdminFormSchema<UserFormValues, UpdateUserRequest>;
export function createUserFormSchema(
  mode: "create" | "update"
): AdminFormSchema<UserFormValues, CreateUserRequest | UpdateUserRequest> {
  return {
    defaultValues: {
      email: "",
      firstName: "",
      language: "",
      lastName: "",
      password: "",
      passwordConfirmation: "",
      phoneNumber: "",
      role: "",
      status: mode === "create" ? "pending" : "",
      timezone: "",
      dateOfBirth: "",
      gender: "",
      bio: "",
      twoFactorEnabled: false,
    },
    transform(values) {
      const profile =
        values.firstName.trim() || values.lastName.trim() || values.dateOfBirth.trim() || values.gender.trim() || values.bio.trim()
          ? {
              first_name: trimOptional(values.firstName),
              last_name: trimOptional(values.lastName),
              date_of_birth: trimOptional(values.dateOfBirth),
              gender: trimOptional(values.gender),
              bio: trimOptional(values.bio),
            }
          : undefined;

      if (mode === "create") {
        return {
          email: values.email.trim(),
          first_name: trimOptional(values.firstName) ?? "",
          last_name: trimOptional(values.lastName) ?? "",
          password: values.password,
          password_confirmation: values.passwordConfirmation,
          phone_number: trimOptional(values.phoneNumber),
          role: trimOptional(values.role) ?? "",
          status: trimOptional(values.status),
          language: trimOptional(values.language),
          timezone: trimOptional(values.timezone),
          date_of_birth: trimOptional(values.dateOfBirth),
          gender: trimOptional(values.gender),
          bio: trimOptional(values.bio),
        };
      }

      return {
        email: trimOptional(values.email),
        language: trimOptional(values.language),
        phone_number: trimOptional(values.phoneNumber),
        profile,
        role: trimOptional(values.role),
        status: trimOptional(values.status),
        timezone: trimOptional(values.timezone),
        two_factor_enabled: values.twoFactorEnabled,
      };
    },
    validate(values) {
      return {
        email:
          mode === "create"
            ? !values.email.trim()
              ? "Email is required."
              : !validateEmail(values.email)
                ? "Enter a valid email address."
                : undefined
            : values.email.trim() && !validateEmail(values.email)
              ? "Enter a valid email address."
              : undefined,
        password:
          mode === "create" && (!values.password || values.password.length < 8)
            ? "Password must be at least 8 characters long."
            : undefined,
        passwordConfirmation:
          mode === "create" && values.password !== values.passwordConfirmation
            ? "Passwords do not match."
            : undefined,
        firstName:
          mode === "create" && !values.firstName.trim()
            ? "First name is required."
            : undefined,
        lastName:
          mode === "create" && !values.lastName.trim()
            ? "Last name is required."
            : undefined,
        role:
          mode === "create" && !values.role.trim()
            ? "Role is required."
            : undefined,
      };
    },
  };
}

export const userPasswordFormSchema: AdminFormSchema<
  UserPasswordFormValues,
  { password: string; passwordConfirmation: string }
> = {
  defaultValues: {
    password: "",
    passwordConfirmation: "",
  },
  transform(values) {
    return {
      password: values.password,
      passwordConfirmation: values.passwordConfirmation,
    };
  },
  validate(values) {
    return {
      password:
        !values.password || values.password.length < 8
          ? "Password must be at least 8 characters long."
          : undefined,
      passwordConfirmation:
        values.password !== values.passwordConfirmation
          ? "Passwords do not match."
          : undefined,
    };
  },
};

export function toUserFormValues(user?: User | null): UserFormValues {
  return {
    email: String(user?.email ?? ""),
    firstName: String(user?.profile?.firstName ?? ""),
    language: String(user?.language ?? ""),
    lastName: String(user?.profile?.lastName ?? ""),
    password: "",
    passwordConfirmation: "",
    phoneNumber: String(user?.phoneNumber ?? ""),
    role: typeof user?.roles?.[0] === "string" ? user.roles[0] : (user?.roles?.[0] as any)?.name ?? "",
    status: String(user?.status ?? ""),
    timezone: String(user?.timezone ?? ""),
    dateOfBirth: String(user?.profile?.dateOfBirth ?? ""),
    gender: String(user?.profile?.gender ?? ""),
    bio: String(user?.profile?.bio ?? ""),
    twoFactorEnabled: Boolean(user?.twoFactorEnabled ?? false),
  };
}
