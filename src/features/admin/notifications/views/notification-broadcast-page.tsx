"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import {
  AdminPageHeader,
  AdminSection,
} from "@/features/admin/shared";
import { Button } from "@/components/ui/button";

import { BroadcastsTable } from "../components/broadcasts-table";
import { useBroadcasts } from "../hooks/use-broadcasts";

export function NotificationBroadcastPage({ lang }: { lang: string }) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { items, isLoading, error } = useBroadcasts({
    page,
    per_page: 15,
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        description="View past notification broadcasts or create a new one."
        eyebrow="Support"
        title="Broadcast History"
        actions={
          <Button asChild>
            <Link href={`/${lang}/admin/notifications/broadcast/create`}>
              <Plus className="mr-2 h-4 w-4" />
              New Broadcast
            </Link>
          </Button>
        }
      />

      <AdminSection title="History">
        {isLoading ? (
          <div className="py-12 text-center text-sm text-slate-500">
            Loading broadcast history...
          </div>
        ) : error ? (
          <div className="py-12 text-center text-sm text-rose-600">
            Failed to load broadcasts: {error}
          </div>
        ) : !items.length ? (
          <div className="py-12 text-center text-sm text-slate-500">
            No broadcasts found.
          </div>
        ) : (
          <BroadcastsTable 
            items={items} 
            renderActions={(item) => (
              <Button asChild size="sm" variant="ghost">
                <Link href={`/${lang}/admin/notifications/broadcast/${item.id}`}>
                  View <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          />
        )}
      </AdminSection>
    </div>
  );
}
