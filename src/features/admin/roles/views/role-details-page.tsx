"use client";
import { PageLoading } from "@/components/shared/page-loading";
import { AdminPageHeader, getAdminEntityTitle, AdminRecordGrid, AdminSection, AdminConfirmDialog } from "@/features/admin/shared";
import { RolePermissionsForm } from "../components/role-permissions-form";
import { RoleForm } from "../components/role-form";
import { RoleStatusBadge } from "../components/role-status-badge";
import { useRoleActions } from "../hooks/use-role-actions";
import { useRoleDetails } from "../hooks/use-role-details";

export function RoleDetailsPage({
  roleId,
  lang,
}: {
  roleId: string;
  lang: string;
}) {
  const detailState = useRoleDetails(roleId);
  void lang;
  const actions = useRoleActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label="Loading role details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Role not found">
        <p className="text-sm text-slate-500">
          The backend did not return a role for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <RoleStatusBadge value={detailState.item.status} />
            
            <AdminConfirmDialog
              confirmLabel="Delete"
              description="This will call the mapped admin endpoint for the selected role."
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                await actions.deleteAction.submit(roleId);
              }}
              title="Delete Role"
              triggerLabel="Delete"
              variant="danger"
            />
          </div>
        }
        description="Fallback details view until a dedicated role endpoint is exposed."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, roleId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      <RoleForm
        description="Update the role metadata returned from the admin role contract."
        initialValues={detailState.item}
        isSubmitting={actions.updateAction.isSubmitting}
        mode="update"
        onSubmit={async (payload) => {
          await actions.updateAction.submit({
            roleId,
            payload,
          });
        }}
        submitLabel="Update role"
        title="Update role"
      />
      <RolePermissionsForm
        description="Replace the assigned permission IDs for this role."
        isSubmitting={actions.updatePermissionsAction.isSubmitting}
        onSubmit={async (payload) => {
          await actions.updatePermissionsAction.submit({
            roleId,
            payload,
          });
        }}
        submitLabel="Update permissions"
        title="Update permissions"
      />
      <AdminSection description="Structured fields returned for this record." title="Role details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
