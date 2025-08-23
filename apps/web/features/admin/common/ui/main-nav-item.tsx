'use client';

import { buttonVariants } from '@workspace/design-system/components/ui/button';
import { cn } from '@workspace/design-system/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { routes } from '@/constants/routes';

type Props = {
  label: string;
  path: string;
};

export const MainNavItem = ({ label, path }: Props) => {
  const pathname = usePathname();
  const { spaceId } = useParams();

  const routeSpace = `${routes.dashboard}/${spaceId}`;
  const href = `${routeSpace}${path}`;

  const isActive =
    (pathname === routeSpace && href === routeSpace) ||
    pathname === href ||
    (pathname.startsWith(`${href}/`) && href !== routeSpace);

  return (
    <Link
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'lg' }),
        'flex w-full py-0 pr-0 pl-6 text-muted-foreground',
        isActive && 'bg-slate-500/20 font-semibold text-foreground'
      )}
      href={href}
    >
      <div className="flex py-4">{label}</div>

      <div
        className={cn(
          'ml-auto h-full rounded-md border-2 border-amber-300 opacity-0 transition-all',
          isActive && 'opacity-100'
        )}
      />
    </Link>
  );
};
