"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard } from "@/features/admin/shared";
import { AuditLogsFilters } from "../components/audit-logs-filters";
import { AuditLogsTable } from "../components/audit-logs-table";
import { useAuditLogsList } from "../hooks/use-audit-logs-list";
import type { AuditLogsListFilters } from "../types/audit-log.types";

const defaultFilters: AuditLogsListFilters = { search: "" };

export function AuditLogsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<AuditLogsListFilters>(defaultFilters);
  
  void lang;
  
  const listState = useAuditLogsList(filters);
  

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
        description="Trace sensitive admin actions and backend activity."
        eyebrow="Admin"
        title="Audit Logs"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Audit Logs currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <AuditLogsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <AuditLogsTable
        items={listState.items}

      />
    </div>
  );
}
