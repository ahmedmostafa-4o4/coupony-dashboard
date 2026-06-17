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
import type { NotificationsDictionary } from "../utils/get-dictionary";

export function NotificationBroadcastPage({ lang, dict }: { lang: string; dict: NotificationsDictionary }) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { items, isLoading, error } = useBroadcasts({
    page,
    per_page: 15,
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        description={dict.broadcastList.description}
        eyebrow={dict.broadcastList.eyebrow}
        title={dict.broadcastList.title}
        actions={
          <Button asChild>
            <Link href={`/${lang}/admin/notifications/broadcast/create`}>
              <Plus className="mr-2 h-4 w-4" />
              {dict.broadcastList.newBroadcast}
            </Link>
          </Button>
        }
      />

      <AdminSection title={dict.broadcastList.history}>
        {isLoading ? (
          <div className="py-12 text-center text-sm text-slate-500">
            {dict.broadcastList.loading}
          </div>
        ) : error ? (
          <div className="py-12 text-center text-sm text-rose-600">
            {dict.broadcastList.failed}: {error}
          </div>
        ) : !items.length ? (
          <div className="py-12 text-center text-sm text-slate-500">
            {dict.broadcastList.noBroadcasts}
          </div>
        ) : (
          <BroadcastsTable 
            dict={dict}
            items={items} 
            renderActions={(item) => (
              <Button asChild size="sm" variant="ghost">
                <Link href={`/${lang}/admin/notifications/broadcast/${item.id}`}>
                  {dict.broadcastList.view} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          />
        )}
      </AdminSection>
    </div>
  );
}
