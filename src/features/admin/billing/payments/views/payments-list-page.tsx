"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard } from "@/features/admin/shared";
import { PaymentsFilters } from "../components/payments-filters";
import { PaymentsTable } from "../components/payments-table";
import { usePaymentsList } from "../hooks/use-payments-list";
import type { PaymentsListFilters } from "../types/payment.types";

const defaultFilters: PaymentsListFilters = { search: "", status: "all" };

export function PaymentsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<PaymentsListFilters>(defaultFilters);
  
  void lang;
  
  const listState = usePaymentsList(filters);
  

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
        description="Monitor payment activity and backend settlement payloads."
        eyebrow="Admin"
        title="Payments"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Payments currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <PaymentsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <PaymentsTable
        items={listState.items}

      />
    </div>
  );
}
