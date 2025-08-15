"use client";

import { toast } from "sonner";

import { Input } from "@workspace/design-system/components/ui/input";

export const Search = () => {
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    toast("Not implemented");
  };

  return (
    <div className="hidden lg:flex">
      <form onSubmit={onSubmit} className="relative w-full">
        <Input
          type="search"
          placeholder="Search documentation..."
          className="h-8 w-full sm:w-64 sm:pr-12"
        />
        <kbd className="bg-background text-muted-foreground pointer-events-none absolute top-1.5 right-1.5 hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium opacity-100 select-none sm:flex">
          <span>⌘</span>k
        </kbd>
      </form>
    </div>
  );
};
