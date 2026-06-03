import type { Camelized } from "@/types";

import type {
  AdminUserDetailsResponseDto,
  UserRecordDto,
} from "../types/users.dto";
import type { User } from "../types/user.types";


export function mapUser(item: Camelized<UserRecordDto>): User {
  return {
    ...item,
    fullName: item.fullName ?? undefined,
    name: item.fullName ?? item.email,
    profile: item.profile ?? undefined,
    roles: item.roles,
    sessions: item.sessions ?? undefined,
  };
}

export function mapUserDetails(
  data: Camelized<AdminUserDetailsResponseDto["data"]>
): User {
  return {
    ...mapUser(data),
    profile: data.profile ?? null,
    roles: Array.isArray(data.roles) ? data.roles : [],
    stores: Array.isArray(data.stores) ? data.stores : [],
  };
}
