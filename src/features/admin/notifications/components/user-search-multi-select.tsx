"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
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
import { getUsers } from "@/features/admin/users/api/get-users";
import type { User } from "@/features/admin/users/types/user.types";

export function UserSearchMultiSelect({
  value = [],
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<Record<string, User>>({});

  React.useEffect(() => {
    let active = true;

    async function fetchUsers() {
      if (!open) return;

      setLoading(true);
      try {
        const response = await getUsers({ q: query, perPage: 20 });
        if (active) {
          setUsers(response.items || []);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    const timer = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query, open]);

  const handleSelect = (user: User) => {
    const isSelected = value.includes(user.id);
    let newValues;
    if (isSelected) {
      newValues = value.filter((id) => id !== user.id);
    } else {
      newValues = [...value, user.id];
      setSelectedUsers((prev) => ({ ...prev, [user.id]: user }));
    }
    onChange(newValues);
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== id));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between min-h-[2.5rem] h-auto p-2"
        >
          <div className="flex flex-wrap gap-1 items-center font-normal">
            {value.length === 0 && <span className="text-slate-500">Select users...</span>}
            {value.map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-800"
              >
                {selectedUsers[id]?.fullName || selectedUsers[id]?.email || id}
                <X
                  className="h-3 w-3 cursor-pointer text-slate-500 hover:text-slate-700"
                  onClick={(e) => handleRemove(id, e)}
                />
              </span>
            ))}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search users by name or email..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {loading && (
              <div className="p-4 flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
              </div>
            )}
            {!loading && users.length === 0 && (
              <CommandEmpty>No users found.</CommandEmpty>
            )}
            <CommandGroup>
              {!loading &&
                users.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.id}
                    onSelect={() => handleSelect(user)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(user.id) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{user.fullName || user.name || user.id}</span>
                      {user.email && (
                        <span className="text-xs text-slate-500">{user.email}</span>
                      )}
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
