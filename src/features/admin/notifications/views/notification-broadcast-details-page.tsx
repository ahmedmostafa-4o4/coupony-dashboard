"use client";

import { format } from "date-fns";
import { ArrowLeft, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

import {
  AdminPageHeader,
  AdminSection,
} from "@/features/admin/shared";


import { useBroadcast } from "../hooks/use-broadcast";

export function NotificationBroadcastDetailsPage({
  lang,
  id,
}: {
  lang: string;
  id: string;
}) {
  const { item: broadcast, isLoading, error } = useBroadcast(id);

  if (isLoading) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Loading broadcast details...
      </div>
    );
  }

  if (error || !broadcast) {
    return (
      <div className="py-12 text-center text-sm text-rose-600">
        Failed to load broadcast details: {error || "Unknown error"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        description={`Sent by ${broadcast.admin?.first_name || "Unknown"} on ${format(new Date(broadcast.created_at), "PP p")}`}
        eyebrow="Broadcast Details"
        title={
          <div className="flex items-center gap-4">
            <Link
              href={`/${lang}/admin/notifications/broadcast`}
              className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </Link>
            {broadcast.title}
          </div>
        }
        actions={
          <div className="flex items-center gap-2">
            {broadcast.status === "completed" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-green-100 text-green-700 px-3 py-1 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" />
                Completed
              </span>
            )}
            {broadcast.status === "failed" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-rose-100 text-rose-700 px-3 py-1 text-sm font-medium">
                <XCircle className="h-4 w-4" />
                Failed
              </span>
            )}
            {(broadcast.status === "pending" || broadcast.status === "processing") && (
              <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 text-slate-500 px-3 py-1 text-sm font-medium">
                <Clock className="h-4 w-4" />
                {broadcast.status === "processing" ? "Processing" : "Pending"}
              </span>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <AdminSection title="Payload Details">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">Title</h4>
                <p className="text-sm font-medium">{broadcast.title}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">Message</h4>
                <div className="bg-slate-50 p-4 rounded-md border border-slate-100">
                  <p className="text-sm whitespace-pre-wrap">{broadcast.message}</p>
                </div>
              </div>
            </div>
          </AdminSection>

          <AdminSection title="Targeting">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-2">Channels</h4>
                <div className="flex flex-wrap gap-2">
                  {broadcast.channels.map((channel) => (
                    <span key={channel} className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 border-transparent">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-2">Target Roles</h4>
                <div className="flex flex-wrap gap-2">
                  {broadcast.target_roles?.length ? (
                    broadcast.target_roles.map((role) => (
                      <span key={role} className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 bg-indigo-50 text-indigo-700 border-indigo-200">
                        {role}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">None</span>
                  )}
                </div>
              </div>
              <div className="col-span-2 mt-2">
                <h4 className="text-sm font-medium text-slate-500 mb-2">Target User IDs</h4>
                {broadcast.target_user_ids?.length ? (
                  <div className="bg-slate-50 p-3 rounded border text-xs font-mono text-slate-600 max-h-40 overflow-y-auto">
                    {broadcast.target_user_ids.join(", ")}
                  </div>
                ) : (
                  <span className="text-sm text-slate-500">None specified (Targeting by role only)</span>
                )}
              </div>
            </div>
          </AdminSection>
        </div>

        <div className="space-y-6">
          <AdminSection title="Delivery Stats">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-100 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mb-2" />
                  <span className="text-2xl font-bold text-green-700">{broadcast.total_sent}</span>
                  <span className="text-xs font-medium text-green-600 uppercase tracking-wider mt-1">Sent</span>
                </div>
                <div className="bg-rose-50 border border-rose-100 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                  <XCircle className="h-6 w-6 text-rose-600 mb-2" />
                  <span className="text-2xl font-bold text-rose-700">{broadcast.total_failed}</span>
                  <span className="text-xs font-medium text-rose-600 uppercase tracking-wider mt-1">Failed</span>
                </div>
              </div>

              {broadcast.total_failed > 0 && (
                <div className="flex items-start gap-2 p-3 bg-amber-50 text-amber-800 rounded text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
                  <p>
                    Some notifications failed to send. This can happen if a user's notification preferences are disabled, or if an email/push token is invalid.
                  </p>
                </div>
              )}

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Created</span>
                  <span className="font-medium text-slate-700">
                    {format(new Date(broadcast.created_at), "MMM d, yyyy h:mm a")}
                  </span>
                </div>
                {broadcast.completed_at && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Completed</span>
                    <span className="font-medium text-slate-700">
                      {format(new Date(broadcast.completed_at), "MMM d, yyyy h:mm a")}
                    </span>
                  </div>
                )}
                {broadcast.completed_at && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Duration</span>
                    <span className="font-medium text-slate-700">
                      {Math.max(
                        1,
                        Math.round(
                          (new Date(broadcast.completed_at).getTime() -
                            new Date(broadcast.created_at).getTime()) /
                            1000,
                        ),
                      )}s
                    </span>
                  </div>
                )}
              </div>
            </div>
          </AdminSection>
        </div>
      </div>
    </div>
  );
}
