"use client";

import { Monitor, Smartphone, Globe, ShieldAlert } from "lucide-react";

import { AdminSection } from "@/features/admin/shared";
import type { UserSession } from "../types/user.types";
import type { UsersDictionary } from "../utils/get-dictionary";

interface UserSessionsTableProps {
  sessions: UserSession[];
  onRevokeSession: (sessionId: string) => Promise<void>;
  isRevoking: boolean;
}

function parseUserAgent(ua: string | null | undefined) {
  if (!ua) return "Unknown Browser/OS";
  
  // Very simplistic parsing for display purposes
  let browser = "Unknown Browser";
  let os = "Unknown OS";
  
  if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edge")) browser = "Edge";
  
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  
  return `${browser} on ${os}`;
}

export function UserSessionsTable({ sessions, onRevokeSession, isRevoking, dict }: UserSessionsTableProps & { dict: UsersDictionary["security"] }) {
  if (!sessions || sessions.length === 0) {
    return (
      <AdminSection title={dict.sessionsTitle} description={dict.sessionsDesc}>
        <p className="text-sm text-slate-500">{dict.noSessions}</p>
      </AdminSection>
    );
  }

  return (
    <AdminSection title={dict.sessionsTitle} description={dict.sessionsDesc}>
      <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm dark:border-slate-800">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-900/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.device}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.ip}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.lastActivity}</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">{dict.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
            {sessions.map((session) => {
              const isMobile = session.deviceType === "mobile";
              
              return (
                <tr key={session.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
                        {isMobile ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {parseUserAgent(session.userAgent)}
                        </div>
                        <div className="text-xs text-slate-500 truncate max-w-[200px]" title={session.userAgent || ""}>
                          {session.deviceType || dict.unknownDevice}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-slate-500" dir="ltr">
                      <Globe className="h-4 w-4 mr-1.5 text-slate-400" />
                      {session.ipAddress || dict.unknown}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {session.lastActivity ? new Date(session.lastActivity * 1000).toLocaleString() : dict.unknown}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => void onRevokeSession(session.id)}
                      disabled={isRevoking}
                      className="inline-flex items-center text-rose-600 hover:text-rose-900 disabled:opacity-50 transition-colors"
                    >
                      <ShieldAlert className="h-4 w-4 mr-1" />
                      {dict.revoke}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminSection>
  );
}
