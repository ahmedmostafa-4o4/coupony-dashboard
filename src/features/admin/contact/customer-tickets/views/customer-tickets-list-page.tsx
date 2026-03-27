"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminPageHeader, AdminSection, AdminStatCard } from "@/features/admin/shared";
import { CustomerTicketsFilters } from "../components/customer-tickets-filters";
import { CustomerTicketForm } from "../components/customer-ticket-form";
import { CustomerTicketsTable } from "../components/customer-tickets-table";
import { useCustomerTicketActions } from "../hooks/use-customer-ticket-actions";
import { useCustomerTicketsList } from "../hooks/use-customer-tickets-list";
import type { CustomerTicketsListFilters } from "../types/customer-ticket.types";

const defaultFilters: CustomerTicketsListFilters = { search: "", status: "all" };

export function CustomerTicketsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<CustomerTicketsListFilters>(defaultFilters);
  const [activeComposer, setActiveComposer] = useState<string | null>(null);
  void lang;
  const [targetId, setTargetId] = useState("");
  const listState = useCustomerTicketsList(filters);
  const actions = useCustomerTicketActions(async () => { await listState.reload(); });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <>
            <Button
              key="updateAction"
              variant="secondary"
              onClick={() => setActiveComposer("updateAction")}
            >
              Update ticket
            </Button>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              Reload
            </Button>
          </>
        }
        description="Handle customer support tickets from the admin queue."
        eyebrow="Admin"
        title="Customer Tickets"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Customer Tickets currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <CustomerTicketsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}
      {activeComposer === "updateAction" ? (
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Ticket ID</span>
            <Input
              placeholder="Enter customer ticket ID"
              value={targetId}
              onChange={(event) => setTargetId(event.target.value)}
            />
          </label>
          <CustomerTicketForm
            description="Update a customer ticket status with the typed support DTO."
            isSubmitting={actions.updateAction.isSubmitting}
            onSubmit={async (payload) => {
              if (!targetId.trim()) {
                throw new Error("Ticket ID is required.");
              }

              const result = await actions.updateAction.submit({
                payload,
                ticketId: targetId,
              });

              if (result) {
                setActiveComposer(null);
                setTargetId("");
              }

              return result;
            }}
            submitLabel="Update ticket"
            title="Update ticket"
          />
        </div>
      ) : null}
      <CustomerTicketsTable
        items={listState.items}
      />
    </div>
  );
}
