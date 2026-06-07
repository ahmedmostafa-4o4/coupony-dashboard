"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { UserSearchMultiSelect } from "./user-search-multi-select";
import { RoleSearchMultiSelect } from "./role-search-multi-select";
import type { BroadcastNotificationRequest } from "../types/notification-broadcast.types";

const CHANNELS = [
  { label: "Push", value: "push" },
  { label: "Email", value: "email" },
  { label: "SMS", value: "sms" },
  { label: "In-app", value: "in_app" },
];

export function NotificationBroadcastForm({
  description,
  isSubmitting,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  isSubmitting?: boolean;
  onSubmit: (payload: BroadcastNotificationRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  const [formTitle, setFormTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [channels, setChannels] = React.useState<string[]>(["push"]);
  const [targetRoles, setTargetRoles] = React.useState<string[]>([]);
  const [targetUserIds, setTargetUserIds] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    if (!formTitle.trim()) {
      setError("Title is required.");
      return;
    }
    if (!message.trim()) {
      setError("Message is required.");
      return;
    }
    if (channels.length === 0) {
      setError("At least one channel must be selected.");
      return;
    }
    
    setError(null);
    try {
      await onSubmit({
        title: formTitle.trim(),
        message: message.trim(),
        channels,
        target_roles: targetRoles,
        target_user_ids: targetUserIds as any,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred submitting the broadcast.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Title</label>
          <Input 
            placeholder="Important platform update" 
            value={formTitle} 
            onChange={(e) => setFormTitle(e.target.value)} 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Message</label>
          <Textarea 
            placeholder="Write the broadcast message shown to recipients." 
            className="min-h-[100px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Channels</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-2">
            {CHANNELS.map((channel) => {
              const isChecked = channels.includes(channel.value);
              return (
                <label
                  key={channel.value}
                  className="flex flex-row items-start gap-3 rounded-md border border-slate-200 p-4 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setChannels([...channels, channel.value]);
                      } else {
                        setChannels(channels.filter((c) => c !== channel.value));
                      }
                    }}
                  />
                  <div className="space-y-1 leading-none pt-0.5">
                    <span className="text-sm font-medium leading-none">{channel.label}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Target Roles</label>
          <span className="block text-xs leading-5 text-slate-500">Search and select roles to broadcast to (optional).</span>
          <RoleSearchMultiSelect value={targetRoles} onChange={setTargetRoles} />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Target Specific Users</label>
          <span className="block text-xs leading-5 text-slate-500">Search and select specific users to receive this broadcast (optional).</span>
          <UserSearchMultiSelect value={targetUserIds} onChange={setTargetUserIds} />
        </div>

        {error && (
          <p className="text-sm font-medium text-rose-600">{error}</p>
        )}

        <div className="flex justify-end pt-4 border-t">
          <Button disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? "Working..." : submitLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
