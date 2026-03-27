"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminPageHeader, AdminSection, AdminStatCard } from "@/features/admin/shared";
import { SellerTicketsFilters } from "../components/seller-tickets-filters";
import { SellerTicketForm } from "../components/seller-ticket-form";
import { SellerTicketsTable } from "../components/seller-tickets-table";
import { useSellerTicketActions } from "../hooks/use-seller-ticket-actions";
import { useSellerTicketsList } from "../hooks/use-seller-tickets-list";
import type { SellerTicketsListFilters } from "../types/seller-ticket.types";

const defaultFilters: SellerTicketsListFilters = { search: "", status: "all" };

export function SellerTicketsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<SellerTicketsListFilters>(defaultFilters);
  const [activeComposer, setActiveComposer] = useState<string | null>(null);
  void lang;
  const [targetId, setTargetId] = useState("");
  const listState = useSellerTicketsList(filters);
  const actions = useSellerTicketActions(async () => { await listState.reload(); });

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
        description="Handle seller support tickets from the admin queue."
        eyebrow="Admin"
        title="Seller Tickets"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Seller Tickets currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <SellerTicketsFilters
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
              placeholder="Enter seller ticket ID"
              value={targetId}
              onChange={(event) => setTargetId(event.target.value)}
            />
          </label>
          <SellerTicketForm
            description="Update a seller lead status with the typed support DTO."
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
      <SellerTicketsTable
        items={listState.items}
      />
    </div>
  );
}
