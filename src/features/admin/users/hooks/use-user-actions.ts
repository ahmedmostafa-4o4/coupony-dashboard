"use client";

import { useAdminAction } from "@/features/admin/shared";

import { activateUser } from "../api/activate-user";
import { assignUserRole } from "../api/assign-user-role";
import { createUser } from "../api/create-user";
import { deleteUser } from "../api/delete-user";
import { removeUserRole } from "../api/remove-user-role";
import { suspendUser } from "../api/suspend-user";
import { updateUser } from "../api/update-user";
import type {
  AssignUserRoleRequest,
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
    assignRoleAction: useAdminAction({
      action: ({
        userId,
        payload,
      }: {
        userId: string;
        payload: AssignUserRoleRequest;
      }) => assignUserRole(userId, payload),
      onSuccess,
    }),
    removeRoleAction: useAdminAction({
      action: ({
        userId,
        assignmentId,
      }: {
        userId: string;
        assignmentId: string;
      }) => removeUserRole(userId, assignmentId),
      onSuccess,
    }),
  };
}
