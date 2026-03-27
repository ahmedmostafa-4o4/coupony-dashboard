import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { clearAuthSession, logoutAndRedirect } from "@/lib/auth/session";
import type { AdminLoginRequest, AdminLoginResponse } from "@/types/auth.types";

export function loginAdmin(payload: AdminLoginRequest) {
  return apiClient.post<AdminLoginResponse, AdminLoginRequest>(
    apiEndpoints.auth.login,
    payload,
    {
      auth: "omit",
    }
  );
}

export function logoutAdmin() {
  clearAuthSession();
}

export function logoutAdminAndRedirect() {
  logoutAndRedirect();
}
