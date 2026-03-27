import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminCreateUserResponseDto } from "../types/users.dto";
import type { CreateUserRequest } from "../types/user.types";

export async function createUser(payload: CreateUserRequest) {
  return apiClient.post<AdminCreateUserResponseDto, CreateUserRequest>(
    apiEndpoints.admin.users.list,
    payload
  );
}
