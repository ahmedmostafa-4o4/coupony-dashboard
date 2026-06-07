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
import { getRoles } from "@/features/admin/roles/api/get-roles";
import type { Role } from "@/features/admin/roles/types/role.types";

export function RoleSearchMultiSelect({
  value = [],
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [roles, setRoles] = React.useState<Role[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let active = true;

    async function fetchRoles() {
      if (!open) return;

      setLoading(true);
      try {
        const response = await getRoles({ search: query, perPage: 20 });
        if (active) {
          setRoles(response.items || []);
        }
      } catch (error) {
        console.error("Failed to fetch roles", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    const timer = setTimeout(() => {
      fetchRoles();
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query, open]);

  const handleSelect = (role: Role) => {
    const isSelected = value.includes(role.name);
    let newValues;
    if (isSelected) {
      newValues = value.filter((r) => r !== role.name);
    } else {
      newValues = [...value, role.name];
    }
    onChange(newValues);
  };

  const handleRemove = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== name));
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
            {value.length === 0 && <span className="text-slate-500">Select roles...</span>}
            {value.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1 rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700"
              >
                {name}
                <X
                  className="h-3 w-3 cursor-pointer text-indigo-400 hover:text-indigo-600"
                  onClick={(e) => handleRemove(name, e)}
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
            placeholder="Search roles..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {loading && (
              <div className="p-4 flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
              </div>
            )}
            {!loading && roles.length === 0 && (
              <CommandEmpty>No roles found.</CommandEmpty>
            )}
            <CommandGroup>
              {!loading &&
                roles.map((role) => (
                  <CommandItem
                    key={role.id}
                    value={role.name}
                    onSelect={() => handleSelect(role)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(role.name) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{role.name}</span>
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
