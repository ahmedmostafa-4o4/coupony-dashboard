"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, KpiCard } from "@/features/admin/shared";
import { KeyIcon } from "lucide-react";
import { PermissionsFilters } from "../components/permissions-filters";
import { PermissionsTable } from "../components/permissions-table";
import { usePermissionsList } from "../hooks/use-permissions-list";
import type { PermissionsListFilters } from "../types/permission.types";

const defaultFilters: PermissionsListFilters = { search: "" };

export function PermissionsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<PermissionsListFilters>(defaultFilters);
  
  void lang;
  
  const listState = usePermissionsList(filters);
  

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              Reload
            </Button>
          </>
        }
        description="Review the available authorization surface exported by the backend."
        eyebrow="Admin"
        title="Permissions"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard
          description="Permissions currently loaded from the API response."
          title="Rows"
          value={listState.total}
          icon={<KeyIcon />}
        />
      </div>
      <PermissionsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <PermissionsTable
        items={listState.items}

      />
    </div>
  );
}
