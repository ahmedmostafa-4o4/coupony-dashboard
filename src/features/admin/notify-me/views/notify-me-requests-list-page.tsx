"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard } from "@/features/admin/shared";
import { NotifyMeRequestsFilters } from "../components/notify-me-requests-filters";
import { NotifyMeRequestsTable } from "../components/notify-me-requests-table";
import { useNotifyMeRequestsList } from "../hooks/use-notify-me-requests-list";
import type { NotifyMeRequestsListFilters } from "../types/notify-me-request.types";

const defaultFilters: NotifyMeRequestsListFilters = { search: "", status: "all" };

export function NotifyMeRequestsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<NotifyMeRequestsListFilters>(defaultFilters);
  
  void lang;
  
  const listState = useNotifyMeRequestsList(filters);
  

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
        description="Review customer notify-me signals and backlog volume."
        eyebrow="Admin"
        title="Notify Me Requests"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Notify Me Requests currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <NotifyMeRequestsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <NotifyMeRequestsTable
        items={listState.items}

      />
    </div>
  );
}
