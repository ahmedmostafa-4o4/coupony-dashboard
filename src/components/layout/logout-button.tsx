"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { logoutAdminAndRedirect } from "@/lib/api/auth";

export function LogoutButton({
  className,
  variant = "danger",
}: {
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
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
    >
      {isPending ? "Signing out..." : "Logout"}
    </Button>
  );
}
