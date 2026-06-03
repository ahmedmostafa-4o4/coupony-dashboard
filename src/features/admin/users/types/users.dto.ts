import type {
  RoleDto,
  StoreDto,
  UserDto,
  UserRoleAssignmentDto,
} from "@/types/admin-api.dto";

export type {
  AdminActivateUserDto,
  AdminActivateUserResponseDto,
  AdminAssignUserRoleDto,
  AdminAssignUserRoleResponseDto,
  AdminCreateUserDto,
  AdminCreateUserResponseDto,
  AdminDeleteUserResponseDto,
  AdminRemoveUserRoleResponseDto,
  AdminSuspendUserResponseDto,
  AdminUpdateUserDto,
  AdminUpdateUserResponseDto,
  AdminUserActionReasonDto,
  AdminUsersListResponseDto,
  AdminUsersQueryDto,
  RoleDto,
  UserRoleAssignmentDto,
  UserSessionDto,
  UserStatus,
} from "@/types/admin-api.dto";

export interface UserProfileDto {
  avatar?: string | null;
  bio?: string | null;
  date_of_birth?: string | null;
  first_name?: string | null;
  gender?: string | null;
  last_name?: string | null;
}

export type UserStoreSummaryDto = StoreDto;

export interface AdminUpdateUserStatusRequest {
  status: string;
}

export interface UserStatisticsDto {
  active: number;
  admins: number;
  customers: number;
  deleted: number;
  pending_sellers: number;
  recent: number;
  sellers: number;
  suspended: number;
  total: number;
}

export interface UserRecordDto extends UserDto {
  full_name?: string | null;
  points?: number | null;
  profile?: UserProfileDto | null;
  roles?: string[];
  stores?: UserStoreSummaryDto[];
}

export type AdminUserDetailsResponseDto = {
  message: string;
  data: UserRecordDto;
};

export type AdminUpdateUserStatusResponseDto = {
  message: string;
  data: UserRecordDto;
};

export type AdminUserStatisticsResponseDto = {
  message: string;
  data: UserStatisticsDto;
};
