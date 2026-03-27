import type { Camelized } from "@/types";

import type {
  AdminUserDetailsResponseDto,
  UserRecordDto,
} from "../types/users.dto";
import type { User } from "../types/user.types";

function mapRoleNames(item: Camelized<UserRecordDto>) {
  return (
    item.roles?.map((role) => {
      if (typeof role === "string") {
        return role;
      }

      if ("name" in role && typeof role.name === "string") {
        return role.name;
      }

      if ("role" in role && role.role && typeof role.role.name === "string") {
        return role.role.name;
      }

      return "Unknown role";
    }) ?? []
  );
}

export function mapUser(item: Camelized<UserRecordDto>): User {
  return {
    ...item,
    fullName: item.fullName ?? undefined,
    name: item.fullName ?? item.email,
    roleNames: mapRoleNames(item),
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
