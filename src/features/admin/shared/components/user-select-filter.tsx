"use client";

import { useState } from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUsersList } from "@/features/admin/users/hooks/use-users-list";

export function UserSelectFilter({
  value,
  onChange,
  placeholder = "Select a user...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // We use the search term to filter backend results if necessary,
  // but for simplicity, we can fetch the first page of users and let the user filter locally,
  // or pass search as filter. We will pass search as filter.
  const { items, isLoading } = useUsersList({
    search: search || undefined,
    perPage: 100,
  });

  const selectedUser = items.find((user) => user.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 font-normal"
        >
          <span>
            {value ? selectedUser?.name || "Selected User" : placeholder}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search users..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                </div>
              ) : (
                "No user found."
              )}
            </CommandEmpty>
            <CommandGroup>
              {!isLoading && value && !selectedUser && (
                <CommandItem
                  value={value}
                  onSelect={() => {
                    onChange("");
                    setOpen(false);
                  }}
                >
                  <Check className="me-2 h-4 w-4 opacity-100" />
                  Clear Selection
                </CommandItem>
              )}
              {items.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.id}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "me-2 h-4 w-4",
                      value === user.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {user.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
