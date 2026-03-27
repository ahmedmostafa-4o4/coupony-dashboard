import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminAssignUserRoleDto,
  AdminCreateUserDto,
  AdminUpdateUserDto,
  AdminUserActionReasonDto,
  AdminUsersQueryDto,
  RoleDto,
  UserProfileDto,
  UserRecordDto,
  UserStatisticsDto,
  UserStoreSummaryDto,
  UserRoleAssignmentDto,
} from "./users.dto";

export type UserProfile = Camelized<UserProfileDto>;
export type UserRoleAssignment = Camelized<UserRoleAssignmentDto>;
export type UserRole = Camelized<RoleDto>;
export type UserStoreSummary = Camelized<UserStoreSummaryDto>;
export type UserStatistics = Camelized<UserStatisticsDto>;
export type User = Camelized<UserRecordDto> & {
  fullName?: string;
  name?: string;
  profile?: UserProfile | null;
  roleNames?: string[];
  roles?: Array<string | UserRole | UserRoleAssignment>;
  stores?: UserStoreSummary[];
};

export type UsersListFilters = Camelized<AdminUsersQueryDto> & {
  search?: string;
};

export type UsersListResult = AdminListResult<User>;
export type UserDetailsResult = AdminItemResult<User>;
export type UserStatisticsResult = AdminItemResult<UserStatistics>;
export type CreateUserRequest = AdminCreateUserDto;
export type UpdateUserRequest = AdminUpdateUserDto;
export type AssignUserRoleRequest = AdminAssignUserRoleDto;
export type UserActionReasonRequest = AdminUserActionReasonDto;
