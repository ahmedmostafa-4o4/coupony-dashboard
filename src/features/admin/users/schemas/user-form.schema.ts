import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import {
  splitList,
  trimOptional,
  validateEmail,
} from "@/features/admin/shared/utils/admin-form-schema";

import type {
  AssignUserRoleRequest,
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
  phoneNumber: string;
  roleNames: string;
  status: string;
  timezone: string;
  twoFactorEnabled: boolean;
}

export interface UserRoleAssignmentFormValues {
  branchId: string;
  roleId: string;
  storeId: string;
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
      phoneNumber: "",
      roleNames: "",
      status: mode === "create" ? "pending" : "",
      timezone: "",
      twoFactorEnabled: false,
    },
    transform(values) {
      const profile =
        values.firstName.trim() || values.lastName.trim()
          ? {
              first_name: trimOptional(values.firstName),
              last_name: trimOptional(values.lastName),
            }
          : undefined;

      if (mode === "create") {
        return {
          email: values.email.trim(),
          first_name: trimOptional(values.firstName),
          last_name: trimOptional(values.lastName),
          password: values.password,
          phone_number: trimOptional(values.phoneNumber),
          role_names: splitList(values.roleNames),
          status: trimOptional(values.status),
        };
      }

      return {
        email: trimOptional(values.email),
        language: trimOptional(values.language),
        phone_number: trimOptional(values.phoneNumber),
        profile,
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
          mode === "create" && !values.password.trim()
            ? "Password is required."
            : undefined,
      };
    },
  };
}

export const userRoleAssignmentFormSchema: AdminFormSchema<
  UserRoleAssignmentFormValues,
  AssignUserRoleRequest
> = {
  defaultValues: {
    branchId: "",
    roleId: "",
    storeId: "",
  },
  transform(values) {
    return {
      branch_id: trimOptional(values.branchId),
      role_id: values.roleId.trim(),
      store_id: trimOptional(values.storeId),
    };
  },
  validate(values) {
    return {
      roleId: values.roleId.trim() ? undefined : "Role ID is required.",
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
    phoneNumber: String(user?.phoneNumber ?? ""),
    roleNames: "",
    status: String(user?.status ?? ""),
    timezone: String(user?.timezone ?? ""),
    twoFactorEnabled: Boolean(user?.twoFactorEnabled ?? false),
  };
}
