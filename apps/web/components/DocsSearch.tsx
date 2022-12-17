"use client";

import { cn } from "@lib/utils";
import { toast } from "@components/toast";

interface DocsSearchProps extends React.HTMLAttributes<HTMLFormElement> {}

export const DocsSearch = ({ className, ...props }: DocsSearchProps) => {
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    toast({
      title: "Not implemented",
      message: "We're still working on the search.",
      type: "error",
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn("relative w-full", className)}
      {...props}
    >
      <input
        type="search"
        placeholder="Search documentation..."
        className="block h-8 w-full appearance-none rounded-md border border-slate-200 bg-slate-100 py-2 pl-3 text-sm placeholder:text-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1 sm:w-64 sm:pr-12"
      />
      <kbd className="pointer-events-none absolute top-1.5 right-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-xs font-medium text-slate-600 opacity-100 sm:flex">
        <span>⌘</span>k
      </kbd>
    </form>
  );
};
