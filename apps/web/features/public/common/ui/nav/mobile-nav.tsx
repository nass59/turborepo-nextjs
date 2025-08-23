import type { PropsWithChildren } from 'react';
import type { MainNavItem } from 'types';

import { Logo } from '@/components/logo';
import { useLockBody } from '@/hooks/use-lock-body';

import { MainNavItems } from './main-nav-items';

type Props = PropsWithChildren & {
  items?: MainNavItem[];
  pathName: string | null;
  close: () => false | undefined;
};

export function MobileNav({ items, pathName, close, children }: Props) {
  useLockBody();

  return (
    <div className="slide-in-from-bottom-80 fixed inset-0 top-[4rem] z-50 grid h-[calc(100vh)] animate-in grid-flow-row auto-rows-max overflow-auto border-t border-t-slate-200 pb-20 shadow-md md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-popover px-12 py-4 text-popover-foreground shadow-md">
        <Logo onClick={close} />
        <MainNavItems
          className="flex flex-col items-start gap-2"
          items={items}
          pathName={pathName}
        />
        {children}
      </div>
    </div>
  );
}
