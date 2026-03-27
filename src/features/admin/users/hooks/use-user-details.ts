"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getUserById } from "../api/get-user-by-id";
import type { User } from "../types/user.types";

export function useUserDetails(userId: string) {
  return useAdminResource<User>({
    id: userId,
    getItem: getUserById,
  });
}
