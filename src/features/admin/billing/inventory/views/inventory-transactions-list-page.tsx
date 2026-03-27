"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard } from "@/features/admin/shared";
import { InventoryTransactionsFilters } from "../components/inventory-transactions-filters";
import { InventoryTransactionsTable } from "../components/inventory-transactions-table";
import { useInventoryTransactionsList } from "../hooks/use-inventory-transactions-list";
import type { InventoryTransactionsListFilters } from "../types/inventory-transaction.types";

const defaultFilters: InventoryTransactionsListFilters = { search: "" };

export function InventoryTransactionsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<InventoryTransactionsListFilters>(defaultFilters);
  
  void lang;
  
  const listState = useInventoryTransactionsList(filters);
  

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
        description="Track inventory transaction flow through admin reporting."
        eyebrow="Admin"
        title="Inventory Transactions"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Inventory Transactions currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <InventoryTransactionsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <InventoryTransactionsTable
        items={listState.items}

      />
    </div>
  );
}
