import { cn } from '@workspace/design-system/lib/utils';
import Link from 'next/link';
import type { NavItem } from 'types';

type Props = {
  item: NavItem;
  isActive: boolean;
};

export const SidebarItem = ({ item, isActive }: Props) => {
  if (item.disabled || !item.href) {
    return (
      <span className="flex w-full items-center rounded-md p-2 opacity-60">
        {item.title}
      </span>
    );
  }

  return (
    <Link
      className={cn(
        'flex w-full items-center rounded-md p-2 hover:underline focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2',
        {
          'bg-muted': isActive,
        }
      )}
      href={item.href}
      rel={item.external ? 'noreferrer' : ''}
      target={item.external ? '_blank' : ''}
    >
      {item.title}
    </Link>
  );
};
