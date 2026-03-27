"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getUsers } from "../api/get-users";
import type { User, UsersListFilters } from "../types/user.types";

export function useUsersList(filters: UsersListFilters) {
  return useAdminCollection<User, UsersListFilters>({
    filters,
    getItems: getUsers,
  });
}
