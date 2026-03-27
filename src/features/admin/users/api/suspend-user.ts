import type { UserActionReasonRequest } from "../types/user.types";
import { updateUserStatus } from "./update-user-status";
import type { AdminUpdateUserStatusResponseDto } from "../types/users.dto";

export async function suspendUser(
  userId: string,
  payload: UserActionReasonRequest = {}
) {
  void payload;

  return updateUserStatus(userId, {
    status: "suspended",
  }) as Promise<AdminUpdateUserStatusResponseDto>;
}
