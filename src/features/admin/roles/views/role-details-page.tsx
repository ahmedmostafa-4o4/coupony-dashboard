"use client";
import { PageLoading } from "@/components/shared/page-loading";
import { AdminPageHeader, getAdminEntityTitle, AdminSection, AdminConfirmDialog } from "@/features/admin/shared";
import { RoleForm } from "../components/role-form";
import { useRoleActions } from "../hooks/use-role-actions";
import { useRoleDetails } from "../hooks/use-role-details";
import { usePermissionsList } from "../../permissions/hooks/use-permissions-list";

export function RoleDetailsPage({
  roleId,
  lang,
}: {
  roleId: string;
  lang: string;
}) {
  const detailState = useRoleDetails(roleId);
  const permissionsState = usePermissionsList({ perPage: 1000 });
  void lang;
  const actions = useRoleActions(async () => { await detailState.reload(); });

  if (detailState.isLoading || permissionsState.isLoading) {
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
        description="Update the role metadata and permissions."
        initialValues={detailState.item}
        isSubmitting={actions.updateAction.isSubmitting}
        permissionsList={permissionsState.items}
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
    </div>
  );
}

