import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminAssignUserRoleDto,
  AdminCreateUserDto,
  AdminUpdateUserDto,
  AdminUserActionReasonDto,
  AdminUsersQueryDto,
  RoleDto,
  UserDto,
  UserProfileDto,
  UserRoleAssignmentDto,
} from "./users.dto";

export type UserProfile = Camelized<UserProfileDto>;
export type UserRoleAssignment = Camelized<UserRoleAssignmentDto>;
export type UserRole = Camelized<RoleDto>;
export type User = Camelized<UserDto> & {
  name?: string;
  profile?: UserProfile | null;
  roles?: Array<UserRole | UserRoleAssignment>;
};

export type UsersListFilters = Camelized<AdminUsersQueryDto> & {
  search?: string;
};

export type UsersListResult = AdminListResult<User>;
export type UserDetailsResult = AdminItemResult<User>;
export type CreateUserRequest = AdminCreateUserDto;
export type UpdateUserRequest = AdminUpdateUserDto;
export type AssignUserRoleRequest = AdminAssignUserRoleDto;
export type UserActionReasonRequest = AdminUserActionReasonDto;
