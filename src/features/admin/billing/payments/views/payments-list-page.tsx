"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, KpiCard } from "@/features/admin/shared";
import { CreditCardIcon } from "lucide-react";
import { PaymentsFilters } from "../components/payments-filters";
import { PaymentsTable } from "../components/payments-table";
import { ApprovePaymentDialog, FailPaymentDialog } from "../components/payment-action-dialogs";
import { usePaymentsList } from "../hooks/use-payments-list";
import type { PaymentsListFilters } from "../types/payment.types";
import type { GlobalDictionary } from "@/messages/get-dictionary";

const defaultFilters: PaymentsListFilters = { search: "", status: "all" };

export function PaymentsListPage({ lang, dict }: { lang: string; dict: GlobalDictionary }) {
  const [filters, setFilters] = useState<PaymentsListFilters>(defaultFilters);
  const [approveId, setApproveId] = useState<string | null>(null);
  const [failId, setFailId] = useState<string | null>(null);
  
  void lang;
  
  const listState = usePaymentsList(filters);
  

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              {dict.adminPayments.list.reload}
            </Button>
          </>
        }
        description={dict.adminPayments.list.description}
        eyebrow={dict.adminPayments.list.eyebrow}
        title={dict.adminPayments.list.title}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard
          description={dict.adminPayments.list.rowsHint || "Payments currently loaded from the API response."}
          title={dict.adminPayments.list.rows}
          value={listState.total}
          icon={<CreditCardIcon />}
        />
      </div>
      <PaymentsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
        dict={dict}
      />
      {listState.error ? (
        <AdminSection title={dict.adminPayments.list.requestError}>
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <PaymentsTable
        items={listState.items}
        dict={dict}
        renderActions={(item) => (
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href={`/admin/billing/payments/${item.id}`}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">View Details</span>
              </Link>
            </Button>
            {item.status === "pending" && (
              <>
                <Button variant="outline" onClick={() => setApproveId(item.id)}>{dict.adminPayments.list.approve}</Button>
                <Button variant="danger" onClick={() => setFailId(item.id)}>{dict.adminPayments.list.fail}</Button>
              </>
            )}
          </div>
        )}
      />

      {approveId && (
        <ApprovePaymentDialog
          sessionId={approveId}
          open={!!approveId}
          onOpenChange={(open) => !open && setApproveId(null)}
          onSuccess={() => void listState.reload()}
          dict={dict}
        />
      )}

      {failId && (
        <FailPaymentDialog
          sessionId={failId}
          open={!!failId}
          onOpenChange={(open) => !open && setFailId(null)}
          onSuccess={() => void listState.reload()}
          dict={dict}
        />
      )}
    </div>
  );
}
