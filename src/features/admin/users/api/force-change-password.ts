import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export interface ForceChangePasswordRequest {
  password: string;
  passwordConfirmation: string;
}

export async function forceChangePassword(
  userId: string,
  payload: ForceChangePasswordRequest
) {
  return apiClient.patch<{ message: string }, { password: string; password_confirmation: string }>(
    apiEndpoints.admin.users.password(userId),
    {
      password: payload.password,
      password_confirmation: payload.passwordConfirmation,
    }
  );
}
