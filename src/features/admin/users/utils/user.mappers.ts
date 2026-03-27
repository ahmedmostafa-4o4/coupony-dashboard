import type { Camelized } from "@/types";

import type {
  AdminUserDetailsResponseDto,
  UserDto,
} from "../types/users.dto";
import type { User } from "../types/user.types";

export function mapUser(item: Camelized<UserDto>): User {
  return {
    ...item,
    name: item.email,
  };
}

export function mapUserDetails(
  data: Camelized<AdminUserDetailsResponseDto["data"]>
): User {
  return {
    ...mapUser(data.user),
    profile: data.profile ?? null,
    roles: Array.isArray(data.roles) ? data.roles : [],
  };
}
