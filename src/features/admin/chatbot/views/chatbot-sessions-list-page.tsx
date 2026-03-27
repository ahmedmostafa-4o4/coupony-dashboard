"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, createAdminDetailHref } from "@/features/admin/shared";
import { ChatbotSessionsFilters } from "../components/chatbot-sessions-filters";
import { ChatbotSessionsTable } from "../components/chatbot-sessions-table";
import { useChatbotSessionsList } from "../hooks/use-chatbot-sessions-list";
import type { ChatbotSessionsListFilters } from "../types/chatbot-session.types";

const defaultFilters: ChatbotSessionsListFilters = { search: "", status: "all" };

export function ChatbotSessionsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<ChatbotSessionsListFilters>(defaultFilters);
  
  
  
  const listState = useChatbotSessionsList(filters);
  

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
        description="Inspect support chatbot sessions and escalation context."
        eyebrow="Admin"
        title="Chatbot Sessions"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Chatbot Sessions currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <ChatbotSessionsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <ChatbotSessionsTable
        items={listState.items}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "chatbotSessions",
                String(item.id ?? ""),
              )}
            >
              View
            </Link>

          </div>
        )}
      />
    </div>
  );
}
