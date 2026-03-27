"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { logoutAdminAndRedirect } from "@/lib/api/auth";

export function LogoutButton({
  className,
  variant = "danger",
  compact = false,
}: {
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  compact?: boolean;
}) {
  const [isPending, setIsPending] = useState(false);

  function handleClick() {
    setIsPending(true);
    logoutAdminAndRedirect();
  }

  return (
    <Button
      className={className}
      disabled={isPending}
      variant={variant}
      onClick={handleClick}
      aria-label={isPending ? "Signing out" : "Logout"}
      title={isPending ? "Signing out" : "Logout"}
    >
      {compact ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="M16 17l5-5-5-5" />
          <path d="M21 12H9" />
        </svg>
      ) : isPending ? (
        "Signing out..."
      ) : (
        "Logout"
      )}
    </Button>
  );
}
