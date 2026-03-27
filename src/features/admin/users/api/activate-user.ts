import { updateUserStatus } from "./update-user-status";
import type { AdminUpdateUserStatusResponseDto } from "../types/users.dto";

export async function activateUser(userId: string) {
  return updateUserStatus(userId, {
    status: "active",
  }) as Promise<AdminUpdateUserStatusResponseDto>;
}
