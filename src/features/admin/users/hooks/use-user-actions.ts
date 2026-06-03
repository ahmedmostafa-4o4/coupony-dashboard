"use client";

import { useAdminAction } from "@/features/admin/shared";

import { activateUser } from "../api/activate-user";
import { createUser } from "../api/create-user";
import { deleteUser } from "../api/delete-user";
import { revokeUserSession } from "../api/revoke-user-session";
import { revokeUserSessions } from "../api/revoke-user-sessions";
import { suspendUser } from "../api/suspend-user";
import { updateUser } from "../api/update-user";
import { forceChangePassword } from "../api/force-change-password";
import type {
  UpdateUserRequest,
  UserActionReasonRequest,
} from "../types/user.types";

export function useUserActions(onSuccess?: () => Promise<void> | void) {
  return {
    createAction: useAdminAction({
      action: createUser,
      onSuccess,
    }),
    updateAction: useAdminAction({
      action: ({
        userId,
        payload,
      }: {
        userId: string;
        payload: UpdateUserRequest;
      }) => updateUser(userId, payload),
      onSuccess,
    }),
    activateAction: useAdminAction({
      action: activateUser,
      onSuccess,
    }),
    suspendAction: useAdminAction({
      action: ({
        userId,
        payload,
      }: {
        userId: string;
        payload?: UserActionReasonRequest;
      }) => suspendUser(userId, payload),
      onSuccess,
    }),
    deleteAction: useAdminAction({
      action: ({
        userId,
        payload,
      }: {
        userId: string;
        payload?: UserActionReasonRequest;
      }) => deleteUser(userId, payload),
      onSuccess,
    }),
    revokeAllSessionsAction: useAdminAction({
      action: revokeUserSessions,
      onSuccess,
    }),
    revokeSessionAction: useAdminAction({
      action: ({
        userId,
        sessionId,
      }: {
        userId: string;
        sessionId: string;
      }) => revokeUserSession(userId, sessionId),
      onSuccess,
    }),
    changePasswordAction: useAdminAction({
      action: ({
        userId,
        payload,
      }: {
        userId: string;
        payload: { password: string; passwordConfirmation: string };
      }) => forceChangePassword(userId, payload),
      onSuccess,
    }),
  };
}
