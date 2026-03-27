"use client";
import { useRouter } from "next/navigation";
import { PageLoading } from "@/components/shared/page-loading";
import {
  AdminPageHeader,
  createAdminHref,
  getAdminEntityTitle,
  AdminRecordGrid,
  AdminSection,
  AdminConfirmDialog,
} from "@/features/admin/shared";
import { UserForm } from "../components/user-form";
import { UserRoleForm } from "../components/user-role-form";
import { UserStatusBadge } from "../components/user-status-badge";
import { useUserActions } from "../hooks/use-user-actions";
import { useUserDetails } from "../hooks/use-user-details";

export function UserDetailsPage({
  userId,
  lang,
}: {
  userId: string;
  lang: string;
}) {
  const router = useRouter();
  const detailState = useUserDetails(userId);
  const actions = useUserActions(async () => { await detailState.reload(); });
  const isDeleted = detailState.item?.status === "deleted";

  if (detailState.isLoading) {
    return <PageLoading label="Loading user details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="User not found">
        <p className="text-sm text-slate-500">
          The backend did not return a user for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <UserStatusBadge value={detailState.item.status} />
            
            {!isDeleted ? (
              <>
                <AdminConfirmDialog
                  confirmLabel="Activate"
                  description="This will call the mapped admin endpoint for the selected user."
                  isPending={actions.activateAction.isSubmitting}
                  onConfirm={async () => {
                    await actions.activateAction.submit(userId);
                  }}
                  title="Activate User"
                  triggerLabel="Activate"
                  variant="primary"
                />
                <AdminConfirmDialog
                  confirmLabel="Suspend"
                  description="This will call the mapped admin endpoint for the selected user."
                  isPending={actions.suspendAction.isSubmitting}
                  onConfirm={async () => {
                    await actions.suspendAction.submit({ userId });
                  }}
                  title="Suspend User"
                  triggerLabel="Suspend"
                  variant="danger"
                />
                <AdminConfirmDialog
                  confirmLabel="Delete"
                  description="This will permanently remove this user, then return you to the users list."
                  isPending={actions.deleteAction.isSubmitting}
                  onConfirm={async () => {
                    const result = await actions.deleteAction.submit({ userId });

                    if (result) {
                      router.replace(createAdminHref(lang, "users"));
                    }
                  }}
                  title="Delete User"
                  triggerLabel="Delete"
                  variant="danger"
                />
              </>
            ) : null}
          </div>
        }
        description="Inspect the current admin-facing user payload and lifecycle actions."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, userId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      {isDeleted ? (
        <AdminSection
          description="Deleted users are kept visible for audit/reference, but mutation actions are disabled."
          title="User deleted"
        >
          <p className="text-sm text-slate-500">
            This user is marked as deleted. To continue managing accounts, return
            to the users list.
          </p>
        </AdminSection>
      ) : (
        <>
          <UserForm
            description="Update the user profile and admin-facing account settings."
            initialValues={detailState.item}
            isSubmitting={actions.updateAction.isSubmitting}
            mode="update"
            onSubmit={async (payload) => {
              await actions.updateAction.submit({
                userId,
                payload,
              });
            }}
            submitLabel="Update user"
            title="Update user"
          />
          <UserRoleForm
            description="Assign a role to this user using the role assignment DTO."
            isSubmitting={actions.assignRoleAction.isSubmitting}
            onSubmit={async (payload) => {
              await actions.assignRoleAction.submit({
                userId,
                payload,
              });
            }}
            submitLabel="Assign role"
            title="Assign role"
          />
        </>
      )}
      <AdminSection description="Roles returned by the API for this user." title="Roles">
        <AdminRecordGrid
          value={
            detailState.item.roles?.length
              ? detailState.item.roles
              : [{ message: "No roles returned." }]
          }
        />
      </AdminSection>
      <AdminSection description="Stores linked to this user account." title="Stores">
        <AdminRecordGrid
          value={
            detailState.item.stores?.length
              ? detailState.item.stores
              : [{ message: "No linked stores." }]
          }
        />
      </AdminSection>
      <AdminSection description="Structured fields returned for this record." title="User details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
