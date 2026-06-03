"use client";
import Image from "next/image";
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
import { UserPasswordForm } from "../components/user-password-form";
import { UserStoreCard } from "../components/user-store-card";
import { UserSecurityCard } from "../components/user-security-card";
import { UserSessionsTable } from "../components/user-sessions-table";
import { UserStatusBadge } from "../components/user-status-badge";
import { useUserActions } from "../hooks/use-user-actions";
import { useUserDetails } from "../hooks/use-user-details";
import { useRolesList } from "@/features/admin/roles/hooks/use-roles-list";
import { getUsersDictionary } from "../utils/get-dictionary";

export function UserDetailsPage({
  userId,
  lang,
}: {
  userId: string;
  lang: string;
}) {
  const dict = getUsersDictionary(lang);
  const router = useRouter();
  const detailState = useUserDetails(userId);
  const rolesState = useRolesList({});
  const actions = useUserActions(async () => { await detailState.reload(); });
  const isDeleted = detailState.item?.status === "deleted";

  if (detailState.isLoading) {
    return <PageLoading label={dict.details.loading} />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title={dict.details.notFound}>
        <p className="text-sm text-slate-500">
          {dict.details.notFoundDesc}
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
                  confirmLabel={dict.list.actions.activate}
                  description={dict.list.actions.activateDesc}
                  isPending={actions.activateAction.isSubmitting}
                  onConfirm={async () => {
                    await actions.activateAction.submit(userId);
                  }}
                  title={dict.list.actions.activateTitle}
                  triggerLabel={dict.list.actions.activate}
                  variant="primary"
                />
                <AdminConfirmDialog
                  confirmLabel={dict.list.actions.suspend}
                  description={dict.list.actions.suspendDesc}
                  isPending={actions.suspendAction.isSubmitting}
                  onConfirm={async () => {
                    await actions.suspendAction.submit({ userId });
                  }}
                  title={dict.list.actions.suspendTitle}
                  triggerLabel={dict.list.actions.suspend}
                  variant="danger"
                />
                <AdminConfirmDialog
                  confirmLabel={dict.list.actions.delete}
                  description={dict.list.actions.deleteDesc}
                  isPending={actions.deleteAction.isSubmitting}
                  onConfirm={async () => {
                    const result = await actions.deleteAction.submit({ userId });

                    if (result) {
                      router.replace(createAdminHref(lang, "users"));
                    }
                  }}
                  title={dict.list.actions.deleteTitle}
                  triggerLabel={dict.list.actions.delete}
                  variant="danger"
                />
              </>
            ) : null}
          </div>
        }
        description={dict.details.description}
        eyebrow={dict.details.eyebrow}
        title={
          <div className="flex items-center gap-4">
            {detailState.item.profile?.avatar ? (
              <Image
                src={detailState.item.profile.avatar}
                alt={detailState.item.fullName ?? detailState.item.name ?? "User"}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover shadow-sm ring-1 ring-slate-200"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
                {(detailState.item.fullName ?? detailState.item.name ?? "U").charAt(0).toUpperCase()}
              </div>
            )}
            <span>{getAdminEntityTitle(detailState.item, userId)}</span>
          </div>
        }
      />
      {detailState.error ? (
        <AdminSection title={dict.list.errors.request}>
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      {isDeleted ? (
        <AdminSection
          description=""
          title={dict.details.deletedTitle}
        >
          <p className="text-sm text-slate-500">
            {dict.details.deletedDesc}
          </p>
        </AdminSection>
      ) : (
        <>
          <UserForm
            description={dict.details.formUpdateDesc}
            initialValues={detailState.item}
            isSubmitting={actions.updateAction.isSubmitting}
            mode="update"
            rolesList={rolesState.items}
            onSubmit={async (payload) => {
              await actions.updateAction.submit({
                userId,
                payload,
              });
            }}
            submitLabel={dict.details.formUpdateBtn}
            title={dict.details.formUpdateTitle}
            dict={dict.form}
          />
          <UserPasswordForm
            description={dict.details.passwordDesc}
            isSubmitting={actions.changePasswordAction.isSubmitting}
            onSubmit={async (payload) => {
              await actions.changePasswordAction.submit({
                userId,
                payload,
              });
            }}
            submitLabel={dict.details.passwordBtn}
            title={dict.details.passwordTitle}
            dict={dict.form}
          />
        </>
      )}

      <AdminSection description={dict.details.storesDesc} title={dict.details.storesTitle}>
        {detailState.item.stores?.length ? (
          <div className="space-y-4">
            {detailState.item.stores.map((store, index) => (
              <UserStoreCard key={store.id ?? index} store={store} dict={dict.storeCard} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">{dict.details.noStores}</p>
        )}
      </AdminSection>
      {!isDeleted && (
        <>
          <UserSecurityCard
            lastLoginAt={detailState.item.lastLoginAt}
            lastIp={detailState.item.lastIp}
            onRevokeAllSessions={async () => {
              await actions.revokeAllSessionsAction.submit(userId);
            }}
            isRevoking={actions.revokeAllSessionsAction.isSubmitting}
            hasActiveSessions={!!(detailState.item.sessions && detailState.item.sessions.length > 0)}
            dict={dict.security}
          />

          <UserSessionsTable
            sessions={detailState.item.sessions || []}
            onRevokeSession={async (sessionId) => {
              await actions.revokeSessionAction.submit({ userId, sessionId });
            }}
            isRevoking={actions.revokeSessionAction.isSubmitting}
            dict={dict.security}
          />
        </>
      )}
    </div>
  );
}

