'use client';

import { Input } from '@workspace/design-system/components/ui/input';
import { toast } from 'sonner';

export const Search = () => {
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    toast('Not implemented');
  };

  return (
    <div className="hidden lg:flex">
      <form className="relative w-full" onSubmit={onSubmit}>
        <Input
          className="h-8 w-full sm:w-64 sm:pr-12"
          placeholder="Search documentation..."
          type="search"
        />
        <kbd className="pointer-events-none absolute top-1.5 right-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-medium font-mono text-muted-foreground text-xs opacity-100 sm:flex">
          <span>⌘</span>k
        </kbd>
      </form>
    </div>
  );
};
