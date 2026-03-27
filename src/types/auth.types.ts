import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export interface AdminLoginRequest {
  email: string;
  password: string;
  role: "admin";
}

export interface AuthUserProfileDto {
  avatar?: string | null;
  bio?: string | null;
  date_of_birth?: string | null;
  first_name?: string | null;
  gender?: string | null;
  last_name?: string | null;
}

export interface AuthUserDto {
  created_at?: string | null;
  email: string;
  full_name?: string | null;
  id: string;
  language?: string | null;
  phone_number?: string | null;
  points?: number | null;
  profile?: AuthUserProfileDto | null;
  status?: string | null;
}

export interface AuthSessionDto {
  created_at?: string | null;
  device_type?: string | null;
  expires_at?: string | null;
  id?: string | null;
  ip_address?: string | null;
  last_activity?: string | null;
  token?: string | null;
  updated_at?: string | null;
  user_agent?: string | null;
  user_id?: string | null;
}

export interface AdminLoginData {
  access_token: string;
  expires_in?: number | null;
  is_onboarding_completed?: boolean | null;
  refresh_token: string;
  role: string;
  session?: AuthSessionDto | null;
  token_type?: string | null;
  user: AuthUserDto;
}

export type AdminLoginResponse = ApiSuccessResponse<AdminLoginData>;
